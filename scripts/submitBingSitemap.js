import 'dotenv/config';
import axios from 'axios';

async function submitSitemap() {
  const apiKey = process.env.BING_WEBMASTER_API_KEY;
  const siteUrl = process.env.SITE_URL;
  try {
    await axios.post('https://www.bing.com/webmaster/api.sitemaps.submit', null, {
      params: {
        apikey: apiKey,
        siteUrl,
        sitemap: `${siteUrl}/sitemap.xml`
      }
    });
    console.log('✓ Sitemap submitted to Bing');
  } catch (error) {
    console.error('Error:', error.message);
  }
}

if (import.meta.url === `file://${process.argv[1]}`) {
  await submitSitemap();
}
