import { NgForOf, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { DashboardTableService } from '../../../service/dashboard-table.service';
import { DashboardTable } from '../../../interface/dashboard-table';
import { startOfMonth, endOfMonth } from 'date-fns';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [NgForOf, NgIf],
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {
  cards: { numberText: string; cardText: string; checkboxes: boolean[] }[] = [];

  constructor(private dashboardTableService: DashboardTableService) {}

  ngOnInit() {
    this.getCardData();
  }

  // Method to fetch and populate card data
  getCardData() {
    const startOfMonthDate = startOfMonth(new Date());
    const endOfMonthDate = endOfMonth(new Date());

    this.dashboardTableService.getProjects().subscribe((projects: DashboardTable[]) => {
      const vocEligibleCount = projects.filter(project =>
        project.vocEligibilityDate &&
        new Date(project.vocEligibilityDate) >= startOfMonthDate &&
        new Date(project.vocEligibilityDate) <= endOfMonthDate
      ).length;

      const  vocReceivedCount = projects.filter(project => project.feedbackStatus === 'Received').length;
      const vocInitiatedCount= projects.filter(project => project.mailStatus === 'Sent').length;

      this.cards = [
        {
          numberText: vocEligibleCount.toString(),
          cardText: 'VOC Eligible Projects',
          checkboxes: Array(7).fill(false)
        },
        {
          numberText: vocInitiatedCount.toString(),
          cardText: 'VOC Initiated',
          checkboxes: Array(7).fill(false)
        },
        {
          numberText: vocReceivedCount.toString(),
          cardText: 'VOC Received',
          checkboxes: Array(7).fill(false)
        }
      ];
    }, error => {
      console.error('Error fetching projects:', error);
    });
  }
}
