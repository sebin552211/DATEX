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
      imgSrc: '',
      numberText: '150',
      cardText: 'Active Projects',
      checkboxes: Array(7).fill(false)
    },
    {
      imgSrc: '',
      numberText: '100',
      cardText: 'Active FP Projects',
      checkboxes: Array(7).fill(false)
    },
    {
      imgSrc: '',
      numberText: '50',
      cardText: 'Active T&M Projects',
      checkboxes: Array(7).fill(false)
    }
  ];
}
