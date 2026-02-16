# AI AGENT PROMPT: PIRLO TV - COMPLETE BUILD
## Bing SEO Optimization with Astro + GitHub Actions + Cloudflare Pages

---

## EXECUTIVE SUMMARY

You are tasked with building a production-ready website for **Pirlo TV** (pirlotv.velcuri.io) that:
1. Ranks #1 on **Bing Search Engine** for target keywords
2. Automatically fetches live match data from JSON source
3. Deploys via **Cloudflare Pages** with **Astro** static site generator
4. Uses **GitHub Actions** to automate builds, deployments, Bing submissions, and SEO monitoring
5. Implements comprehensive SEO strategies for maximum Bing visibility

---

## PART 1: KEYWORD RESEARCH & SEO STRATEGY

### 1.1 Primary Keywords (Tier 1 - Highest Priority)
```
Pirlo TV
Roja Directa
Rojadirecta
Tarjeta Roja
Ver fútbol en vivo
Fútbol en vivo gratis
Partidos en vivo online
Rojadirecta TV
Pirlo TV en vivo
```

### 1.2 Secondary Keywords (Tier 2)
```
Roja Directa en vivo
Tarjeta Roja TV
Tarjeta Roja en vivo
Roja Directa TV
Pirlo TV Rojadirecta
Roja Directa Partidos hoy
Fútbol en vivo hoy
Transmisión de fútbol
Deportes en vivo
Elitegol
Rojadirectatv
Roja TV
Pirlo
La roja directa
Roja
```

### 1.3 Long-Tail Keywords
```
Roja directa en vivo fútbol gratis
Rojadirecta pirlo tv
Pirlo tv tarjeta roja
Pirlo tv en vivo hoy
Pirlo tv hd online
Tarjeta roja fútbol en vivo
Rojadirecta en vivo fútbol gratis
Pirlo.tv en vivo
Tarjeta roja tv en vivo
Pirlo tv online
Cómo ver fútbol sin registrarse
Roja directa partidos gratis
Tarjeta roja directa hoy
Pirlotvhd online
```

### 1.4 Branded & Navigational Keywords
```
pirlotv.velcuri.io
pirlo tv online
roja directa online
rojadirecta en vivo
tarjeta roja online
```

---

## PART 2: COMPLETE PROJECT SETUP

### 2.1 GitHub Repository Structure

```
pirlo-tv/
├── .github/workflows/
│   ├── build-deploy.yml
│   ├── bing-sitemap-submit.yml
│   ├── bing-ping-urls.yml
│   ├── fetch-matches.yml
│   └── seo-monitoring.yml
├── src/
│   ├── layouts/Base.astro
│   ├── pages/
│   │   ├── index.astro
│   │   ├── roja-directa-en-vivo.astro
│   │   ├── tarjeta-roja-en-vivo.astro
│   │   ├── partidos-hoy.astro
│   │   ├── liga-mx-en-vivo.astro
│   │   ├── champions-league-en-vivo.astro
│   │   ├── [match].astro
│   │   ├── blog/[slug].astro
│   │   ├── sitemap.xml.ts
│   │   └── robots.txt.ts
│   ├── components/
│   │   ├── MatchCard.astro
│   │   ├── MatchStream.astro
│   │   ├── LeagueGrid.astro
│   │   └── SEO/*.astro
│   ├── lib/
│   │   ├── fetchMatches.ts
│   │   ├── seo.ts
│   │   └── schema.ts
│   └── data/matches.json
├── scripts/
│   ├── fetchMatches.js
│   ├── bingPing.js
│   ├── submitBingSitemap.js
│   └── seoMonitoring.js
├── astro.config.mjs
├── package.json
└── .env.example
```

### 2.2 Astro Configuration

```javascript
// astro.config.mjs
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import compress from 'astro-compress';

export default defineConfig({
  site: 'https://pirlotv.velcuri.io',
  build: { format: 'directory' },
  output: 'static',
  trailingSlash: 'always',
  
  integrations: [
    sitemap({
      changefreq: 'daily',
      priority: 0.7,
      lastmod: new Date(),
    }),
    compress(),
  ],
});
```

