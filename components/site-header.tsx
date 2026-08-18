import Image from "next/image";
import Link from "next/link";

export function SiteHeader() {
  return <header className="site-header"><Link className="wordmark" href="/#top" aria-label="Dave Boutin, home"><Image className="brand-mark" src="/images/favicon.png" alt="" width={32} height={32} priority />Dave Boutin</Link><nav aria-label="Primary navigation"><Link href="/#expertise">Expertise</Link><Link href="/#work">Work</Link><Link href="/about">About</Link></nav><Link className="header-contact" href="/#contact">Let&apos;s talk <span aria-hidden="true">↗</span></Link></header>;
}
