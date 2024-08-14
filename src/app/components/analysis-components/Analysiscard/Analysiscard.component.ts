import { NgForOf, NgIf } from '@angular/common'
import { Component } from '@angular/core';

NgIf
@Component({
  selector: 'app-analysiscards',
  standalone: true,
  imports: [NgForOf, NgIf],
  templateUrl: './Analysiscard.component.html',
  styleUrl: './Analysiscard.component.css'
})
export class AnalysisCardComponent {
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