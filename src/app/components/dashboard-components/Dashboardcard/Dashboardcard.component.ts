import { CommonModule} from '@angular/common';
import { DashboardTableService } from '../../../service/dashboard-table.service';
import { DashboardTable } from '../../../interface/dashboard-table';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { SharedDataService } from '../../../service/shared-data.service';
import { Subscription } from 'rxjs';
import { DashboardFilterService } from '../../../service/dashboard-filter-service.service';

@Component({
  selector: 'app-dashboardcard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './Dashboardcard.component.html',
  styleUrls: ['./Dashboardcard.component.css'] // Corrected `styleUrl` to `styleUrls`
})
export class DashboardcardComponent implements OnInit, OnDestroy {
  private projectsSubscription: Subscription | undefined;

  cards: { numberText: string; cardText: string; checkboxes: boolean[];filterKey: string; filterValue: string  }[] = [];

  constructor(
    private dashboardTableService: DashboardTableService,
    private sharedDataService: SharedDataService,
    private dashboardFilterService: DashboardFilterService
  ) {}

  ngOnInit(): void {
    this.getCardData();
  }

  ngOnDestroy(): void {
    if (this.projectsSubscription) {
      this.projectsSubscription.unsubscribe();
    }
  }

  // Method to fetch and populate card data
  getCardData() {
    this.projectsSubscription = this.sharedDataService.projects$.subscribe(
      projects => {
        const activeProjects = projects.filter(
          project => project.status === 'Ongoing'
        ).length;

        const activeFPProjects = projects.filter(
          project =>
            project.status === 'Ongoing' && project.contractType === 'Fixed Price'
        ).length;

        const activeTMProjects = projects.filter(
          project =>
            project.status === 'Ongoing' && project.contractType === 'Time & Material'
        ).length;

        this.cards = [
          {
            numberText: activeProjects.toString(),
            cardText: 'Active Projects',
            checkboxes: Array(7).fill(false),
            filterKey: 'status',
            filterValue: 'Ongoing'
           
          },
          {
            numberText: activeFPProjects.toString(),
            cardText: 'Fixed Price Projects',
            checkboxes: Array(7).fill(false),
            filterKey: 'contractType',
            filterValue: 'Fixed Price'
          },
          {
            numberText: activeTMProjects.toString(),
            cardText: 'Time & Material Projects',
            checkboxes: Array(7).fill(false),
             filterKey: 'contractType',
            filterValue: 'Time & Material'
          }
        ];
      },
      error => {
        console.error('Error fetching projects:', error);
      }
    );
  }
  onCardClick(card: { filterKey: string; filterValue: string }) {
    this.dashboardFilterService.selectFilter(card.filterKey, card.filterValue);
  }
}
