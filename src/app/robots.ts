import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/kelola-informasi",
          "/kelola-kontak",
          "/kelola-pemerintahan",
          "/kelola-portal",
          "/letsgo",
          "/profile/logout",
        ],
      },
    ],
    sitemap: process.env.NEXT_PUBLIC_APP_URL
      ? `${process.env.NEXT_PUBLIC_APP_URL}/sitemap.xml`
      : "https://bem-unai.vercel.app/sitemap.xml",
  };
}
