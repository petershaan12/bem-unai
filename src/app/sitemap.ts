import { MetadataRoute } from "next";
import { getAllPosts } from "./lib/pots";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl =
    process.env.NEXT_PUBLIC_APP_URL || "https://bem-unai.vercel.app";

  // Main routes
  const routes = [
    {
      url: `${baseUrl}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/berita`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/portal`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/profile`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    },
  ];

  // Add all berita posts
  const allPosts = await getAllPosts();

  const beritaPosts = (allPosts || [])
    .filter(
      (post: any) =>
        post.published &&
        post.slug &&
        typeof post.slug === "string" &&
        post.slug.trim() !== ""
    )
    .map((post: any) => ({
      url: `${baseUrl}/berita/${encodeURIComponent(post.slug)}`,
      lastModified: post.date ? new Date(post.date) : new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    }));

  return [...routes, ...beritaPosts];
}
