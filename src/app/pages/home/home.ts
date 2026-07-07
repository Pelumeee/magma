import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { GALLERY, GalleryItem } from '../../shared/data/gallery-data';

@Component({
  selector: 'app-home',
  imports: [RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  plates: GalleryItem[] = GALLERY.slice(0, 4);

  descriptionFor(item: GalleryItem): string {
    return item.description ?? `${item.equipment} deployed at ${item.location}.`;
  }
}
