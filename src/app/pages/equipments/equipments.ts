import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgClass } from '@angular/common';
import { EQUIPMENTS, GalleryItem, equipmentsList } from '../../shared/data/equipment-data';

@Component({
  selector: 'app-equipments',
  imports: [NgClass, RouterLink],
  templateUrl: './equipments.html',
  styleUrl: './equipments.css',
})
export class Equipments {
  equipments: GalleryItem[] = EQUIPMENTS;
  equipmentList = equipmentsList;
  readonly sizeStyles: Record<GalleryItem['size'], { span: string; aspect: string }> = {
    lg: { span: 'col-span-2 md:col-span-8', aspect: 'aspect-[16/9]' },
    md: { span: 'col-span-2 md:col-span-6', aspect: 'aspect-[4/3]' },
    sm: { span: 'col-span-2 md:col-span-4', aspect: 'aspect-[4/3]' },
  };
  stats = [
    {
      value: '100T',
      count: 100,
      suffix: 'T',
      label: 'Max lift capacity on deck',
      highlight: false,
      animationClass: '',
    },
    {
      value: '10+',
      count: 10,
      suffix: '+',
      label: 'Rigs in the active fleet',
      highlight: false,
      animationClass: 'd1',
    },
    {
      value: '24/7',
      count: null,
      suffix: '',
      label: 'Yard, marine & site support',
      highlight: false,
      animationClass: 'd2',
    },
    {
      value: 'Nationwide',
      count: null,
      suffix: '',
      label: 'Mobilisation reach',
      highlight: false,
      animationClass: 'd3',
    },
  ];
}
