/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://sanasnursery.com",
  generateRobotsTxt: true, 
  sitemapSize: 5000, 
  changefreq: "daily", 
  priority: 0.7, 
  exclude: ["/admin/*", "/server-sitemap.xml"], 
};
