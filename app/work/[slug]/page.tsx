import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ProjectGallery } from "@/components/project-gallery";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { getProject, getProjects, renderProjectBody } from "@/lib/projects";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() { return getProjects().map((project) => ({ slug: project.slug })); }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params; const project = getProject(slug);
  if (!project || project.draft) return {};
  const image = project.cover ? new URL(project.cover, "https://daveboutin.ca").toString() : undefined;
  return { title: `${project.title} — Dave Boutin`, description: project.summary, openGraph: { title: project.title, description: project.summary, images: image ? [image] : [] }, twitter: { card: image ? "summary_large_image" : "summary", title: project.title, description: project.summary, images: image ? [image] : [] } };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params; const project = getProject(slug); if (!project || project.draft) notFound();
  const content = await renderProjectBody(project.content);
  return <main><SiteHeader /><article className="project-detail">
    <header><p className="eyebrow">{project.category} / {project.year}</p><h1>{project.title}</h1><p>{project.summary}</p></header>
    <dl className="project-meta"><div><dt>Role</dt><dd>{project.role}</dd></div><div><dt>Year</dt><dd>{project.year}</dd></div><div><dt>Tools</dt><dd>{project.tags.join(" · ")}</dd></div></dl>
    {project.cover && <figure className="project-cover-figure">
      <div className="project-cover-frame"><Image className="project-cover" src={project.cover} fill sizes="(max-width: 800px) 100vw, 86vw" alt={project.coverAlt ?? `${project.title} cover image`} priority /></div>
      {project.coverCaption && <figcaption>{project.coverCaption}</figcaption>}
    </figure>}
    <div className="prose" dangerouslySetInnerHTML={{ __html: content }} />
    <ProjectGallery images={project.gallery} projectTitle={project.title} />
    {project.externalUrl && <a className="button button-primary project-external" href={project.externalUrl} target="_blank" rel="noreferrer">Visit the project ↗</a>}
  </article><SiteFooter /></main>;
}
