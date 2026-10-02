import type { Brewery } from '../types';

// Eight independent breweries. Names and stories are original to this
// project (not real-world brands) — regions and brewing detail are
// plausible and drawn from real prefectures and techniques.
export const breweries: Brewery[] = [
  {
    id: 'br-shirakawa',
    slug: 'shirakawa-shuzo',
    name: 'Shirakawa Shuzo',
    nameJa: '白川酒造',
    region: 'Niigata',
    founded: 1897,
    story:
      'Four generations on the Shinano River, brewing junmai only since the family took over a flood-damaged kura in 1897. Niigata winters mean long, cold ferments and a house style that stays dry and clean rather than showy.',
    color: '#3f5a52',
  },
  {
    id: 'br-tsukikage',
    slug: 'tsukikage-shuzo',
    name: 'Tsukikage Shuzo',
    nameJa: '月影酒造',
    region: 'Niigata',
    founded: 1924,
    story:
      'A small-batch brewery built around a single well of snowmelt water. Tsukikage makes one size of batch — small — and would rather sell out in March than scale up.',
    color: '#4a4036',
  },
  {
    id: 'br-kyo-no-izumi',
    slug: 'kyo-no-izumi',
    name: 'Kyo no Izumi',
    nameJa: '京の泉',
    region: 'Kyoto',
    founded: 1868,
    story:
      "Fushimi-district brewery using the soft, iron-free water the neighborhood has been known for since the Edo period. Kyo no Izumi's sake is built for food — rounder and quieter than the Niigata style.",
    color: '#6b4a3a',
  },
  {
    id: 'br-rakuyo',
    slug: 'rakuyo-shuzo',
    name: 'Rakuyo Shuzo',
    nameJa: '洛陽酒造',
    region: 'Kyoto',
    founded: 1951,
    story:
      'A newer kura by Kyoto standards, founded by a brewer who trained in Fushimi and wanted to focus entirely on ginjo-grade polishing. Small team, high rice-polishing ratios, nothing rushed.',
    color: '#5a3d4a',
  },
  {
    id: 'br-akita-homare',
    slug: 'akita-homare',
    name: 'Akita Homare',
    nameJa: '秋田誉',
    region: 'Akita',
    founded: 1902,
    story:
      "Named for the rice valleys south of Akita City. The brewery cold-ferments through the prefecture's famously long, dark winters, which the toji credits for the house's signature umami weight.",
    color: '#2f3e4a',
  },
  {
    id: 'br-kiyoizumi',
    slug: 'kiyoizumi-shuzo',
    name: 'Kiyoizumi Shuzo',
    nameJa: '清泉酒造',
    region: 'Akita',
    founded: 1933,
    story:
      'Built around a mountain spring the brewery is named for. Kiyoizumi specializes almost entirely in junmai daiginjo — high polish, low yield, and very little of it leaves Akita.',
    color: '#4b5842',
  },
  {
    id: 'br-hiroshima-taru',
    slug: 'hiroshima-taru',
    name: 'Hiroshima Taru',
    nameJa: '広島樽',
    region: 'Hiroshima',
    founded: 1889,
    story:
      'A coastal brewery that helped popularize soft-water ginjo brewing techniques in the region a century ago. Still family-run, still using the same low-temperature fermentation approach.',
    color: '#7a4a2e',
  },
  {
    id: 'br-mogami',
    slug: 'mogami-shuzo',
    name: 'Mogami Shuzo',
    nameJa: '最上酒造',
    region: 'Yamagata',
    founded: 1912,
    story:
      'Named for the Mogami river that cuts through the mountain rice country the brewery sources from. Small output, mostly local rice, built around balance rather than intensity.',
    color: '#5c4a2f',
  },
];