### 2.3 Package.json

```json
{
  "name": "pirlo-tv",
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "astro dev",
    "build": "astro build",
    "fetch:matches": "node scripts/fetchMatches.js",
    "bing:ping": "node scripts/bingPing.js",
    "bing:sitemap": "node scripts/submitBingSitemap.js",
    "seo:monitor": "node scripts/seoMonitoring.js"
  },
  "dependencies": {
    "astro": "^4.0.0",
    "@astrojs/sitemap": "^3.0.0",
    "astro-compress": "^2.0.0",
    "axios": "^1.6.0",
    "dotenv": "^16.3.0"
  }
}
```

### 2.4 Environment Variables

```env
# .env
BING_WEBMASTER_API_KEY=your_key_here
BING_SITE_URL=https://pirlotv.velcuri.io
MATCHES_JSON_URL=https://raw.githubusercontent.com/albinchristo04/ptv/refs/heads/main/futbollibre.json
CF_ACCOUNT_ID=your_account_id
CF_API_TOKEN=your_api_token
```

---

## PART 3: CORE PAGES

### 3.1 Homepage (index.astro)

```astro
---
import Base from '../layouts/Base.astro';
import { fetchMatches } from '../lib/fetchMatches';

const matches = await fetchMatches();

const pageTitle = 'Pirlo TV | Roja Directa - Ver Fútbol en Vivo Gratis';
const pageDescription = 'Pirlo TV - Roja Directa. Mira fútbol en vivo gratis. Liga MX, Champions League, Premier League sin registrarse ⚽';
const pageKeywords = 'Pirlo TV, Roja Directa, Rojadirecta, Tarjeta Roja, ver fútbol en vivo';
---

<Base title={pageTitle} description={pageDescription} keywords={pageKeywords}>
  <section class="hero">
    <h1>Pirlo TV - Roja Directa 🎯</h1>
    <p>Ver fútbol en vivo gratis - Liga MX, Champions League, Premier League y más</p>
    <div class="search-box">
      <input type="text" placeholder="Buscar partido..." id="matchSearch" />
      <button>🔍</button>
    </div>
    <p>✓ Gratis ✓ Roja Directa ✓ En vivo ✓ Sin registrarse</p>
  </section>

  <section class="featured-section">
    <h2>Partidos en Directo Ahora</h2>
    <!-- Match cards here -->
  </section>

  <section class="brands-section">
    <h2>Diferentes Formas de Acceder</h2>
    <div class="brands-grid">
      <div class="brand-card">
        <h3>Pirlo TV</h3>
        <p>Transmisión de fútbol en vivo de todos los partidos principales</p>
      </div>
      <div class="brand-card">
        <h3>Roja Directa</h3>
        <p>Acceso directo a fútbol en vivo sin interrupciones</p>
      </div>
      <div class="brand-card">
        <h3>Tarjeta Roja</h3>
        <p>Todos tus partidos favoritos en un mismo lugar</p>
      </div>
    </div>
  </section>

  <section class="faq-section">
    <h2>Preguntas Frecuentes</h2>
    <div class="faq-item">
      <h3>¿Qué es Pirlo TV?</h3>
      <p>Pirlo TV es una plataforma de transmisión en vivo de fútbol completamente gratuita.</p>
    </div>
    <div class="faq-item">
      <h3>¿Cómo ver sin registrarse?</h3>
      <p>No necesitas crear cuenta. Solo selecciona el partido y presiona play.</p>
    </div>
    <div class="faq-item">
      <h3>¿Qué es Roja Directa?</h3>
      <p>Roja Directa es un servicio de transmisión en vivo de fútbol popular en el mundo hispanohablante.</p>
    </div>
  </section>

  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Pirlo TV - Roja Directa",
    "url": "https://pirlotv.velcuri.io",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://pirlotv.velcuri.io/buscar?q={search_term}"
    }
  }
  </script>
</Base>

<style>
  .hero {
    background: linear-gradient(135deg, #c41e3a 0%, #8b0000 100%);
    color: white;
    padding: 4rem 2rem;
    text-align: center;
  }

  .hero h1 {
    font-size: 3rem;
    margin-bottom: 1rem;
  }

  .search-box {
    display: flex;
    max-width: 500px;
    margin: 0 auto 1.5rem;
    background: white;
    border-radius: 0.5rem;
  }

  .search-box input {
    flex: 1;
    padding: 0.75rem 1rem;
    border: none;
  }

  .search-box button {
    padding: 0.75rem 1.5rem;
    background: #c41e3a;
    color: white;
    border: none;
    cursor: pointer;
  }

  .brands-section {
    padding: 3rem 2rem;
    max-width: 1200px;
    margin: 0 auto;
  }

  .brands-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1.5rem;
  }

  .brand-card {
    background: #f9f9f9;
    padding: 2rem;
    border-left: 4px solid #c41e3a;
  }
</style>
```

