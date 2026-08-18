import Image from "next/image";
import site from "@/content/site.json";

export function SiteFooter() {
  return <footer className="site-footer"><div><Image className="footer-mark" src="/images/favicon.png" alt="" width={36} height={36} /><p>Dave Boutin</p><p>Technology Lead &amp; Senior Developer</p></div><div className="footer-links"><a href={site.linkedin} target="_blank" rel="noreferrer">LinkedIn ↗</a><a href={site.behance} target="_blank" rel="noreferrer">Behance ↗</a><a href={site.github} target="_blank" rel="noreferrer">GitHub ↗</a></div><p>© {new Date().getFullYear()} Dave Boutin</p></footer>;
}
