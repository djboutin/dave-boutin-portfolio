import Image from "next/image";
import Link from "next/link";
import { ContactForm } from "@/components/contact-form";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import site from "@/content/site.json";
import { getProjects } from "@/lib/projects";

const focusAreas = [
  { number: "01", title: "Technical leadership", description: "Turning ambiguous goals into an architecture, a plan, and a team that can deliver it." },
  { number: "02", title: "Full-stack development", description: "Building maintainable applications across modern front ends, APIs, content systems, and cloud platforms." },
  { number: "03", title: "Creative technology", description: "Making technically rigorous work feel expressive, useful, and unmistakably human." },
];

export default function Home() {
  const allProjects = getProjects();
  const featuredProjects = allProjects.filter((project) => project.featured);
  const projects = (featuredProjects.length > 0 ? featuredProjects : allProjects).slice(0, 3);

  return (
    <main>
      <SiteHeader />
      <section className="hero" id="top">
        <div className="hero-kicker"><span className="status-dot" aria-hidden="true" />{site.role} · {site.employer}</div>
        <h1>I build the systems<span>behind ambitious ideas</span></h1>
        <div className="hero-lower">
          <p>{site.introduction}</p>
          <div className="hero-actions">
            <a className="button button-primary" href="#work">Explore selected work <span aria-hidden="true">↓</span></a>
            <a className="button button-secondary" href="#contact">Propose a project</a>
          </div>
        </div>
        <div className="signal" aria-hidden="true"><span>Signal / 2026</span><span className="signal-line" /><span className="signal-orbit" /></div>
      </section>

      <section className="focus-section" id="expertise">
        <div className="section-heading"><p>What I lead</p><h2>From first sketch to <em>dependable system</em></h2></div>
        <div className="focus-grid">
          {focusAreas.map((area) => <article className="focus-card" key={area.number}><span>{area.number}</span><h3>{area.title}</h3><p>{area.description}</p></article>)}
        </div>
      </section>

      <section className="selected-work" id="work" aria-labelledby="work-heading">
        <div className="section-heading section-heading-work"><p>Selected work</p><div><h2 id="work-heading">Work to achieve <em> clear goals</em></h2><p className="section-intro">A growing collection of digital platforms, applications, and content ecosystems I&apos;ve helped shape.</p></div></div>
        {projects.length > 0 ? (
          <div className="project-grid">
            {projects.map((project, index) => (
              <Link className="project-card" href={`/work/${project.slug}`} key={project.slug}>
                {project.cover ? <Image src={project.cover} alt="" width={960} height={720} sizes="(max-width: 800px) 100vw, 33vw" /> : <span className="project-placeholder" aria-hidden="true" />}
                <span className="project-index">0{index + 1}</span>
                <div><span>{project.category}</span><h3>{project.title}</h3><p>{project.summary}</p></div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="archive-callout">
            <div><span>Archive / in transition</span><h3><em>New case studies </em> are being prepared.</h3></div>
            <p>My earlier client and professional work remains available on Behance while I document newer projects here.</p>
            <a href={site.behance} target="_blank" rel="noreferrer">Browse the Behance archive <span aria-hidden="true">↗</span></a>
          </div>
        )}
      </section>

      <section className="about-section" id="about">
        <div className="about-image-wrap">
          <span className="image-register" aria-hidden="true">SUBJECT / 001</span>
          <Image className="about-image" src="/images/dave-snow.jpg" width={1200} height={900} alt="Dave Boutin standing in a snowy landscape" sizes="(max-width: 800px) 100vw, 48vw" />
          <span className="image-accent" aria-hidden="true" />
        </div>
        <div className="about-copy">
          <p className="eyebrow">About / Dave</p>
          <h2>Curious by default. <em>Pragmatic when it counts.</em></h2>
          <p className="about-lede">{site.about.lede}</p><p>{site.about.body}</p>
          <Link className="text-link" href="/about">Read the longer story <span aria-hidden="true">→</span></Link>
        </div>
      </section>

      <section className="experience-section" id="experience">
        <div className="section-heading"><p>Experience</p><h2>Leadership from <em>experience.</em></h2></div>
        <div className="experience-list">
          {site.experience.map((item, index) => <article key={`${item.company}-${item.role}`}><span>0{index + 1}</span><h3>{item.role}</h3><p>{item.company}</p><p>{item.description}</p></article>)}
        </div>
      </section>

      <section className="contact-section" id="contact">
        <div className="contact-copy">
          <p className="eyebrow">Open channel</p><h2>Have a difficult problem or a good idea?</h2>
          <p>I&apos;m focused on technology-lead and senior-development opportunities, and I&apos;m always interested in hearing about thoughtful future collaborations.</p>
          <a href={`mailto:${site.email}`}>{site.email}</a>
        </div>
        <ContactForm />
      </section>
      <SiteFooter />
    </main>
  );
}