### 3.2 Roja Directa Page

```astro
---
import Base from '../layouts/Base.astro';
import { fetchMatches } from '../lib/fetchMatches';

const matches = await fetchMatches();

const pageTitle = 'Roja Directa en Vivo | Transmisión en Directo Gratis';
const pageDescription = 'Roja Directa en vivo. Transmisión en directo de todos los partidos de fútbol. Sin registrarse ⚽';
const pageKeywords = 'roja directa en vivo, roja directa, tarjeta roja en vivo';
---

<Base title={pageTitle} description={pageDescription} keywords={pageKeywords}>
  <section class="roja-hero">
    <h1>Roja Directa en Vivo</h1>
    <p>Transmisión en directo de todos tus partidos favoritos</p>
  </section>

  <section class="content-container">
    <h2>¿Qué es Roja Directa?</h2>
    <p>
      Roja Directa es el servicio de transmisión de fútbol en vivo más popular en el mundo hispanohablante. 
      Ofrece cobertura de los principales partidos internacionales incluyendo Liga MX, Champions League, 
      Premier League, La Liga, Serie A y Copa Libertadores completamente gratis.
    </p>

    <h2>Partidos Disponibles en Roja Directa</h2>
    <!-- Match cards grid -->

    <h2>Ventajas de Roja Directa en Pirlo TV</h2>
    <ul class="advantages">
      <li>✓ Acceso gratuito a toda la transmisión</li>
      <li>✓ Sin necesidad de registrarse</li>
      <li>✓ Múltiples opciones de transmisión</li>
      <li>✓ Transmisión en HD</li>
      <li>✓ Compatible con todos los dispositivos</li>
    </ul>
  </section>
</Base>

<style>
  .roja-hero {
    background: linear-gradient(135deg, #8b0000 0%, #5c0000 100%);
    color: white;
    padding: 3rem 2rem;
    text-align: center;
  }

  .content-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 3rem 2rem;
  }

  .advantages {
    list-style: none;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1rem;
  }

  .advantages li {
    padding: 1rem;
    background: #f9f9f9;
    border-left: 4px solid #c41e3a;
  }
</style>
```

### 3.3 Tarjeta Roja Page

