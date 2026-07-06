import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-gallery',
  imports: [RouterLink],
  templateUrl: './gallery.html',
  styleUrl: './gallery.css',
})
export class Gallery {
  gallery = [
    {
      scope: 'Tank Farm Maintenance Support',
      equipment: '30T 4x4 RT Crane',
      location: 'Port Harcourt Refinery',
      img: 'assets/images/gallery/chevron-gorgon-lng-project.jpg',
    },
    {
      scope: 'Drilling Rig Setup',
      equipment: '110T Motor Crane',
      location: 'Fiable Global Service, Egbema, Bayelsa',
      img: 'assets/images/gallery/chevron-gorgon-lng-project.jpg',
    },
    {
      scope: 'Manufacturing Plant Support ',
      equipment: '110T Motor Crane',
      location: 'Inner Galaxy Steel Company Ltd. ASA, Abia',
      img: 'assets/images/gallery/chevron-gorgon-lng-project.jpg',
    },
    {
      scope: 'Rig Operation Support Operations Support',
      equipment: '50T (Hilong 27 rig) & 75T Renaissance T209 Rig) 4x4 RT Cranes',
      location: 'Bayelsa',
      img: 'assets/images/gallery/chevron-gorgon-lng-project.jpg',
    },
    {
      scope: 'Tower Crane Setup',
      equipment: ' 110T Motor Crane',
      location: "100,000-capacity Winner's Chapel auditorium  construction site, Lagos",
      img: 'assets/images/gallery/chevron-gorgon-lng-project.jpg',
    },
  ];
}
