import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DIST_DIR = path.resolve(__dirname, '../dist');
const BASE_URL = 'http://localhost:4173';
const API_BASE_URL = "https://api.quickmobileadmin.growthmetaverse.co.in";

const STATIC_ROUTES = [
    "/", "/about-us", "/Contact-us", "/blogs", "/our-stores",
    "/Terms-of-Use", "/Terms-and-conditions", "/Privacy-policy",
    "/Return&Refund", "/Cookies-policy", "/Impact", "/Faq"
];

const slugify = (text) => {
    return text.toString().toLowerCase().trim()
        .replace(/\s+/g, "-").replace(/[^\w-]+/g, "").replace(/--+/g, "-");
};

async function getRoutes() {
    console.log('[Discovery] Discovering routes...');
    const routes = [...STATIC_ROUTES];

    // 1. Blogs
    try {
        const blogsPath = path.join(__dirname, '../src/modules/common/pages/blogs/block-content.json');
        if (fs.existsSync(blogsPath)) {
            const blogsData = JSON.parse(fs.readFileSync(blogsPath, 'utf8'));
            blogsData.forEach(blog => routes.push(`/blog/${slugify(blog.title)}`));
            console.log(`[Discovery] Added ${blogsData.length} blogs.`);
        }
    } catch (e) { }

    // 2. Stores
    routes.push("/our-store/store-1");

    // 3. API Dynamic Routes
    try {
        console.log('[Discovery] Fetching dynamic categories/products...');
        const [brandsRes, catsRes] = await Promise.all([
            fetch(`${API_BASE_URL}/common-module/getBrandsAndProducts`),
            fetch(`${API_BASE_URL}/common-module/category?option=Sell&all=true`)
        ]);

        const brandsData = await brandsRes.json();
        const catsData = await catsRes.json();

        const catMap = {};
        catsData?.categories?.forEach(cat => {
            if (cat.slug?.sell) {
                catMap[cat._id] = cat.slug.sell;
                routes.push(`/${cat.slug.sell}`);
            }
        });

        brandsData?.BrandsWithProducts?.forEach(brand => {
            const catSlug = catMap[brand.categoryId];
            if (catSlug && brand.slugSell) {
                routes.push(`/${catSlug}/${brand.slugSell}`);
                brand.products?.forEach(prod => {
                    if (prod.slugSell) routes.push(`/${catSlug}/${prod.slugSell}`);
                });
            }
        });
        console.log(`[Discovery] Total routes to crawl: ${routes.length}`);
    } catch (e) {
        console.warn('[Discovery] API failed, using static + blogs.');
    }

    return [...new Set(routes)];
}

async function run() {
    console.log('--- Production Pre-render Start ---');
    const routes = await getRoutes();
    const browser = await puppeteer.launch({
        headless: "new",
        args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-web-security']
    });

    // Process one by one for stability on Windows
    for (const route of routes) {
        console.log(`[Crawl] Spanning: ${route}`);
        const page = await browser.newPage();
        try {
            await page.setViewport({ width: 1280, height: 800 });
            await page.goto(`${BASE_URL}${route}`, { waitUntil: 'networkidle0', timeout: 60000 });

            // Wait for hydration indicator or just root content
            await page.waitForSelector('#root > *', { timeout: 15000 }).catch(() => { });
            await new Promise(r => setTimeout(r, 1000)); // Small buffer for Helmet

            const html = await page.content();
            const cleanRoute = route.endsWith('/') ? route : route + '/';
            const targetDir = path.join(DIST_DIR, cleanRoute);

            if (!fs.existsSync(targetDir)) fs.mkdirSync(targetDir, { recursive: true });

            const filePath = path.join(targetDir, 'index.html');
            fs.writeFileSync(filePath, html);
        } catch (e) {
            console.error(`[Fail] ${route}: ${e.message}`);
        } finally {
            await page.close();
        }
    }

    await browser.close();
    console.log('--- Done! ---');
}

run();
