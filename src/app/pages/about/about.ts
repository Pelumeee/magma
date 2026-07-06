import { Component } from '@angular/core';

interface TimelineItem {
  year: string;
  title: string;
  description: string;
}

interface SectorItem {
  num: string;
  tag: string;
  title: string;
  description: string;
}

@Component({
  selector: 'app-about',
  imports: [],
  templateUrl: './about.html',
  styleUrl: './about.css',
})
export class About {
  timeline: TimelineItem[] = [
    {
      year: '2016',
      title: 'Founded in Port Harcourt',
      description:
        'Magma is established as an indigenous heavy-lift and logistics firm, headquartered in the Trans Amadi industrial layout, Rivers State.',
    },
    {
      year: '2018',
      title: 'Marine spread online',
      description:
        'Tugboats, barges and landing craft join the fleet, extending operations across coastal and inland waterways with 24/7 support.',
    },
    {
      year: '2020',
      title: '100T lift capacity',
      description:
        'The Link-Belt RTC-80100 rough-terrain crane brings 100-tonne lift capability to industrial, oil & gas and construction sites.',
    },
    {
      year: '2022',
      title: 'EPC & engineering',
      description:
        'Service lines expand into FEED, mechanical, electrical, instrumentation and full EPC delivery for industrial assets.',
    },
    {
      year: 'Today',
      title: 'On the critical path',
      description:
        'Trusted on refinery rehabilitation, plant maintenance, drilling support and naval logistics across the country.',
    },
  ];
  sectors: SectorItem[] = [
    {
      num: '01',
      tag: '// Primary sector',
      title: 'Oil & Gas',
      description:
        'Refinery rehabilitation, drilling support and offshore logistics across the Niger Delta.',
    },
    {
      num: '02',
      tag: '// Primary sector',
      title: 'Construction',
      description:
        'Structural heavy lifts, site mobilisation and civil engineering support nationwide.',
    },
    {
      num: '03',
      tag: '// Sector',
      title: 'Power',
      description:
        'Plant erection, turbine installation and heavy-equipment positioning for energy assets.',
    },
    {
      num: '04',
      tag: '// Sector',
      title: 'Marine',
      description:
        "Vessel maintenance, tug-and-barge spreads and defence logistics along Nigeria's coastline.",
    },
  ];
}
