import 'dotenv/config';
import axios from 'axios';
import fs from 'fs/promises';
import path from 'path';

function getFallbackMatches() {
  const today = new Date().toISOString().slice(0, 10);
  return [
    {
      team_a: 'Barcelona',
      team_b: 'Real Madrid',
      league: 'La Liga',
      date: today,
      time: '20:00',
      decoded_iframe_url: 'https://example.com/embed/barcelona-real-madrid'
    },
    {
      team_a: 'América',
      team_b: 'Chivas',
      league: 'Liga MX',
      date: today,
      time: '22:00',
      decoded_iframe_url: 'https://example.com/embed/america-chivas'
    }
  ];
}

async function fetchMatches() {
  const url = process.env.MATCHES_JSON_URL;
  let rawText = '';
  try {
    const response = await axios.get(url, { timeout: 10000, responseType: 'text' });
    rawText = response.data;
    const data = JSON.parse(rawText);

    let list = [];

    console.log('Fetched matches JSON type:', typeof data);
    if (Array.isArray(data)) {
      console.log('Top-level array length:', data.length);
    } else if (data && typeof data === 'object') {
      console.log('Top-level keys:', Object.keys(data));
    }

    if (Array.isArray(data)) {
      list = data;
    } else if (data && Array.isArray(data.matches)) {
      list = data.matches;
    } else if (data && Array.isArray(data.partidos)) {
      list = data.partidos;
    } else if (data && Array.isArray(data.data)) {
      list = data.data;
    } else if (data && typeof data === 'object') {
      const values = Object.values(data);
      const arrayValues = values.filter(v => Array.isArray(v));
      if (arrayValues.length > 0) {
        list = arrayValues.flat();
      } else {
        const objectMatches = values.filter(
          v => v && typeof v === 'object' && !Array.isArray(v) && (v.team_a || v.team_b)
        );
        if (objectMatches.length > 0) {
          list = objectMatches;
        }
      }
    }

    if (!Array.isArray(list) || list.length === 0) {
      console.error('Unexpected matches JSON structure from MATCHES_JSON_URL, using fallback sample matches');
      const dir = path.join(process.cwd(), 'src', 'data');
      await fs.mkdir(dir, { recursive: true });
      await fs.writeFile(path.join(dir, 'matches-raw.json'), rawText || JSON.stringify(data, null, 2));
      list = getFallbackMatches();
    }

    const enhanced = list.map(m => ({
      ...m,
      id: m.id || `${m.team_a}-${m.team_b}-${m.date}`.replace(/\s+/g, '-'),
      slug: `${m.team_a}-vs-${m.team_b}-${m.date}`.toLowerCase().replace(/\s+/g, '-'),
      updated_at: new Date().toISOString()
    }));
    const dir = path.join(process.cwd(), 'src', 'data');
    await fs.mkdir(dir, { recursive: true });
    await fs.writeFile(path.join(dir, 'matches.json'), JSON.stringify(enhanced, null, 2));
    console.log(`✓ Fetched ${enhanced.length} matches`);
    return enhanced;
  } catch (error) {
    console.error('Error fetching matches:', error.message);
    try {
      if (rawText) {
        const dir = path.join(process.cwd(), 'src', 'data');
        await fs.mkdir(dir, { recursive: true });
        await fs.writeFile(path.join(dir, 'matches-raw.json'), rawText);
      }
      const fallback = getFallbackMatches();
      const dir = path.join(process.cwd(), 'src', 'data');
      await fs.mkdir(dir, { recursive: true });
      await fs.writeFile(
        path.join(dir, 'matches.json'),
        JSON.stringify(
          fallback.map(m => ({
            ...m,
            id: m.id || `${m.team_a}-${m.team_b}-${m.date}`.replace(/\s+/g, '-'),
            slug: `${m.team_a}-vs-${m.team_b}-${m.date}`.toLowerCase().replace(/\s+/g, '-'),
            updated_at: new Date().toISOString()
          })),
          null,
          2
        )
      );
    } catch (e) {
    }
    return [];
  }
}

if (import.meta.url === `file://${process.argv[1]}`) {
  await fetchMatches();
}

export { fetchMatches };
