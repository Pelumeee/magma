import { NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { GALLERY, GalleryItem } from '../../shared/data/gallery-data';

@Component({
  selector: 'app-gallery',
  imports: [RouterLink, NgClass],
  templateUrl: './gallery.html',
  styleUrl: './gallery.css',
})

export class Gallery {
  gallery: GalleryItem[] = GALLERY;

  readonly sizeStyles: Record<GalleryItem['size'], { span: string; aspect: string }> = {
    lg: { span: 'col-span-2 md:col-span-8', aspect: 'aspect-[16/9]' },
    md: { span: 'col-span-2 md:col-span-6', aspect: 'aspect-[4/3]' },
    sm: { span: 'col-span-2 md:col-span-4', aspect: 'aspect-[4/3]' },
  };
}
