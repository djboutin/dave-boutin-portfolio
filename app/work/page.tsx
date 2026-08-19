import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import site from "@/content/site.json";
import { getProjects } from "@/lib/projects";

export const metadata: Metadata = { title: "Work — Dave Boutin", description: "Selected digital platforms, applications, and content systems led and built by Dave Boutin." };

export default function WorkPage() {
  const projects = getProjects();
  return <main><SiteHeader />
    <section className="page-hero work-page-hero"><p className="eyebrow">Selected work / growing archive</p><h1>Systems with<br /><em>something to say.</em></h1><p>Digital products shaped through leadership, architecture, development, and a stubborn attention to usefulness.</p></section>
    <section className="work-index">
      {projects.length > 0 ? projects.map((project, index) => { const thumbnail = project.thumbnail ?? project.cover; return <Link className="work-row" href={`/work/${project.slug}`} key={project.slug}><span>0{index + 1}</span><div><p>{project.category} · {project.year}</p><h2>{project.title}</h2><p>{project.summary}</p></div>{thumbnail && <Image src={thumbnail} alt={project.thumbnailAlt ?? `${project.title} project thumbnail`} width={420} height={280} />}<span aria-hidden="true">↗</span></Link>; }) : <div className="work-empty"><p>New case studies are currently being documented.</p><h2>Until then, the earlier portfolio lives on Behance.</h2><a href={site.behance} target="_blank" rel="noreferrer">Open the archive ↗</a></div>}
    </section><SiteFooter /></main>;
}
