"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const staggerSelectors = [
  ".focus-card",
  ".project-card",
  ".experience-list article",
  ".work-row",
  ".project-meta > div",
  ".project-gallery-item",
].join(", ");

export function ViewportReveals() {
  const pathname = usePathname();

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sections = Array.from(
      document.querySelectorAll<HTMLElement>("main > section, main > article"),
    );

    if (reducedMotion.matches || !("IntersectionObserver" in window)) {
      sections.forEach((section) => section.dataset.revealState = "visible");
      return;
    }

    sections.forEach((section) => {
      section.dataset.revealSection = "";

      section.querySelectorAll<HTMLElement>(staggerSelectors).forEach((item, index) => {
        item.dataset.revealItem = "";
        item.style.setProperty("--reveal-delay", `${90 + Math.min(index, 5) * 85}ms`);
      });
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          (entry.target as HTMLElement).dataset.revealState = "visible";
          observer.unobserve(entry.target);
        });
      },
      { rootMargin: "0px 0px -12%", threshold: 0.08 },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [pathname]);

  return null;
}
