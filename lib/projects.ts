import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

const projectsDirectory = path.join(process.cwd(), "content/projects");
export type ProjectGalleryItem = {
  image: string;
  caption?: string;
  alt?: string;
};

export type Project = { slug: string; title: string; summary: string; category: string; year: string; role: string; thumbnail?: string; thumbnailAlt?: string; cover?: string; coverCaption?: string; coverAlt?: string; gallery: ProjectGalleryItem[]; tags: string[]; externalUrl?: string; featured: boolean; draft: boolean; order: number; content: string };

function parseGallery(gallery: unknown): ProjectGalleryItem[] {
  if (!Array.isArray(gallery)) return [];

  return gallery.flatMap((item) => {
    if (typeof item === "string") return [{ image: item }];
    if (!item || typeof item !== "object") return [];

    const { image, caption, alt } = item as Record<string, unknown>;
    if (typeof image !== "string" || !image) return [];

    return [{
      image,
      caption: typeof caption === "string" && caption ? caption : undefined,
      alt: typeof alt === "string" && alt ? alt : undefined,
    }];
  });
}

function parseProject(fileName: string): Project {
  const slug = fileName.replace(/\.md$/, "");
  const source = fs.readFileSync(path.join(projectsDirectory, fileName), "utf8");
  const { data, content } = matter(source);
  return { slug, title: data.title ?? slug, summary: data.summary ?? "", category: data.category ?? "Project", year: String(data.year ?? ""), role: data.role ?? "", thumbnail: data.thumbnail || undefined, thumbnailAlt: data.thumbnailAlt || undefined, cover: data.cover || undefined, coverCaption: data.coverCaption || undefined, coverAlt: data.coverAlt || undefined, gallery: parseGallery(data.gallery), tags: Array.isArray(data.tags) ? data.tags : [], externalUrl: data.externalUrl || undefined, featured: Boolean(data.featured), draft: Boolean(data.draft), order: Number(data.order ?? 999), content };
}

export function getProjects(includeDrafts = false): Project[] {
  if (!fs.existsSync(projectsDirectory)) return [];
  return fs.readdirSync(projectsDirectory).filter((fileName) => fileName.endsWith(".md") && fileName !== "README.md").map(parseProject).filter((project) => includeDrafts || !project.draft).sort((a, b) => a.order - b.order || b.year.localeCompare(a.year));
}

export function getProject(slug: string): Project | undefined {
  const fileName = `${slug}.md`;
  if (!fs.existsSync(path.join(projectsDirectory, fileName))) return undefined;
  return parseProject(fileName);
}

export async function renderProjectBody(content: string): Promise<string> {
  return (await remark().use(html).process(content)).toString();
}
