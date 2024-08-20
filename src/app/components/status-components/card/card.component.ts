import { NgForOf, NgIf } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [NgForOf, NgIf],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent {
  cards = [
    {
      numberText: '150',
      cardText: 'VOC Eligible Projects',
      checkboxes: Array(7).fill(false)
    },
    {
      numberText: '100',
      cardText: 'VOC Initiated',
      checkboxes: Array(7).fill(false)
    },
    {
      numberText: '50',
      cardText: 'VOC Received',
      checkboxes: Array(7).fill(false)
    }
  ];
}
