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

export async function fetchMatches(): Promise<Match[]> {
  return matchesData as Match[];
}

