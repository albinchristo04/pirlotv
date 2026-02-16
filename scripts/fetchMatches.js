import 'dotenv/config';
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
      updated_at: new Date().toISOString()
    }));
    const dir = path.join(process.cwd(), 'src', 'data');
    await fs.mkdir(dir, { recursive: true });
    await fs.writeFile(path.join(dir, 'matches.json'), JSON.stringify(enhanced, null, 2));
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
