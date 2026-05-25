import { palette } from '@/src/art/palette';

export type DistrictId = 'granary' | 'barracks' | 'academy' | 'embassy';

export type District = {
  id: DistrictId;
  name: string;
  building: string;
  pillar: string;
  resource: string;
  tagline: string;
  examples: string[];
  color: string;
  colorDark: string;
  advisor: { title: string; name: string; voice: string };
};

export const DISTRICTS: Record<DistrictId, District> = {
  granary: {
    id: 'granary',
    name: 'Granary',
    building: 'The Granary',
    pillar: 'Nutrition',
    resource: 'Grain',
    tagline: 'Fields, mills, kitchens — the city eats.',
    examples: ['log a meal', 'drink water', 'cook at home', 'mindful eating'],
    color: palette.granary,
    colorDark: palette.granaryDark,
    advisor: {
      title: 'The Quartermaster',
      name: 'Quartermaster',
      voice: 'warm, grandmotherly; cares about how you fuel the body',
    },
  },
  barracks: {
    id: 'barracks',
    name: 'Barracks',
    building: 'The Barracks',
    pillar: 'Strength',
    resource: 'Iron',
    tagline: 'Training yard, dojo — the body holds the walls.',
    examples: ['workout', 'walk', 'sleep well', 'stretch / recovery'],
    color: palette.barracks,
    colorDark: palette.barracksDark,
    advisor: {
      title: 'The General',
      name: 'General',
      voice: 'crisp, encouraging drill-instructor; never cruel',
    },
  },
  academy: {
    id: 'academy',
    name: 'Academy',
    building: 'The Academy',
    pillar: 'Knowledge',
    resource: 'Scrolls',
    tagline: 'Library, observatory — the mind is a flame.',
    examples: ['read', 'study', 'deep work', 'finish a course'],
    color: palette.academy,
    colorDark: palette.academyDark,
    advisor: {
      title: 'The Sage',
      name: 'Sage',
      voice: 'curious philosopher; asks what you are learning',
    },
  },
  embassy: {
    id: 'embassy',
    name: 'Embassy',
    building: 'The Embassy',
    pillar: 'Relationships',
    resource: 'Banners',
    tagline: 'Bridges, banquet hall — no fortress stands alone.',
    examples: ['call a friend', 'visit family', 'send a gift', 'real talk'],
    color: palette.embassy,
    colorDark: palette.embassyDark,
    advisor: {
      title: 'The Diplomat',
      name: 'Diplomat',
      voice: 'gentle, attentive; remembers names + dates',
    },
  },
};

export const DISTRICT_ORDER: DistrictId[] = ['granary', 'barracks', 'academy', 'embassy'];
