/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://sanasnursery.com",
  generateRobotsTxt: true,
  sitemapSize: 5000,
  changefreq: "daily",
  priority: 0.7,
  exclude: ["/admin/*", "/auth/*", "/api/*", "/server-sitemap.xml"],
  robotsTxtOptions: {
    policies: [
      { userAgent: "*", allow: "/" },
      { userAgent: "*", disallow: ["/admin", "/auth", "/api"] },
    ],
  },
};
