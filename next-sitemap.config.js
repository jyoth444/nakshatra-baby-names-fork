/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || "https://nakshatranames.com",
  generateRobotsTxt: true,
  changefreq: "weekly",
  priority: 0.7,
  sitemapSize: 5000,
  exclude: ["/api/*"],
  robotsTxtOptions: {
    additionalSitemaps: [
      "https://nakshatranames.com/sitemap.xml",
    ],
    policies: [
      {
        userAgent: "*",
        allow: "/",
      },
    ],
  },
  transform: async (config, path) => {
    // Higher priority for important pages
    let priority = 0.7;
    if (path === "/") priority = 1.0;
    else if (path.startsWith("/nakshatra/")) priority = 0.9;
    else if (path.startsWith("/name/")) priority = 0.8;
    else if (path.startsWith("/names/")) priority = 0.85;
    else if (path.startsWith("/blog/")) priority = 0.75;

    return {
      loc: path,
      changefreq: path.startsWith("/name/") ? "monthly" : "weekly",
      priority,
      lastmod: new Date().toISOString(),
    };
  },
};
