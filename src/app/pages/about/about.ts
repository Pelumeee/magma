import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { RevealDirective } from '../../core/directive/reveal-directive';

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
  imports: [RouterLink, RevealDirective],
  templateUrl: './about.html',
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
      title: 'Energy & Power',
      description:
        'Technical support for power and energy projects, including plant erection, turbine installation, and heavy equipment positioning.',
    },
    {
      num: '04',
      tag: '// Sector',
      title: 'Marine',
      description:
        "Vessel maintenance, tug-and-barge spreads and defence logistics along Nigeria's coastline.",
    },
    {
      num: '05',
      tag: '// Sector',
      title: 'Petrochemical',
      description:
        'Safe, efficient support for plant construction, shutdowns, maintenance operations and equipment installation.',
    },
    {
      num: '06',
      tag: '// Sector',
      title: 'Manufacturing',
      description:
        'Reliable lifting, transport and project support for factory installation, plant expansion, maintenance and machinery relocation.',
    },
    {
      num: '07',
      tag: '// Sector',
      title: 'Aviation',
      description:
        'Specialised lifting, transport and operational support for airport, airside and aviation infrastructure projects.',
    },
    {
      num: '08',
      tag: '// Sector',
      title: 'Infrastructure',
      description:
        'Execution support for bridges, roads, utilities, ports, and other large-scale infrastructure developments.',
    },
  ];
}
