import { Component, NgModule, OnInit } from '@angular/core';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from '../navbar/navbar.component';
import { HttpClient } from '@angular/common/http';

interface Filters {
  status: { [key: string]: boolean };
  contractType: { [key: string]: boolean };
  dusAndDuHeads: { [key: string]: boolean };
  regions: { [key: string]: boolean };
  date: { [key: string]: boolean };
  numberOfResources: { [key: string]: boolean };
  projectType: { [key: string]: boolean };
  domain: { [key: string]: boolean };
  projectManager: { [key: string]: boolean };
  technology: { [key: string]: boolean };
  SQA: { [key: string]: boolean };
  projectCodes: { [key: string]: boolean };
  databaseUsed: { [key: string]: boolean };
  cloudUsed: { [key: string]: boolean };
  feedbackStatus: { [key: string]: boolean };
  customerName: { [key: string]: boolean };
  technologies: { [key: string]: boolean };
  projectNames: { [key: string]: boolean };
}

@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [NgClass, NgFor, NgIf, FormsModule, NavbarComponent],
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
  
})

export class FilterComponent implements OnInit {
  
  
  filters: Filters = {
    status: {},
    contractType: {},
    dusAndDuHeads: {},
    regions: {},
    date: {},
    numberOfResources:{},
    projectType:{},
    domain:{},
    projectNames:{},
    projectManager:{},
    technology:{},
    SQA:{},
    projectCodes:{},
    databaseUsed:{},
    cloudUsed:{},
    feedbackStatus:{},
    customerName:{},
    technologies:{}
  };

    constructor(private http: HttpClient) { }
  
      isDivVisible: boolean = true;
      
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
  
      projectCodesOptions: string[] = [];
      projectStatusOptions: string[] = [];
      contractTypeOptions: string[] = [];
      duAndDuHeadOptions: string [] = [];
      regionOptions: string [] = [];
      resourceOptions: string [] = [];
      projectNamesOptions: string [] = [];
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
      showCustomerName = false;
      showNumberOfResources = false;
      showDomain = false;
      showTechnology = false;
      showSQA= false;
      showDatabaseUsed = false;
      showCloudUsed = false;
      showFeedbackStatus = false;
  
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
      this.customerNameOptions.forEach(option => {
        this.filters.customerName[option] = false;
      }); 
      this.projectNamesOptions.forEach(option => {
        this.filters.projectNames[option] = false;
      }); 
      this.technologyOptions.forEach(option => {
        this.filters.technologies[option] = false;
      }); 
    }
    
    toggleDropdown(section: string) {
      if (section === 'projectCodes') {
        this.showProjectCodes = !this.showProjectCodes;
      } else if (section === 'projectNames') {
        this.showProjectNames = !this.showProjectNames;
      } else if (section === 'dusAndDuHeads') {
        this.showDuAndDuHead = !this.showDuAndDuHead;
      } else if (section === 'projectManager') {
        this.showProjectManager = !this.showProjectManager;
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
      this.projectCodes.forEach(code => {
        this.filters.projectCodes[code] = false;
      });
      this.projectNames.forEach(name => {
        this.filters.projectNames[name] = false;
      });
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
  
  //     Object.keys(this.filters.SQA).forEach(key => {
  //       this.filters.SQA[key] = false;
  //     });
  //     Object.keys(this.filters.databaseUsed).forEach(key => {
  //       this.filters.databaseUsed[key] = false;
  //     });
  //     Object.keys(this.filters.cloudUsed).forEach(key => {
  //       this.filters.cloudUsed[key] = false;
  //     });
  //     Object.keys(this.filters.feedbackStatus).forEach(key => {
  //       this.filters.feedbackStatus[key] = false;
  //     });
    }
  
    ApplyFilters(){
      return this.isDivVisible=false;
    }
  }
