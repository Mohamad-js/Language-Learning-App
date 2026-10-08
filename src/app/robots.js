export default function robots() {
    return {
        rules: { userAgent: "*", allow: "/", disallow: ["/api/", "/profile", "/quiz"] },
        sitemap: "https://your-app.vercel.app/sitemap.xml",
    };
}