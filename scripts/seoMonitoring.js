import 'dotenv/config';
import axios from 'axios';
import fs from 'fs/promises';
import path from 'path';

async function monitorSEO() {
  const apiKey = process.env.BING_WEBMASTER_API_KEY;
  const siteUrl = process.env.SITE_URL;
  try {
    const response = await axios.get('https://www.bing.com/webmaster/api.sitemaps.getdata', {
      params: {
        apikey: apiKey,
        siteUrl,
        type: 'query'
      },
      timeout: 10000
    });
    console.log('✓ SEO data retrieved');
    const reportDir = path.join(process.cwd(), '.reports');
    await fs.mkdir(reportDir, { recursive: true });
    await fs.writeFile(
      path.join(reportDir, `report-${new Date().toISOString().split('T')[0]}.json`),
      JSON.stringify(response.data, null, 2)
    );
  } catch (error) {
    console.log('Monitor at: https://www.bing.com/webmaster/home/mysites');
  }
}

if (import.meta.url === `file://${process.argv[1]}`) {
  await monitorSEO();
}
