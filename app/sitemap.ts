import { services } from "@/content/services";
import { siteUrl } from "@/lib/metadata";
import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ["", "/about", "/services", "/network", "/contact", "/privacy", "/terms", ...services.map((service) => `/services/${service.slug}`)];
  return paths.map((path) => ({
    url: `${siteUrl()}${path || "/"}`,
  }));
}
