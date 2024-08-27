import { Component, EventEmitter, NgModule, OnInit, Output } from '@angular/core';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from '../navbar/navbar.component';
import { HttpClient } from '@angular/common/http';
import { ChartOptions,  ChartDataset  } from 'chart.js';
import { ChartModule } from 'primeng/chart';
import { BaseChartDirective } from 'ng2-charts';

interface Filters {
  status: { [key: string]: boolean };
  contractType: { [key: string]: boolean };
  dusAndDuHeads: { [key: string]: boolean };
  regions: { [key: string]: boolean };
  date: { [key: string]: boolean };
  startDate: { [key: string]: boolean };
  endDate: { [key: string]: boolean };
  numberOfResources: { [key: string]: boolean };
  projectType: { [key: string]: boolean };
  domain: { [key: string]: boolean };
  projectManager: { [key: string]: boolean };
  technology: { [key: string]: boolean };
  SQA: { [key: string]: boolean };
  databaseUsed: { [key: string]: boolean };
  cloudUsed: { [key: string]: boolean };
  feedbackStatus: { [key: string]: boolean };
  customerName: { [key: string]: boolean };
  technologies: { [key: string]: boolean };
}

@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [NgClass, NgFor, NgIf, FormsModule, NavbarComponent, ChartModule, BaseChartDirective],
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
  
})

export class FilterComponent implements OnInit {
  
   filters: any = {
     status: {},
     contractType: {},
     dusAndDuHeads: {},
     regions: {},
     date:{},
     startDate: {},
     endDate: {},
     numberOfResources:{},
     projectType:{},
     domain:{},
     projectManager:{},
     technology:{},
     SQA:{},
     databaseUsed:{},
     cloudUsed:{},
     feedbackStatus:{},
     customerName:{},
     technologies:{}
   };
  
//   @Output() filterChanged = new EventEmitter<any>();
     constructor(private http: HttpClient) { }

    isDivVisible: boolean = false;
       filteredGraphData: any[] = [];
       projects: any[] = [];
       dusAndDuHeads: string[] = [];
       projectManager: string[] = [];
       date: Date[] = [];
       contractType: string[] = [];
       numberOfResources: string [] = [];
       customerName: string [] = [];
       regions: string [] = [];
       technologies: string [] = [];
       status: string [] = [];
       startDate: Date[]=[];
       endDate: Date[]=[];
       projectStatusOptions: string[] = [];
       contractTypeOptions: string[] = [];
       duAndDuHeadOptions: string [] = [];
       regionOptions: string [] = [];
       resourceOptions: string [] = [];
       dateOptions:string [] = [];
       projectManagerOptions: string [] = [];
       projectTypeOptions: string [] = [];
       customerNameOptions: string [] = [];
       technologyOptions: string [] = [];
       SQAOptions: string [] = [];
       databaseUsedOptions: string [] = [];
       cloudUsedOptions: string [] = [];
       StatusOptions: string [] = [];
  
       showProjectCodes = false;
       showProjectNames = false;  
       showStatus = false;
       showContractType = false;
       showDuAndDuHead = false;
       showRegions = false;
       showProjectManager = false;
       showDate = false;
       // showEndDate = false;
       showCustomerName = false;
       showNumberOfResources = false;
       showDomain = false;
       showTechnology = false;
       showSQA= false;
       showDatabaseUsed = false;
       showCloudUsed = false;
       showFeedbackStatus = false;

       ongoingProjectsCount: number = 0;

       ngOnInit(): void {
       this.fetchProjects();
     }
     fetchProjects(): void {
      this.http.get<any>('https://localhost:7259/api/Filter/options').subscribe(response => {
        console.log(response); // Log the response to inspect its structure
  
        // Map the response data to the component's properties
        this.status = response.projectStatusOptions || [];
        this.contractType = response.projectContractTypeOptions || [];
        this.dusAndDuHeads = response.duAndDuHeadOptions || [];
        this.regions = response.regionOptions || [];
        this.resourceOptions = response.resourceOptions || [];
        this.technologies = response.technologyOptions || [];
      });
    }
 
   
     initializeFilters() {
       this.projectStatusOptions.forEach(option => {
         this.filters.status[option] = false;
       });
       this.contractTypeOptions.forEach(option => {
         this.filters.contractType[option] = false;
       });
       this.duAndDuHeadOptions.forEach(option => {
         this.filters.dusAndDuHeads[option] = false;
       });
       this.regionOptions.forEach(option => {
         this.filters.regions[option] = false;
       }); 
       this.resourceOptions.forEach(option => {
         this.filters.numberOfResources[option] = false;
       });   
       this.projectManagerOptions.forEach(option => {
         this.filters.projectManager[option] = false;
       }); 
       this.dateOptions.forEach(option => {
         this.filters.date[option] = false;
       });   
       this.customerNameOptions.forEach(option => {
         this.filters.customerName[option] = false;
       }); 
       this.technologyOptions.forEach(option => {
         this.filters.technologies[option] = false;
       }); 
     }
  
     toggleDropdown(section: string) {
       if (section === 'dusAndDuHeads') {
         this.showDuAndDuHead = !this.showDuAndDuHead;
       } else if (section === 'projectManager') {
         this.showProjectManager = !this.showProjectManager;
       } else if (section === 'date') {
         this.showDate = !this.showDate;
      } else if (section === 'contractType') {
      this.showContractType = !this.showContractType;
    } else if (section === 'numberOfResources') {
      this.showNumberOfResources = !this.showNumberOfResources;
    } else if (section === 'customerName') {
      this.showCustomerName = !this.showCustomerName;
    } else if (section === 'regions') {
      this.showRegions = !this.showRegions;
    } else if (section === 'technologies') {
      this.showTechnology = !this.showTechnology;
    } else if (section === 'status') {
      this.showStatus = !this.showStatus;
    }
  }   
  
     resetFilters() {
       this.dusAndDuHeads.forEach(duandduhead => {
         this.filters.dusAndDuHeads[duandduhead] = false;
       });
       this.projectManager.forEach(manager => {
         this.filters.projectManager[manager] = false;
       });
       this.numberOfResources.forEach(key=> {
         this.filters.numberOfResources[key] = false;
       });      
       this.regions.forEach(key=> {
         this.filters.regions[key] = false;
       }); 
       this.technologies.forEach(key=> {
         this.filters.technologies[key] = false;
       });
       this.status.forEach(key=> {
       this.filters.status[key] = false;
     });

       Object.keys(this.filters.SQA).forEach(key => {
          this.filters.SQA[key] = false;
        });
        Object.keys(this.filters.databaseUsed).forEach(key => {
          this.filters.databaseUsed[key] = false;
        });
        Object.keys(this.filters.cloudUsed).forEach(key => {
          this.filters.cloudUsed[key] = false;
      });
        Object.keys(this.filters.feedbackStatus).forEach(key => {
          this.filters.feedbackStatus[key] = false;
        });
 }

 
   ApplyFilters(){
       return this.isDivVisible=false;
     }
   }
   

  