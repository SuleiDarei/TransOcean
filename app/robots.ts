import { indexingBlocked, siteUrl } from "@/lib/metadata";
import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  if (indexingBlocked()) {
    return { rules: { userAgent: "*", disallow: "/" } };
  }
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${siteUrl()}/sitemap.xml`,
  };
}
