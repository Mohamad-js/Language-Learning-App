export default async function sitemap() {
    const base = "https://your-app.vercel.app";
    return [
        { url: base, lastModified: new Date() },
        // add lesson pages, e.g. fetched from Supabase
    ];
}