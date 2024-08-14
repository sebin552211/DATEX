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
      numberText: '150',
      cardText: 'Active Projects',
      checkboxes: Array(7).fill(false)
    },
    {
      numberText: '100',
      cardText: 'Active FP Projects',
      checkboxes: Array(7).fill(false)
    },
    {
      numberText: '50',
      cardText: 'Active T&M Projects',
      checkboxes: Array(7).fill(false)
    }
  ];
}