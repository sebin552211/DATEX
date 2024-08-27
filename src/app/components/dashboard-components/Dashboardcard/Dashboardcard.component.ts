import { NgForOf, NgIf } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboardcard',
  standalone: true,
  imports: [NgForOf, NgIf],
  templateUrl: './Dashboardcard.component.html',
  styleUrls: ['./Dashboardcard.component.css'] // changed from 'styleUrl' to 'styleUrls'
})
export class DashboardcardComponent implements OnInit {
  constructor(private http: HttpClient) { }

  projects: any[] = [];
  projectStatusOptions: string[] = [];
  projectContractTypeOptions: string[] = [];
  dusAndDuHeads: string[] = [];
  regions: string[] = [];
  resourceOptions: string[] = [];
  technologyOptions: string[] = [];
  
  ongoingProjectsCount: number = 0;
  fixedPriceCount: number = 0;
  timeAndMoneyCount: number = 0;
  isDivVisible: boolean = false;
  cards: any[] = [];

  ngOnInit(): void {
    this.fetchProjects();
  }

  fetchProjects(): void {
    this.http.get<any>('https://localhost:7259/api/Filter/options').subscribe(response => {
      console.log(response); // Log the response to inspect its structure

      // Map the response data to the component's properties
      this.projectStatusOptions = response.projectStatusOptions || [];
      this.projectContractTypeOptions = response.projectContractTypeOptions || [];
      this.dusAndDuHeads = response.duAndDuHeadOptions || [];
      this.regions = response.regionOptions || [];
      this.resourceOptions = response.resourceOptions || [];
      this.technologyOptions = response.technologyOptions || [];

      // Calculate the number of ongoing projects (just a demonstration since actual project data isn't in the response)
      this.ongoingProjectsCount = this.projectStatusOptions.filter(status => status === 'Ongoing').length;
      this.fixedPriceCount = this.projectContractTypeOptions.filter(type => type === 'Fixed Price').length;
      this.timeAndMoneyCount = this.projectContractTypeOptions.filter(type => type === 'Time & Material').length;

      // Initialize the cards array
      this.cards = [
        {
          numberText: this.ongoingProjectsCount, 
          cardText: this.projectStatusOptions.find(status => status === 'Ongoing') || 'Ongoing', 
        },
        {
          numberText: this.fixedPriceCount, 
          cardText: this.projectContractTypeOptions.find(type => type === 'Fixed Price') || 'Fixed Price', 
        },
        {
          numberText: this.timeAndMoneyCount,
          cardText: this.projectContractTypeOptions.find(type => type === 'Time & Material') || 'Time & Material',
        },
      ];
    });
  }

  onClick(i: any): void {
    this.isDivVisible = !this.isDivVisible;
  }
}
