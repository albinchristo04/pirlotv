import type { APIRoute } from 'astro';

export const GET: APIRoute = async () => {
  const body = `User-agent: *
Allow: /
Sitemap: https://pirlotv.velcuri.io/sitemap.xml
`;

  return new Response(body, {
    status: 200,
    headers: {
      'Content-Type': 'text/plain; charset=utf-8'
    }
  });
};

