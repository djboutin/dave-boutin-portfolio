import type { MetadataRoute } from "next";
import { getProjects } from "@/lib/projects";
export default function sitemap(): MetadataRoute.Sitemap { const staticRoutes = ["", "/about", "/work"].map((route) => ({ url: `https://daveboutin.ca${route}`, lastModified: new Date() })); const projects = getProjects().map((project) => ({ url: `https://daveboutin.ca/work/${project.slug}`, lastModified: new Date() })); return [...staticRoutes, ...projects]; }
