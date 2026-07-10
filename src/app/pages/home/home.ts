import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { GALLERY, GalleryItem } from '../../shared/data/gallery-data';
import { Marquee } from './components/marquee/marquee';
import { Hero } from './components/hero/hero';
import { RevealDirective } from '../../core/directive/reveal-directive';

@Component({
  selector: 'app-home',
  imports: [RouterLink, Marquee, Hero, RevealDirective],
  templateUrl: './home.html',
})
export class Home {
  plates: GalleryItem[] = GALLERY.slice(0, 4);

  stats = [
    {
      value: '1000T',
      count: 300,
      suffix: 'T',
      label: 'Combined Lifting Capacity',
      highlight: false,
      animationClass: '',
    },
    {
      value: '9+',
      count: 9,
      suffix: '+',
      label: 'Years in Business',
      highlight: true,
      animationClass: 'd1',
    },
    {
      value: '36',
      count: 100,
      suffix: '+',
      label: 'States Served',
      highlight: false,
      animationClass: 'd2',
    },
    {
      value: '0',
      count: 0,
      suffix: '',
      label: 'COMPROMISE ON SAFETY',
      highlight: true,
      animationClass: 'd3',
    },
  ];

  services = [
    {
      id: '01',
      title: 'ENGINEERED HEAVY LIFT',
      icon: 'ti ti-weight',
      description:
        "We plan and execute complex lifting operations using modern equipment and customised methods tailored to our client's project requirements.",
      animation: '',
    },
    {
      id: '02',
      title: 'CRANE HIRE',
      icon: 'ti ti-crane',
      description:
        'We provide modern cranes with certified operators, rigging personnel, lift supervision, and complete project management for safe and seamless execution.',
      animation: 'd1',
    },
    {
      id: '03',
      title: 'HEAVY TRANSPORT',
      icon: 'ti ti-truck',
      description:
        'We transport oversized and overweight loads, handling the entire process from routing planning to load-out/load-in operations.',
      animation: 'd2',
    },
    {
      id: '04',
      title: 'PLANT SUPPORT',
      icon: 'ti ti-building-factory-2',
      description:
        'We provide crane and lifting solutions for refinery turnarounds, petrochemical facilities, power plants, drilling operations, equipment replacement, and planned maintenance activities.',
      animation: '',
    },
    {
      id: '05',
      title: 'RIGGING & INSTALLATION',
      icon: 'ti ti-tools',
      description:
        'We provide precision lifting, machinery relocation, structural steel erection, modular assembly, equipment installation, skidding, jacking, and positioning of heavy industrial assets.',
      animation: 'd1',
    },
    {
      id: '06',
      title: 'PROJECT ENGINEERING & LIFT PLANNING',
      icon: 'ti ti-clipboard-list',
      description:
        'We perform engineering studies, lift plans, risk assessments, 3D lift simulations, site inspections, and constructability reviews to ensure safe and efficient project delivery.',
      animation: 'd2',
    },
  ];

  equipment = [
    { no: '01', name: 'Rough Terrain Cranes (4x4)', capacity: '30-130T' },
    { no: '02', name: 'Truck and All Terrain Cranes (motor)', capacity: '30-300T' },
    { no: '03', name: 'Crawler Cranes', capacity: '50-300T' },
    { no: '04', name: 'Lowboy Trailers', capacity: '50-150T' },
    { no: '05', name: 'SPMT Trailers', capacity: '' },
  ];

  clients = [
    {
      url: 'clients/coca-cola.png',
      alt: 'Coca-Cola',
      animationClass: '',
    },
    {
      url: 'clients/olam.png',
      alt: 'Olam',
      animationClass: 'd1',
    },
    {
      url: 'clients/renaissance.png',
      alt: 'Renaissance Africa Energy Company',
      animationClass: 'd2',
    },
    {
      url: 'clients/seepco.jpg',
      alt: 'SEEPCO',
      animationClass: 'd3',
    },
    // {
    //   url: 'clients/geoplex.png',
    //   alt: 'Geoplex',
    //   animationClass: 'd4',
    // },
    {
      url: 'clients/total.png',
      alt: 'TotalEnergies',
      animationClass: '',
    },
    {
      url: 'clients/seflam.jpg',
      alt: 'Seflam SGL',
      animationClass: 'd1',
    },
    {
      url: 'clients/bua.png',
      alt: 'BUA Cement',
      animationClass: 'd2',
    },
    {
      url: 'clients/chesroo.png',
      alt: 'Chesroc Nigeria Limited',
      animationClass: 'd3',
    },
    {
      url: 'clients/weatherford.png',
      alt: 'Weatherford',
      animationClass: 'd4',
    },
    // {
    //   url: 'clients/tecon.png',
    //   alt: 'Tecon',
    //   animationClass: '',
    // },
    {
      url: 'clients/sterling.jpg',
      alt: 'Sterling Global Management',
      animationClass: 'd1',
    },
    // {
    //   url: 'clients/amber-resources.png',
    //   alt: 'Amber Resources',
    //   animationClass: 'd2',
    // },
    {
      url: 'clients/bourbon.png',
      alt: 'Bourbon Interoil Nigeria Ltd',
      animationClass: 'd3',
    },
    // {
    //   url: 'clients/dangote.png',
    //   alt: 'Dangote',
    //   animationClass: 'd4',
    // },
  ];

  descriptionFor(item: GalleryItem): string {
    return item.description ?? `${item.equipment} deployed at ${item.location}.`;
  }
}