```astro
---
import Base from '../layouts/Base.astro';

const pageTitle = 'Tarjeta Roja en Vivo | Transmisión en Directo';
const pageDescription = 'Tarjeta Roja - Transmisión en vivo de fútbol. Ver todos los partidos en directo gratis ⚽';
const pageKeywords = 'tarjeta roja, tarjeta roja en vivo, tarjeta roja tv';
---

<Base title={pageTitle} description={pageDescription} keywords={pageKeywords}>
  <section class="tarjeta-hero">
    <h1>Tarjeta Roja en Vivo</h1>
    <p>La mejor forma de ver fútbol en directo</p>
  </section>

  <section class="content-container">
    <h2>Transmisión de Tarjeta Roja</h2>
    <p>
      Tarjeta Roja es una alternativa popular para ver fútbol en vivo. Ofrece transmisión en directo 
      de partidos de las principales ligas europeas y latinoamericanas completamente gratis.
    </p>

    <h2>Por Qué Elegir Tarjeta Roja en Pirlo TV</h2>
    <div class="comparison">
      <div class="comp-item">
        <h3>Fácil de Usar</h3>
        <p>Interfaz simple e intuitiva</p>
      </div>
      <div class="comp-item">
        <h3>Múltiples Enlaces</h3>
        <p>Varias opciones de transmisión</p>
      </div>
      <div class="comp-item">
        <h3>100% Gratis</h3>
        <p>Sin cuotas ni suscripciones</p>
      </div>
    </div>
  </section>
</Base>

<style>
  .tarjeta-hero {
    background: linear-gradient(135deg, #d32f2f 0%, #8b0000 100%);
    color: white;
    padding: 3rem 2rem;
    text-align: center;
  }

  .comparison {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 2rem;
    margin: 2rem 0;
  }

  .comp-item {
    padding: 2rem;
    background: #f9f9f9;
    border-top: 4px solid #c41e3a;
  }
</style>
```

### 3.4 Dynamic Match Pages

```astro
---
import Base from '../layouts/Base.astro';
import { fetchMatches } from '../lib/fetchMatches';

export async function getStaticPaths() {
  const matches = await fetchMatches();
  return matches.map((match) => ({
    params: { match: match.id },
    props: { match, allMatches: matches },
  }));
}

const { match, allMatches } = Astro.props;

const pageTitle = `${match.team_a} vs ${match.team_b} en vivo${match.league ? ' - ' + match.league : ''} | Pirlo TV`;
const pageDescription = `Ver ${match.team_a} vs ${match.team_b} en vivo. Roja Directa - Pirlo TV. Sin registrarse ⚽`;
---

<Base title={pageTitle} description={pageDescription}>
  <nav class="breadcrumb">
    <a href="/">Inicio</a> / <span>{match.team_a} vs {match.team_b}</span>
  </nav>

  <main class="match-container">
    <section class="match-header">
      <h1>{match.team_a} <span class="vs">vs</span> {match.team_b}</h1>
      <div class="match-meta">
        <span class="league">{match.league}</span>
        <span class="date">{new Date(match.date).toLocaleDateString('es-ES')}</span>
        <span class="time">{match.time}</span>
      </div>
    </section>

    <section class="stream-section">
      <div class="stream-container">
        <iframe
          src={match.decoded_iframe_url}
          title={`${match.team_a} vs ${match.team_b}`}
          allow="autoplay; fullscreen"
          allowFullScreen
          style={{width: '100%', height: '500px', borderRadius: '0.5rem'}}
        ></iframe>
      </div>

      <aside class="match-details">
        <div class="detail-card">
          <h2>Información</h2>
          <dl>
            <dt>Local:</dt><dd>{match.team_a}</dd>
            <dt>Visitante:</dt><dd>{match.team_b}</dd>
            <dt>Liga:</dt><dd>{match.league}</dd>
            <dt>Hora:</dt><dd>{match.time}</dd>
          </dl>
        </div>
        <div class="detail-card">
          <h2>Opciones</h2>
          <ul>
            <li>✓ Roja Directa</li>
            <li>✓ Pirlo TV</li>
            <li>✓ Sin registrarse</li>
            <li>✓ En HD</li>
          </ul>
        </div>
      </aside>
    </section>

    <section class="faq-match">
      <h2>Preguntas Frecuentes</h2>
      <div class="faq-item">
        <h3>¿A qué hora comienza el partido?</h3>
        <p>El partido comenzará a las {match.time} hora local.</p>
      </div>
      <div class="faq-item">
        <h3>¿Puedo ver sin registrarse?</h3>
        <p>Sí, en Pirlo TV puedes ver sin crear cuenta.</p>
      </div>
    </section>
  </main>

  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "SportsEvent",
    "name": `${match.team_a} vs ${match.team_b}`,
    "startDate": `${match.date}T${match.time}`,
    "performer": [
      {"@type": "SportsTeam", "name": match.team_a},
      {"@type": "SportsTeam", "name": match.team_b}
    ]
  }
  </script>
</Base>

<style>
  .match-header h1 {
    font-size: 2.5rem;
    margin-bottom: 1rem;
  }

  .vs {
    color: #999;
    font-size: 1.2rem;
  }

  .stream-section {
    display: grid;
    grid-template-columns: 1fr 300px;
    gap: 2rem;
    margin: 3rem 0;
  }

  .match-details {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  @media (max-width: 768px) {
    .stream-section {
      grid-template-columns: 1fr;
    }
  }
</style>
```

