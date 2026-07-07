export type GallerySize = 'lg' | 'md' | 'sm';

export interface GalleryItem {
  scope: string;
  equipment: string;
  location: string;
  img: string;
  size: GallerySize;
  description?: string; // used by the "plates" preview card
}

export const GALLERY: GalleryItem[] = [
  {
    scope: 'Tank Farm Maintenance Support',
    equipment: '30T 4x4 RT Crane',
    location: 'Port Harcourt Refinery',
    img: '/projects/one.jpeg',
    size: 'lg',
    description:
      'Crane support for scheduled tank farm maintenance at one of Port Harcourt\u2019s key refinery sites.',
  },
  {
    scope: 'Drilling Rig Setup',
    equipment: '110T Motor Crane',
    location: 'Fiable Global Service, Egbema, Bayelsa',
    img: '/projects/second.png',
    size: 'sm',
    description:
      'Rig setup and heavy-lift support for an active drilling programme in Egbema, Bayelsa.',
  },
  {
    scope: 'Manufacturing Plant Support',
    equipment: '110T Motor Crane',
    location: 'Inner Galaxy Steel Company Ltd. ASA, Abia',
    img: '/projects/third.png',
    size: 'md',
    description:
      'Heavy-lift crane support for ongoing manufacturing operations at Inner Galaxy Steel.',
  },
  {
    scope: 'Rig Operation Support',
    equipment: '50T (Hilong 27 rig) & 75T (Renaissance T209 Rig) 4x4 RT Cranes',
    location: 'Bayelsa',
    img: '/projects/fourth.png',
    size: 'md',
    description:
      'Integrated lifting and on-site support across two active rig operations in Bayelsa.',
  },
  {
    scope: 'Tower Crane Setup',
    equipment: '110T Motor Crane',
    location: "100,000-capacity Winner's Chapel auditorium construction site, Lagos",
    img: '/projects/five.png',
    size: 'lg',
    description:
      'Tower crane mobilisation and setup for one of Lagos\u2019s largest auditorium construction projects.',
  },
];
