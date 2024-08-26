import { NgForOf, NgIf } from '@angular/common'
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { count } from 'rxjs';

NgIf
@Component({
  selector: 'app-dashboardcard',
  standalone: true,
  imports: [NgForOf, NgIf],
  templateUrl: './Dashboardcard.component.html',
  styleUrl: './Dashboardcard.component.css'
})
export class DashboardcardComponent implements OnInit {
  constructor(private http: HttpClient) { }
 
  
  projects: any[] = [];
  projectCodes: string[] = [];
  projectNames: string[] = [];
  dusAndDuHeads: string[] = [];
  projectManager: string[] = [];
  contractType: string[] = [];
  numberOfResources: string [] = [];
  customerName: string [] = [];
  regions: string [] = [];
  technologies: string [] = [];
  status: string [] = [];

  ongoingProjectsCount: number = 0;
  fixedPriceCount: number = 0;
  timeAndMoneyCount: number = 0;
  isDivVisible: boolean = false;
  cards: any[] = [];

  ngOnInit(): void {
    this.fetchProjects();
  }

  fetchProjects(): void {
    this.http.get<any[]>('http://localhost:3000/projects').subscribe(data => {
      this.projects = data;
      this.projectCodes = [...new Set(data.map(project => project.ProjectCode))];
      this.projectNames = [...new Set(data.map(project => project.ProjectName))];
      this.dusAndDuHeads = [...new Set(data.map(project => project.DU + ' - ' + project.DUHead))];
      this.projectManager = [...new Set(data.map(project => project.ProjectManager))];
      this.contractType = [...new Set(data.map(project => project.ContractType))];
      this.numberOfResources = [...new Set(data.map(project => project.NumberOfResources))];
      this.customerName = [...new Set(data.map(project => project.CustomerName))];
      this.regions = [...new Set(data.map(project => project.Region))];
      this.technologies = [...new Set(data.map(project => project.Technology))];
      this.status = [...new Set(data.map(project => project.Status))];

      // Calculate the number of ongoing projects
      this.ongoingProjectsCount = data.filter(project => project.Status === 'Ongoing').length;
      this.fixedPriceCount = data.filter(project => project.ContractType === 'Fixed Price').length;
      this.timeAndMoneyCount = data.filter(project => project.ContractType === 'Time & Material').length;

      // Initialize the cards array after fetching the data
      this.cards = [
        {
          numberText: this.ongoingProjectsCount, 
          cardText: this.status[0], 
          
        },
        {
          numberText: this.fixedPriceCount, 
          cardText: this.contractType[0], 
        },
        {
          numberText: this.timeAndMoneyCount,
          cardText: this.contractType[1],
        },
      ];
    });
  }
  onClick(i: any){
     return this.isDivVisible=!this.isDivVisible;
  }

}