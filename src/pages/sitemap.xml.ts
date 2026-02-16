import type { APIRoute } from 'astro';
import { fetchMatches } from '../lib/fetchMatches';

export const GET: APIRoute = async () => {
  const site = 'https://pirlotv.velcuri.io';
  const staticUrls = [
    '/',
    '/roja-directa-en-vivo/',
    '/tarjeta-roja-en-vivo/',
    '/partidos-hoy/',
    '/liga-mx-en-vivo/',
    '/champions-league-en-vivo/'
  ];

  const matches = await fetchMatches();
  const matchUrls = matches.map(match => `/${match.slug}/`);

  const urls = [...staticUrls, ...matchUrls];

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    url => `<url>
  <loc>${site}${url}</loc>
  <changefreq>hourly</changefreq>
  <priority>0.8</priority>
</url>`
  )
  .join('\n')}
</urlset>`;

  return new Response(body, {
    status: 200,
    headers: {
      'Content-Type': 'application/xml; charset=utf-8'
    }
  });
};