---

## PART 4: GITHUB ACTIONS WORKFLOWS

### 4.1 Build & Deploy

```yaml
# .github/workflows/build-deploy.yml
name: Build and Deploy

on:
  push:
    branches: [main]
  schedule:
    - cron: '0 */6 * * *'

jobs:
  build:
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'

      - run: npm ci
      - run: npm run fetch:matches
        env:
          MATCHES_JSON_URL: ${{ secrets.MATCHES_JSON_URL }}
      
      - run: npm run build

      - name: Deploy to Cloudflare Pages
        uses: cloudflare/pages-action@v1
        with:
          apiToken: ${{ secrets.CLOUDFLARE_API_TOKEN }}
          accountId: ${{ secrets.CLOUDFLARE_ACCOUNT_ID }}
          projectName: pirlo-tv
          directory: ./dist
          productionBranch: main
```

### 4.2 Bing Sitemap Submission

```yaml
# .github/workflows/bing-sitemap-submit.yml
name: Submit Sitemap to Bing

on:
  workflow_run:
    workflows: ["Build and Deploy"]
    types: [completed]
  schedule:
    - cron: '0 6 * * *'

jobs:
  submit:
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      
      - run: npm ci
      - run: node scripts/submitBingSitemap.js
        env:
          BING_WEBMASTER_API_KEY: ${{ secrets.BING_WEBMASTER_API_KEY }}
          SITE_URL: https://pirlotv.velcuri.io
```

### 4.3 Bing URL Pinging

```yaml
# .github/workflows/bing-ping-urls.yml
name: Ping Bing

on:
  push:
    branches: [main]
  schedule:
    - cron: '0 */4 * * *'

jobs:
  ping:
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      
      - run: npm ci
      - run: npm run fetch:matches
        env:
          MATCHES_JSON_URL: ${{ secrets.MATCHES_JSON_URL }}
      - run: npm run bing:ping
        env:
          BING_WEBMASTER_API_KEY: ${{ secrets.BING_WEBMASTER_API_KEY }}
          SITE_URL: https://pirlotv.velcuri.io
```

### 4.4 Fetch Matches

```yaml
# .github/workflows/fetch-matches.yml
name: Fetch Matches

on:
  schedule:
    - cron: '0 */2 * * *'
  workflow_dispatch:

jobs:
  fetch:
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      
      - run: npm ci
      - run: npm run fetch:matches
        env:
          MATCHES_JSON_URL: ${{ secrets.MATCHES_JSON_URL }}
      
      - name: Commit changes
        run: |
          git config user.name "Bot"
          git config user.email "bot@github.com"
          git add src/data/matches.json
          git diff --cached --quiet || (git commit -m "Update matches" && git push)
```

### 4.5 SEO Monitoring

```yaml
# .github/workflows/seo-monitoring.yml
name: SEO Monitoring

on:
  schedule:
    - cron: '0 9 * * *'

jobs:
  monitor:
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      
      - run: npm ci
      - run: npm run seo:monitor
        env:
          BING_WEBMASTER_API_KEY: ${{ secrets.BING_WEBMASTER_API_KEY }}
          SITE_URL: https://pirlotv.velcuri.io
```

---

## PART 5: BACKEND SCRIPTS

### 5.1 Fetch Matches

