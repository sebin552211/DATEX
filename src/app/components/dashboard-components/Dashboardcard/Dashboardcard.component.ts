import { NgForOf, NgIf } from '@angular/common'
import { DashboardTableService } from '../../../service/dashboard-table.service';
import { DashboardTable } from '../../../interface/dashboard-table';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-dashboardcard',
  standalone: true,
  imports: [NgForOf, NgIf],
  templateUrl: './Dashboardcard.component.html',
  styleUrls: ['./Dashboardcard.component.css'] // changed from 'styleUrl' to 'styleUrls'
})
export class DashboardcardComponent implements OnInit {

  cards: { numberText: string; cardText: string; checkboxes: boolean[] }[] = [];

  constructor(private dashboardTableService: DashboardTableService) { }



  ngOnInit(): void {
    this.getCardData();
  }

    // Method to fetch and populate card data
    getCardData() {
      this.dashboardTableService.getProjects().subscribe((projects: DashboardTable[]) => {

        const activeProjects=projects.filter(project=>project.status==='Ongoing').length;

        const activeFPProjects=projects.filter(project=>project.status==='Ongoing'&& project.contractType==='Fixed Price').length;

        const activeTMProjects=projects.filter(project=>project.status==='Ongoing'&& project.contractType==='Time & Material').length;
        this.cards = [
          {
            numberText: activeProjects.toString(),
            cardText: 'Active Projects',
            checkboxes: Array(7).fill(false)
          },
          {
            numberText: activeFPProjects.toString(),
            cardText: 'Fixed Price Projects',
            checkboxes: Array(7).fill(false)
          },
          {
            numberText: activeTMProjects.toString(),
            cardText: 'Time & Material Projects',
            checkboxes: Array(7).fill(false)
          }
        ];
      }, error => {
        console.error('Error fetching projects:', error);
      });
    }
}
