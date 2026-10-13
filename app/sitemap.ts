import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://near2pay.com";
  const currentDate = new Date();

  const routes = [
    { path: "", changeFrequency: "weekly" as const, priority: 1.0 },
    { path: "/features", changeFrequency: "weekly" as const, priority: 0.9 },
    { path: "/solutions/schools", changeFrequency: "monthly" as const, priority: 0.9 },
    { path: "/solutions/colleges", changeFrequency: "monthly" as const, priority: 0.9 },
    { path: "/solutions/coaching-centres", changeFrequency: "monthly" as const, priority: 0.9 },
    { path: "/student-parent-payments", changeFrequency: "weekly" as const, priority: 0.85 },
    { path: "/institution-management", changeFrequency: "weekly" as const, priority: 0.85 },
    { path: "/payment-integration", changeFrequency: "monthly" as const, priority: 0.8 },
    { path: "/security", changeFrequency: "monthly" as const, priority: 0.8 },
    { path: "/about", changeFrequency: "monthly" as const, priority: 0.75 },
    { path: "/contact", changeFrequency: "monthly" as const, priority: 0.75 },
    { path: "/request-demo", changeFrequency: "monthly" as const, priority: 0.8 },
    { path: "/faqs", changeFrequency: "weekly" as const, priority: 0.8 },
    { path: "/privacy-policy", changeFrequency: "yearly" as const, priority: 0.5 },
    { path: "/terms", changeFrequency: "yearly" as const, priority: 0.5 },
    { path: "/refund-policy", changeFrequency: "yearly" as const, priority: 0.5 },
    { path: "/support", changeFrequency: "monthly" as const, priority: 0.7 },
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route.path}`,
    lastModified: currentDate,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
