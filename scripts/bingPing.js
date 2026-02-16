import 'dotenv/config';
import axios from 'axios';
import { fetchMatches } from './fetchMatches.js';

async function pingBing() {
  const siteUrl = process.env.SITE_URL;
  const urls = [
    `${siteUrl}/`,
    `${siteUrl}/roja-directa-en-vivo/`,
    `${siteUrl}/tarjeta-roja-en-vivo/`,
    `${siteUrl}/sitemap.xml`
  ];
  const matches = await fetchMatches();
  urls.push(...matches.slice(0, 50).map(m => `${siteUrl}/${m.slug}/`));
  const results = await Promise.allSettled(
    urls.map(url =>
      axios.post(
        'https://www.bing.com/ping',
        { siteUrl, url },
        { timeout: 5000 }
      )
    )
  );
  const successful = results.filter(r => r.status === 'fulfilled').length;
  console.log(`✓ Pinged ${successful}/${urls.length} URLs to Bing`);
}

if (import.meta.url === `file://${process.argv[1]}`) {
  await pingBing();
}
