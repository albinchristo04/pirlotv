import matchesData from '../data/matches.json';

export type Match = {
  id: string;
  slug: string;
  team_a: string;
  team_b: string;
  league?: string;
  date: string;
  time: string;
  decoded_iframe_url: string;
};

function normalizeFromStrapi(raw: any): Match {
  const attributes = raw.attributes ?? {};
  const desc: string = attributes.diary_description ?? '';
  const parts = desc.split('\n').map((s: string) => s.trim()).filter(Boolean);

  let league: string | undefined;
  let team_a = '';
  let team_b = '';

  if (parts[0]) {
    const first = parts[0];
    league = first.includes(':') ? first.split(':')[0].trim() : first;
  }

  if (parts[1]) {
    const vsParts = parts[1].split(' vs ');
    if (vsParts.length >= 2) {
      team_a = vsParts[0].trim();
      team_b = vsParts[1].trim();
    }
  }

  const date: string = attributes.date_diary ?? '';
  let time: string = attributes.diary_hour ?? '';
  if (time.length >= 5) {
    time = time.slice(0, 5);
  }

  let decoded_iframe_url = '';
  const embeds = attributes.embeds?.data;
  if (Array.isArray(embeds) && embeds.length > 0) {
    const firstEmbed = embeds[0].attributes ?? {};
    decoded_iframe_url = firstEmbed.decoded_iframe_url ?? '';
  }

  const idBase =
    raw.id ??
    `${team_a || 'partido'}-${team_b || 'en-vivo'}-${date || ''}`.replace(/\s+/g, '-');
  const id = String(idBase);
  const slugBase = `${team_a || 'partido'}-vs-${team_b || 'en-vivo'}-${date || ''}`;
  const slug = slugBase.toLowerCase().replace(/\s+/g, '-');

  return {
    id,
    slug,
    team_a: team_a || 'Equipo A',
    team_b: team_b || 'Equipo B',
    league,
    date,
    time,
    decoded_iframe_url
  };
}

function normalizeCanonical(raw: any): Match {
  const team_a = raw.team_a || 'Equipo A';
  const team_b = raw.team_b || 'Equipo B';
  const date = raw.date || '';
  let time = raw.time || '';
  if (time.length >= 5) {
    time = time.slice(0, 5);
  }

  const idBase =
    raw.id ||
    `${team_a || 'partido'}-${team_b || 'en-vivo'}-${date || ''}`.replace(/\s+/g, '-');
  const id = String(idBase);
  const slugBase = `${team_a || 'partido'}-vs-${team_b || 'en-vivo'}-${date || ''}`;
  const slug = slugBase.toLowerCase().replace(/\s+/g, '-');

  return {
    id,
    slug,
    team_a,
    team_b,
    league: raw.league,
    date,
    time,
    decoded_iframe_url: raw.decoded_iframe_url || ''
  };
}

export async function fetchMatches(): Promise<Match[]> {
  const raw = matchesData as any[];
  return raw.map(item => (item && item.attributes ? normalizeFromStrapi(item) : normalizeCanonical(item)));
}
