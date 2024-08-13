import { NgForOf, NgIf } from '@angular/common'
import { Component } from '@angular/core';

NgIf
@Component({
  selector: 'app-dashboardcard',
  standalone: true,
  imports: [NgForOf, NgIf],
  templateUrl: './Dashboardcard.component.html',
  styleUrl: './Dashboardcard.component.css'
})
export class DashboardcardComponent {
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