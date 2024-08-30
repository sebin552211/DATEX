import { NgForOf, NgIf } from '@angular/common';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { DashboardTableService } from '../../../service/dashboard-table.service';
import { DashboardTable } from '../../../interface/dashboard-table';
import { SharedDataService } from '../../../service/shared-data.service';
import { startOfMonth, endOfMonth } from 'date-fns';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [NgForOf, NgIf],
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit, OnDestroy {
  cards: { numberText: string; cardText: string; checkboxes: boolean[] }[] = [];
  private projectsSubscription: Subscription | undefined;

  constructor(
    private dashboardTableService: DashboardTableService,
    private sharedDataService: SharedDataService
  ) {}

  ngOnInit() {
    this.getCardData();
  }

  ngOnDestroy() {
    if (this.projectsSubscription) {
      this.projectsSubscription.unsubscribe();
    }
  }

  // Method to fetch and populate card data
  getCardData(): void {
    const startOfMonthDate = startOfMonth(new Date());
    const endOfMonthDate = endOfMonth(new Date());

    this.projectsSubscription = this.sharedDataService.projects$.subscribe({
      next: (projects: DashboardTable[]) => {
        if (!Array.isArray(projects)) {
          console.error('Expected an array of projects');
          return;
        }

        const vocEligibleCount = projects.filter(project =>
          project.vocEligibilityDate &&
          new Date(project.vocEligibilityDate) >= startOfMonthDate &&
          new Date(project.vocEligibilityDate) <= endOfMonthDate
        ).length;

        const vocReceivedCount = projects.filter(
          project => project.feedbackStatus === 'Received'
        ).length;

        const vocInitiatedCount = projects.filter(
          project => project.mailStatus === 'Sent'
        ).length;

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
      },
      error: (error) => {
        console.error('Error fetching projects:', error);
      }
    });
  }
}
