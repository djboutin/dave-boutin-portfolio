import type { Metadata } from "next";
import Image from "next/image";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import site from "@/content/site.json";

export const metadata: Metadata = { title: "About — Dave Boutin", description: "The path from QBasic on a Saskatchewan farm to leading technology and building digital products." };

export default function AboutPage() {
  return <main><SiteHeader />
    <section className="page-hero about-page-hero"><p className="eyebrow">About / origin story</p><h1>Always learning.<br /><em>Still building.</em></h1></section>
    <section className="story-grid">
      <div className="story-image"><Image src="/images/iceland-waterfall.jpg" width={1200} height={900} alt="Skógafoss waterfall in Iceland" sizes="(max-width: 800px) 100vw, 45vw" /><p>Skógafoss, Iceland · 2017</p></div>
      <div className="story-copy"><p className="story-lede">{site.about.lede}</p>
        <p>I grew up on a farm in southeast Saskatchewan. When my parents brought home a book on QBasic, programming immediately felt like a new kind of material—something I could shape into interactive ideas. Dial-up internet later opened an even larger world, and I started building web pages when framesets and blinking text were still fair game.</p>
        <p>I went on to complete a BSc in Computer Science at the University of Regina. Since then, my work has moved through IT support, infrastructure, application development, content platforms, consulting, and technical leadership across both open-source and Microsoft ecosystems.</p>
        <p>Today I&apos;m Technology Lead at <a href={site.employerUrl} target="_blank" rel="noreferrer">Freshwater Creative</a>. I enjoy the point where strategy meets implementation: clarifying the problem, setting a direction, and staying close enough to the work to know whether the solution is genuinely sound.</p>
        <p>I&apos;m interested in technology-lead and senior-development roles where curiosity, good judgment, and hands-on craft all matter. I&apos;m also leaving the door open for select future contract collaborations.</p>
      </div>
    </section><SiteFooter /></main>;
}
