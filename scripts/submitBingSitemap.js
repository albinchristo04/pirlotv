import 'dotenv/config';
import axios from 'axios';

async function submitSitemap() {
  const siteUrl = process.env.SITE_URL;
  const sitemapUrl = `${siteUrl.replace(/\/$/, '')}/sitemap.xml`;
  try {
    await axios.get('https://www.bing.com/ping', {
      params: { sitemap: sitemapUrl },
      timeout: 10000
    });
    console.log(`✓ Sitemap submitted to Bing: ${sitemapUrl}`);
  } catch (error) {
    if (error.response) {
      console.error(
        'Error submitting sitemap to Bing:',
        error.response.status,
        JSON.stringify(error.response.data)
      );
    } else {
      console.error('Error submitting sitemap to Bing:', error.message);
    }
  }
}

if (import.meta.url === `file://${process.argv[1]}`) {
  await submitSitemap();
}