```javascript
// scripts/fetchMatches.js
import axios from 'axios';
import fs from 'fs/promises';
import path from 'path';

async function fetchMatches() {
  const url = process.env.MATCHES_JSON_URL;
  
  try {
    const { data } = await axios.get(url, { timeout: 10000 });
    
    const enhanced = data.map(m => ({
      ...m,
      id: m.id || `${m.team_a}-${m.team_b}-${m.date}`.replace(/\s+/g, '-'),
      slug: `${m.team_a}-vs-${m.team_b}-${m.date}`.toLowerCase().replace(/\s+/g, '-'),
      updated_at: new Date().toISOString(),
    }));

    const dir = path.join(process.cwd(), 'src/data');
    await fs.mkdir(dir, { recursive: true });
    await fs.writeFile(
      path.join(dir, 'matches.json'),
      JSON.stringify(enhanced, null, 2)
    );

    console.log(`✓ Fetched ${enhanced.length} matches`);
    return enhanced;
  } catch (error) {
    console.error('Error:', error.message);
    return [];
  }
}

if (import.meta.url === `file://${process.argv[1]}`) {
  await fetchMatches();
}

export { fetchMatches };
```

### 5.2 Bing Ping

```javascript
// scripts/bingPing.js
import axios from 'axios';
import { fetchMatches } from './fetchMatches.js';

async function pingBing() {
  const siteUrl = process.env.SITE_URL;
  const urls = [
    `${siteUrl}/`,
    `${siteUrl}/roja-directa-en-vivo/`,
    `${siteUrl}/tarjeta-roja-en-vivo/`,
    `${siteUrl}/sitemap.xml`,
  ];

  const matches = await fetchMatches();
  urls.push(...matches.slice(0, 50).map(m => `${siteUrl}/${m.slug}/`));

  const results = await Promise.allSettled(
    urls.map(url =>
      axios.post('https://www.bing.com/ping', {
        siteUrl,
        url,
      }, { timeout: 5000 })
    )
  );

  const successful = results.filter(r => r.status === 'fulfilled').length;
  console.log(`✓ Pinged ${successful}/${urls.length} URLs to Bing`);
}

if (import.meta.url === `file://${process.argv[1]}`) {
  await pingBing();
}
```

### 5.3 Bing Sitemap Submit

```javascript
// scripts/submitBingSitemap.js
import axios from 'axios';

async function submitSitemap() {
  const apiKey = process.env.BING_WEBMASTER_API_KEY;
  const siteUrl = process.env.SITE_URL;

  try {
    await axios.post('https://www.bing.com/webmaster/api.sitemaps.submit', null, {
      params: {
        apikey: apiKey,
        siteUrl,
        sitemap: `${siteUrl}/sitemap.xml`,
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
```

### 5.4 SEO Monitoring

```javascript
// scripts/seoMonitoring.js
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
        type: 'query',
      },
      timeout: 10000,
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
```

---

## PART 6: DEPLOYMENT

### 6.1 Cloudflare Pages

1. Go to Cloudflare Pages
2. Connect `pirlo-tv` GitHub repo
3. Build: `npm run build`
4. Output: `dist`
5. Add environment variables
6. Add custom domain: `pirlotv.velcuri.io`

### 6.2 GitHub Secrets

```
CLOUDFLARE_API_TOKEN
CLOUDFLARE_ACCOUNT_ID
BING_WEBMASTER_API_KEY
MATCHES_JSON_URL
```

### 6.3 Bing Webmaster Tools

1. Add site: `pirlotv.velcuri.io`
2. Verify with meta tag
3. Submit sitemap
4. Get API key

---

## PART 7: LAUNCH

```bash
git clone https://github.com/yourusername/pirlo-tv.git
cd pirlo-tv
npm install
cp .env.example .env
# Add your secrets to .env
npm run dev
npm run build
npm run fetch:matches
git add .
git commit -m "Initial setup"
git push origin main
```

---

## SUCCESS METRICS (90 Days)

✅ 150+ keywords ranking on Bing
✅ 10,000+ monthly impressions  
✅ 1,000+ monthly clicks
✅ Top 10 for primary keywords
✅ 2-3% CTR

---

**This complete prompt contains everything needed to build a fully automated, Bing-optimized Pirlo TV website.**
