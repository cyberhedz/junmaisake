// A small local "assistant" — pulls structured filters (style, region,
// price, dry/sweet) out of a free-text question and matches them against
// the real product catalog. There's no language model behind this; it's a
// heuristic matcher, same spirit as the rest of this MVP's mocked pieces.
import type { Brewery, Product, SakeStyle } from '../types';

const REGIONS = ['Niigata', 'Kyoto', 'Akita', 'Hiroshima', 'Yamagata'];

export interface AssistantAnswer {
  reply: string;
  matches: Product[];
}

export function answerQuery(
  rawQuery: string,
  products: Product[],
  breweries: Brewery[],
): AssistantAnswer {
  const q = rawQuery.trim().toLowerCase();
  if (!q) {
    return {
      reply: 'Ask me something like “a dry junmai from Niigata under $40.”',
      matches: [],
    };
  }

  let style: SakeStyle | undefined;
  if (q.includes('daiginjo')) style = 'Junmai Daiginjo';
  else if (q.includes('ginjo')) style = 'Junmai Ginjo';
  else if (q.includes('junmai')) style = 'Junmai';

  const region = REGIONS.find((r) => q.includes(r.toLowerCase()));

  let maxPrice: number | undefined;
  const underMatch = q.match(/(?:under|below|less than)\s*\$?(\d+)/);
  if (underMatch) maxPrice = Number(underMatch[1]);
  else if (/\b(cheap|budget|affordable|inexpensive)\b/.test(q)) maxPrice = 35;

  let minPrice: number | undefined;
  if (/\b(premium|splurge|special occasion|top[- ]shelf|expensive)\b/.test(q)) minPrice = 70;

  let dry: boolean | undefined;
  if (/\bdry\b/.test(q)) dry = true;
  else if (/\bsweet\b/.test(q)) dry = false;

  const hasStructuredFilter =
    style !== undefined ||
    region !== undefined ||
    maxPrice !== undefined ||
    minPrice !== undefined ||
    dry !== undefined;

  let results: Product[];
  if (hasStructuredFilter) {
    results = products.filter((p) => {
      if (style && p.style !== style) return false;
      if (region && p.region !== region) return false;
      if (maxPrice !== undefined && p.price > maxPrice) return false;
      if (minPrice !== undefined && p.price < minPrice) return false;
      if (dry === true && p.smv < 0) return false;
      if (dry === false && p.smv >= 0) return false;
      return true;
    });
  } else {
    const words = q.split(/\s+/).filter((w) => w.length > 2);
    results = products.filter((p) => {
      const brewery = breweries.find((b) => b.id === p.breweryId);
      const haystack = [p.name, p.nameJa, p.region, p.rice, p.style, brewery?.name]
        .filter(Boolean)
        .join(' ')
        .toLowerCase();
      return words.some((w) => haystack.includes(w));
    });
  }

  results = results.slice(0, 3);

  if (results.length === 0) {
    return {
      reply:
        "I couldn't find a match in our catalog. Try naming a style (junmai, ginjo, daiginjo), a region (Niigata, Kyoto, Akita, Hiroshima, Yamagata), or a price range.",
      matches: [],
    };
  }

  const descriptors = [
    style ? style.toLowerCase() : null,
    region ? `from ${region}` : null,
    maxPrice !== undefined ? `under $${maxPrice}` : null,
    minPrice !== undefined ? `over $${minPrice}` : null,
    dry === true ? 'on the dry side' : dry === false ? 'on the sweeter side' : null,
  ].filter(Boolean);

  const reply = descriptors.length
    ? `Here's what we have ${descriptors.join(', ')}:`
    : "Here's what matched in our catalog:";

  return { reply, matches: results };
}
