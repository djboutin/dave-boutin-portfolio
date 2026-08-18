"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import type { ProjectGalleryItem } from "@/lib/projects";

type Props = {
  images: ProjectGalleryItem[];
  projectTitle: string;
};

export function ProjectGallery({ images, projectTitle }: Props) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const lightboxRef = useRef<HTMLDivElement>(null);
  const triggerRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const close = useCallback(() => {
    const index = activeIndex;
    setActiveIndex(null);
    window.setTimeout(() => {
      if (index !== null) triggerRefs.current[index]?.focus();
    }, 0);
  }, [activeIndex]);

  const showPrevious = useCallback(() => {
    setActiveIndex((index) => index === null ? null : (index - 1 + images.length) % images.length);
  }, [images.length]);

  const showNext = useCallback(() => {
    setActiveIndex((index) => index === null ? null : (index + 1) % images.length);
  }, [images.length]);

  useEffect(() => {
    if (activeIndex === null) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
      if (event.key === "ArrowLeft") showPrevious();
      if (event.key === "ArrowRight") showNext();
      if (event.key === "Tab") {
        const focusable = lightboxRef.current?.querySelectorAll<HTMLButtonElement>("button:not(:disabled)");
        if (!focusable?.length) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeIndex, close, showNext, showPrevious]);

  if (!images.length) return null;

  const activeImage = activeIndex === null ? null : images[activeIndex];

  return <>
    <section className="project-gallery" aria-label={`${projectTitle} image gallery`}>
      {images.map((item, index) => {
        const alt = item.alt ?? item.caption ?? `${projectTitle} gallery image ${index + 1}`;
        return <button
          className="project-gallery-item"
          type="button"
          onClick={() => setActiveIndex(index)}
          ref={(node) => { triggerRefs.current[index] = node; }}
          aria-label={`Open image ${index + 1} of ${images.length}${item.caption ? `: ${item.caption}` : ""}`}
          key={`${item.image}-${index}`}
        >
          <span className="project-gallery-thumbnail">
            <Image src={item.image} fill sizes="(max-width: 800px) 100vw, 43vw" alt={alt} />
            <span className="project-gallery-open" aria-hidden="true">View ↗</span>
          </span>
          {item.caption && <span className="project-image-caption">{item.caption}</span>}
        </button>;
      })}
    </section>

    {activeImage && activeIndex !== null && <div
      className="lightbox"
      ref={lightboxRef}
      role="dialog"
      aria-modal="true"
      aria-label={`${projectTitle} image ${activeIndex + 1} of ${images.length}`}
      onMouseDown={(event) => { if (event.currentTarget === event.target) close(); }}
    >
      <div className="lightbox-toolbar">
        <span>{String(activeIndex + 1).padStart(2, "0")} / {String(images.length).padStart(2, "0")}</span>
        <button type="button" onClick={close} ref={closeButtonRef}>Close ×</button>
      </div>
      <div className="lightbox-stage">
        <Image
          src={activeImage.image}
          fill
          sizes="100vw"
          alt={activeImage.alt ?? activeImage.caption ?? `${projectTitle} gallery image ${activeIndex + 1}`}
          priority
        />
      </div>
      <div className="lightbox-footer">
        <p>{activeImage.caption || <span className="visually-hidden">No caption</span>}</p>
        {images.length > 1 && <div className="lightbox-controls">
          <button type="button" onClick={showPrevious} aria-label="Previous image">← Prev</button>
          <button type="button" onClick={showNext} aria-label="Next image">Next →</button>
        </div>}
      </div>
    </div>}
  </>;
}
