/**
 * 10 Sector Districts in the MarketVerse City.
 */
export const SECTORS = [
  {
    id: 'BANKING',
    name: 'Banking & Financial Services',
    short: 'Banking',
    color: '#3BAA91',
    hex: 0x3baa91,
    center: { x: -75, z: -25 },
    size: { w: 54, d: 44 }
  },
  {
    id: 'TECH',
    name: 'Information Technology',
    short: 'Technology',
    color: '#4B8BE8',
    hex: 0x4b8be8,
    center: { x: 75, z: -25 },
    size: { w: 54, d: 44 }
  },
  {
    id: 'ENERGY',
    name: 'Energy & Utilities',
    short: 'Energy',
    color: '#D6A84F',
    hex: 0xd6a84f,
    center: { x: -75, z: 32 },
    size: { w: 54, d: 44 }
  },
  {
    id: 'HEALTH',
    name: 'Healthcare & Pharmaceuticals',
    short: 'Healthcare',
    color: '#B58AE0',
    hex: 0xb58ae0,
    center: { x: 75, z: 32 },
    size: { w: 54, d: 44 }
  },
  {
    id: 'AUTO',
    name: 'Automotive & Manufacturing',
    short: 'Automotive',
    color: '#E8875A',
    hex: 0xe8875a,
    center: { x: -75, z: 86 },
    size: { w: 54, d: 40 }
  },
  {
    id: 'CONSUMER',
    name: 'Consumer Goods & Retail',
    short: 'Consumer',
    color: '#D9789B',
    hex: 0xd9789b,
    center: { x: 75, z: 86 },
    size: { w: 54, d: 40 }
  },
  {
    id: 'TELECOM',
    name: 'Telecommunications',
    short: 'Telecom',
    color: '#5EC2D6',
    hex: 0x5ec2d6,
    center: { x: -24, z: -82 },
    size: { w: 44, d: 36 }
  },
  {
    id: 'INFRA_IND',
    name: 'Infrastructure & Industrials',
    short: 'Industrials',
    color: '#9EA8B6',
    hex: 0x9ea8b6,
    center: { x: 24, z: -82 },
    size: { w: 44, d: 36 }
  },
  {
    id: 'MATERIALS',
    name: 'Materials & Metals',
    short: 'Materials',
    color: '#C7956D',
    hex: 0xc7956d,
    center: { x: -75, z: -82 },
    size: { w: 46, d: 36 }
  },
  {
    id: 'OTHER',
    name: 'Other Listed Companies',
    short: 'Diversified',
    color: '#7C8DA6',
    hex: 0x7c8da6,
    center: { x: 75, z: -82 },
    size: { w: 46, d: 36 }
  }
];

export const SECTOR_MAP = Object.fromEntries(SECTORS.map(s => [s.id, s]));