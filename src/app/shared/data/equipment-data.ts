export type GallerySize = 'lg' | 'md' | 'sm';

export interface GalleryItem {
  scope: string;
  equipment: string;
  location: string;
  img: string;
  size: GallerySize;
  description?: string;
}

export const EQUIPMENTS: GalleryItem[] = [
  {
    scope: 'Dual-Crane Vessel Pick',
    equipment: 'Tandem Heavy Lift',
    location: 'Industrial Project Site',
    img: 'equipments/eq-tandem-lift.jpg',
    size: 'lg',
    description:
      'Coordinated tandem lifting operation for the safe installation of a heavy process vessel.',
  },
  {
    scope: 'Yard Standby',
    equipment: 'Link-Belt RTC-8060 · 60T',
    location: 'Equipment Yard',
    img: 'equipments/eq-rtc8060-01.jpg',
    size: 'sm',
    description:
      'Link-Belt RTC-8060 rough terrain crane positioned on standby for lifting operations.',
  },
  {
    scope: 'Yard Operations',
    equipment: 'Locatelli Crane · 35T',
    location: 'Equipment Yard',
    img: 'equipments/eq-locatelli-35t.jpg',
    size: 'sm',
    description:
      'Locatelli truck-mounted crane supporting routine material handling and yard operations.',
  },
  {
    scope: 'Boom Extended Operations',
    equipment: 'Rough Terrain Crane',
    location: 'Project Site',
    img: 'equipments/eq-linkbelt-red-01.jpg',
    size: 'sm',
    description: 'Boom fully extended during heavy lifting preparation on site.',
  },
  {
    scope: 'Lift Preparation',
    equipment: 'Rough Terrain Crane',
    location: 'Project Site',
    img: 'equipments/eq-linkbelt-red-02.jpg',
    size: 'sm',
    description: 'Crane setup with outriggers deployed to ensure stability before lifting.',
  },
  {
    scope: 'Multi-Rig Yard Operations',
    equipment: 'RT175 · 17.5T',
    location: 'Equipment Yard',
    img: 'equipments/eq-rt175-01.jpg',
    size: 'md',
    description: 'RT175 rough terrain crane positioned within the heavy equipment fleet yard.',
  },
  {
    scope: 'Tank Fabrication Support',
    equipment: 'RT175 · 17.5T',
    location: 'Fabrication Yard',
    img: 'equipments/eq-rt175-tank-bicycle.jpg',
    size: 'md',
    description: 'Crane support for fabrication and assembly of industrial storage tanks.',
  },
  {
    scope: 'Storage Tank Turnaround',
    equipment: 'RT175 · 17.5T',
    location: 'Tank Farm',
    img: 'equipments/eq-rt175-tank52.jpg',
    size: 'sm',
    description: 'Lifting support during storage tank inspection and maintenance activities.',
  },
  {
    scope: 'Fleet Line-Up',
    equipment: 'RT175 · 17.5T',
    location: 'Equipment Yard',
    img: 'equipments/eq-rt175-yard.jpg',
    size: 'sm',
    description: 'Fleet readiness inspection showcasing RT175 crane alongside other equipment.',
  },
  {
    scope: 'Stack & Silo Installation',
    equipment: 'Plant Lift',
    location: 'Industrial Plant',
    img: 'equipments/eq-plant-lift-chimney.jpg',
    size: 'sm',
    description:
      'Heavy lifting support for stack and silo installation within an industrial facility.',
  },
  {
    scope: 'Indoor Pipe Handling',
    equipment: 'Rigging & Lifting',
    location: 'Warehouse Facility',
    img: 'equipments/eq-warehouse-pipe-lift.jpg',
    size: 'md',
    description:
      'Precision lifting and positioning of industrial piping within a warehouse environment.',
  },
  {
    scope: 'Dual-Crane Spreader Bar Lift',
    equipment: 'Tandem Lift Rig',
    location: 'Project Site',
    img: 'equipments/eq-aframe-spreader.jpg',
    size: 'md',
    description:
      'Specialized tandem lifting using a spreader bar for oversized equipment handling.',
  },
  {
    scope: 'Rig Floor Crane Operations',
    equipment: 'Drilling Support',
    location: 'Oil & Gas Facility',
    img: 'equipments/eq-drilling-rig.jpg',
    size: 'lg',
    description: 'Crane support for drilling rig operations and heavy equipment mobilisation.',
  },
  {
    scope: 'Transformer Transport',
    equipment: 'Multi-Axle Lowbed Trailer',
    location: 'Transportation Corridor',
    img: 'equipments/eq-transformer-transport.jpg',
    size: 'sm',
    description:
      'Safe transportation of a power transformer using specialized abnormal-load trailers.',
  },
  {
    scope: 'Process Vessel Transport',
    equipment: 'Multi-Axle Lowbed Trailer',
    location: 'Industrial Logistics Route',
    img: 'equipments/eq-tank-transport.jpg',
    size: 'lg',
    description: 'Transportation of a large process vessel using heavy-duty lowbed trailers.',
  },
];

export const equipmentsList: { no: string; name: string; capacity: string }[] = [
  { no: '01', name: 'Link-Belt RTC-80100 Rough Terrain Crane', capacity: '100T' },
  { no: '02', name: 'Link-Belt RTC-8060 Rough Terrain Crane', capacity: '60T' },
  { no: '03', name: 'American Crane', capacity: '50T' },
  { no: '04', name: 'Locatelli Griffon Truck-Mounted Crane', capacity: '35T' },
  { no: '05', name: 'RT175 Rough Terrain Crane', capacity: '17.5T' },
  { no: '06', name: 'Tandem Crane & Spreader-Bar Rig', capacity: 'Dual-Lift' },
  { no: '07', name: 'Multi-Axle Lowbed Trailers', capacity: 'Abnormal Load' },
  { no: '08', name: 'Tugboats & Barges', capacity: 'Various' },
  { no: '09', name: 'Forklifts & Excavators', capacity: 'Fleet' },
  { no: '10', name: 'Piling Equipment', capacity: 'Rig' },
];
