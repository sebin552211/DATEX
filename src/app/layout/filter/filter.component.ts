import { Component, OnInit } from '@angular/core';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from '../navbar/navbar.component';
import { HttpClient } from '@angular/common/http';
import { ChartModule } from 'primeng/chart';
import { BaseChartDirective } from 'ng2-charts';
import { Filters } from '../../interface/Filters';
import { flatMap } from 'rxjs';

@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [NgClass, NgFor, NgIf, FormsModule, NavbarComponent, ChartModule, BaseChartDirective],
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
  
})

export class FilterComponent implements OnInit {
  
   filters: Filters = {
     status: {},
     contractType: {},
     dusAndDuHeads: {},
     regions: {},
     customerName:{},
     projectManager:{},
     date:{},
     startDate: {},
     endDate: {},
     numberOfResources:{},
     cloudUsed:{},
     domain:{},
     feedback:{},
     SQA:{},
     projectType:{},
     databaseUsed:{},
     technologies:{}
   };
  
     constructor(private http: HttpClient) { }

    isDivVisible: boolean = false;
       
       projects: any[] = [];
       
       status: string [] = [];
       contractType: string[] = [];
       dusAndDuHeads: string[] = [];
       regions: string [] = [];
       customerName: string [] = [];
       projectManager: string[] = [];
       date: Date[] = [];
       numberOfResources: string [] = [];       
       technologies: string [] = [];
       cloudUsed: string[] = [];
       feedback: string[] = [];
       SQA: string[] = [];
       projectType: string[] = [];
       domain: string[] = [];
       databaseUsed: string[] = [];
       startDate: Date[]=[];
       endDate: Date[]=[];

       StatusOptions: string [] = [];
       projectStatusOptions: string[] = [];
       
       contractTypeOptions: string[] = [];
       duAndDuHeadOptions: string [] = [];
       regionOptions: string [] = [];
       customerNameOptions: string [] = [];
       projectManagerOptions: string [] = [];
       
       dateOptions:string [] = [];
       resourceOptions: string [] = [];
       technologyOptions: string [] = [];
       cloudOption: string [] = [];
       feedbackOptions: string [] = [];
       SQAOptions: string [] = [];
       projectTypeOptions: string [] = [];
       domainOptions: string [] = [];
       databaseUsedOptions: string [] = [];
       
       showStatus = false;
       showContractType = false;
       showDuAndDuHead = false;
       showRegions = false;
       showCustomerName = false;
       showProjectManager = false;
       showDate = false;
       showNumberOfResources = false;
       showTechnology = false;
       showCloudUsed = false;
       showFeedbackStatus = false;
       showSQA= false;
       showProjectType = false;
       showDomain = false;
       showDatabaseUsed = false;

       selectedStatusItems: string[] = [];
       selectedContractTypeItems: string[] = [];
       selectedduDuHeadItems: string[] = [];
       selectedRegionItems: string[] = [];
       selectedCustomerNameItems: string[] = [];
       selectedProjectManagerItems: string[] = [];
       selectedResourcesItems: string[] = [];
              
       ngOnInit(): void {
       this.fetchProjects();
     }
    //  fetchProjects(): void {
      // this.http.get<any>('http://localhost:3000/projects').subscribe(response => {
      //   console.log(response); // Log the response to inspect its structure
  
        // Map the response data to the component's properties
        // this.status = response.projectStatusOptions || [];
        // this.contractType = response.projectContractTypeOptions || [];
        // this.dusAndDuHeads = response.duAndDuHeadOptions || [];
        // this.regions = response.regionOptions || [];
        // this.customerName = response.customerNameOptions || [];
        // this.projectManager = response.projectManagerOptions || [];
        // this.numberOfResources = response.resourceOptions || [];
        // this.technologies = response.technologyOptions || [];
        // this.cloudUsed = response.cloudUsedOptions || [];
        // this.feedback = response.feedbackStatusOptions || [];
        // this.SQA = response.sqaOptions || [];
        // this.projectType = response.projectTypeOptions || [];
        // this.domain =  response.domainOptions || [];
        // this.databaseUsed = response.databaseUsedOptions || [];
        fetchProjects(): void {
          this.http.get<any>('http://localhost:3000/projects').subscribe(data => {
            console.log(data); // Log the data to see its structure
            
            if (Array.isArray(data)) {
              this.projects = data;
              this.processProjectsData(data);
            } else {
              console.error('Unexpected response format:', data);
              // Handle cases where data is not an array
            }
          });
        }
        processProjectsData(data: any[]): void {
        this.status = [...new Set(data.map(project => project.Status))];
        this.dusAndDuHeads = [...new Set(data.map(project => project.DU+'-'+project.DUHead))];
        this.contractType = [...new Set(data.map(project => project.ContractType))];
        this.numberOfResources = [...new Set(data.map(project => project.NumberOfResources))];
        this.customerName = [...new Set(data.map(project => project.CustomerName))];
        this.regions = [...new Set(data.map(project => project.Region))];
        this.technologies = [...new Set(data.map(project => project.technologyOptions))];
        this.projectManager = [...new Set(data.map(project => project.ProjectManager))];
  
        // this.status = response.Status|| [];
        // this.contractType = response.ContractType || [];
        // this.dusAndDuHeads = response.duAndDuHeadOptions || [];
        // this.regions = response.Region || [];
        // this.customerName = response.CustomerName || [];
        // this.projectManager = response.ProjectManager || [];
        // this.numberOfResources = response.NumberOfResources || [];
        // this.technologies = response.Technology || [];
        // console.log(this.status);
        // console.log(this.contractType);
        // this.cloudUsed = response.cloudUsedOptions || [];
        // this.feedback = response.feedbackStatusOptions || [];
        // this.SQA = response.sqaOptions || [];
        // this.projectType = response.projectTypeOptions || [];
        // this.domain =  response.domainOptions || [];
        // this.databaseUsed = response.databaseUsedOptions || [];
      };     
      // statusItem: string| any;
      // contractTypeItem: string| any;

      StatusCheckboxChange(statusItem:string) {
          if (this.filters.status[statusItem]) {
            // Add item to selected list
            this.selectedStatusItems.push(statusItem);
          } else {
            // Remove item from selected list
            this.selectedStatusItems = this.selectedStatusItems.filter(
            (item) => item !== statusItem
            );
          }
        }

        ContractCheckboxChange(contractTypeItem:string){
          if (this.filters.contractType[contractTypeItem]) {
            // Add item to selected list
            this.selectedContractTypeItems.push(contractTypeItem);
          } else {
            // Remove item from selected list
            this.selectedContractTypeItems= this.selectedContractTypeItems.filter(
            (item) => item !== contractTypeItem
            );
          }
        }
        
        DuDUHeadCheckboxChange(duDuHeadItem:string){
          if (this.filters.dusAndDuHeads[duDuHeadItem]) {
            // Add item to selected list
            this.selectedduDuHeadItems.push(duDuHeadItem);
          } else {
            // Remove item from selected list
            this.selectedduDuHeadItems= this.selectedduDuHeadItems.filter(
            (item) => item !== duDuHeadItem
            );
          }
        }

        RegionCheckboxChange(regionItem:string){
          if (this.filters.regions[regionItem]) {
            // Add item to selected list
            this.selectedRegionItems.push(regionItem);
          } else {
            // Remove item from selected list
            this.selectedRegionItems= this.selectedRegionItems.filter(
            (item) => item !== regionItem
            );
          }
        }
        
        CustomerNameCheckboxChange(customerNameItem:string){
          if (this.filters.customerName[customerNameItem]) {
            // Add item to selected list
            this.selectedCustomerNameItems.push(customerNameItem)
          } else {
            // Remove item from selected list
            this.selectedCustomerNameItems= this.selectedCustomerNameItems.filter(
            (item) => item !== customerNameItem
            );
          }
        }
        
        ProjectManagerCheckboxChange(projectmanagerItem:string){
          if (this.filters.projectManager[projectmanagerItem]) {
            // Add item to selected list
            this.selectedProjectManagerItems.push(projectmanagerItem)
          } else {
            // Remove item from selected list
            this.selectedProjectManagerItems= this.selectedProjectManagerItems.filter(
            (item) => item !== projectmanagerItem
            );
          }
        }
        
        ResourceCheckboxChange(resourceItem:string){
          if (this.filters.numberOfResources[resourceItem]) {
            // Add item to selected list
            this.selectedResourcesItems.push(resourceItem)
          } else {
            // Remove item from selected list
            this.selectedResourcesItems= this.selectedResourcesItems.filter(
            (item) => item !== resourceItem
            );
          }
        }
       
        removeStatusItem(statusItem: string) {
        this.filters.status[statusItem] = false;
        this.selectedStatusItems = this.selectedStatusItems.filter(
          (item) => item !== statusItem
        );
      }

      removeContractItem(contractTypeItem: string) {
        this.filters.contractType[contractTypeItem] = false;
        this.selectedContractTypeItems= this.selectedContractTypeItems.filter(
          (item) => item !== contractTypeItem
        );
      }
      
      removeDuDuHeadItem(duDuHeadItem: string) {
        this.filters.dusAndDuHeads[duDuHeadItem] = false;
        this.selectedduDuHeadItems= this.selectedduDuHeadItems.filter(
          (item) => item !== duDuHeadItem
        );
      }
      
      removeRegionItem(regionItem: string) {
        this.filters.regions[regionItem] = false;
        this.selectedRegionItems= this.selectedRegionItems.filter(
          (item) => item !== regionItem
        );
      }
      
      removeCustomerNameItem(customerItem: string) {
        this.filters.customerName[customerItem] = false;
        this.selectedCustomerNameItems= this.selectedCustomerNameItems.filter(
          (item) => item !== customerItem
        );
      }
      
      removeProjectManagerItem(projectmanagerItem: string) {
        this.filters.projectManager[projectmanagerItem] = false;
        this.selectedProjectManagerItems= this.selectedProjectManagerItems.filter(
          (item) => item !== projectmanagerItem
        );
      }
      
      removeResourcesItem(resourcesItem: string) {
        this.filters.numberOfResources[resourcesItem] = false;
        this.selectedResourcesItems= this.selectedResourcesItems.filter(
          (item) => item !== resourcesItem
        );
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
       this.customerNameOptions.forEach(option => {
        this.filters.customerName[option] = false;
      }); 
      this.projectManagerOptions.forEach(option => {
        this.filters.projectManager[option] = false;
      }); 
       this.resourceOptions.forEach(option => {
         this.filters.numberOfResources[option] = false;
       });   
       this.dateOptions.forEach(option => {
         this.filters.date[option] = false;
       });   
       this.technologyOptions.forEach(option => {
         this.filters.technologies[option] = false;
       }); 
       this.cloudOption.forEach(option => {
         this.filters.cloudUsed[option] = false;
       }); 
       this.feedbackOptions.forEach(option => {
         this.filters.feedback[option] = false;
       }); 
       this.SQAOptions.forEach(option => {
         this.filters.SQA[option] = false;
       }); 
       this.projectTypeOptions.forEach(option => {
         this.filters.projectType[option] = false;
       }); 
       this.domainOptions.forEach(option => {
         this.filters.domain[option] = false;
       }); 
       this.databaseUsedOptions.forEach(option => {
         this.filters.databaseUsed[option] = false;
       }); 
     }
  
     toggleDropdown(section: string) {
      if (section === 'status') {
        this.showStatus = !this.showStatus; 
        this.showContractType = false;
        this.showDuAndDuHead = false;
        this.showRegions = false;
        this.showCustomerName = false;
        this.showProjectManager = false;
        this.showNumberOfResources = false;
      } else if (section === 'contractType') {
        this.showContractType = !this.showContractType;
        this.showStatus = false;
        this.showDuAndDuHead = false;
        this.showRegions = false;
        this.showCustomerName = false;
        this.showProjectManager = false;
        this.showNumberOfResources = false;
      }else if (section === 'dusAndDuHeads') {
         this.showDuAndDuHead = !this.showDuAndDuHead;
         this.showStatus = false;
         this.showContractType = false;
         this.showRegions = false;
        this.showCustomerName = false;
        this.showProjectManager = false;
        this.showNumberOfResources = false;
      }else if (section === 'regions') {
        this.showRegions = !this.showRegions;
        this.showStatus = false;
        this.showContractType = false;
        this.showDuAndDuHead = false;
        this.showCustomerName = false;
        this.showProjectManager = false;
        this.showNumberOfResources = false;
      }else if (section === 'customerName') {
        this.showCustomerName = !this.showCustomerName;
        this.showStatus = false;
        this.showContractType = false;
        this.showDuAndDuHead = false;
        this.showRegions = false;
        this.showProjectManager = false;
        this.showNumberOfResources = false;
      }else if (section === 'projectManager') {
         this.showProjectManager = !this.showProjectManager;
         this.showStatus = false;
        this.showContractType = false;
        this.showDuAndDuHead = false;
        this.showRegions = false;
        this.showCustomerName = false;
        this.showNumberOfResources = false;
      } else if (section === 'date') {
         this.showDate = !this.showDate;
      } else if (section === 'numberOfResources') {
      this.showNumberOfResources = !this.showNumberOfResources;
      this.showStatus = false;
        this.showContractType = false;
        this.showDuAndDuHead = false;
        this.showRegions = false;
        this.showCustomerName = false;
        this.showProjectManager = false;
      }else if (section === 'technologies') {
      this.showTechnology = !this.showTechnology;
      } else if (section === 'cloudUsed') {
      this.showCloudUsed = !this.showCloudUsed;
      } else if (section === 'feedback') {
      this.showFeedbackStatus = !this.showFeedbackStatus
      } else if (section === 'SQA') {
      this.showSQA = !this.showSQA;
      } else if (section === 'domain') {
        this.showDomain = !this.showDomain;
      } else if (section === 'projectType') {
      this.showProjectType = !this.showProjectType;
      } else if (section === 'databaseUsed') {
      this.showDatabaseUsed = !this.showDatabaseUsed;
      }
  }   
  
     resetFilters() {
      this.showStatus = false;
      this.showContractType = false;
      this.showDuAndDuHead = false;
      this.showRegions = false;
      this.showCustomerName = false;
      this.showProjectManager = false;
      this.showNumberOfResources = false;
      this.status.forEach(key=> {
        this.filters.status[key] = false;
      });
      this.contractType.forEach(contract => {
        this.filters.contractType[contract] = false;
      });
       this.dusAndDuHeads.forEach(duandduhead => {
         this.filters.dusAndDuHeads[duandduhead] = false;
      });
      this.numberOfResources.forEach(key=> {
         this.filters.numberOfResources[key] = false;
      });      
      this.regions.forEach(key=> {
        this.filters.regions[key] = false;
      }); 
      this.customerName.forEach(key=> {
        this.filters.customerName[key] = false;
      }); 
      this.projectManager.forEach(manager => {
        this.filters.projectManager[manager] = false;
      });
      this.numberOfResources.forEach(key=> {
        this.filters.numberOfResources[key] = false;
      });
      this.technologies.forEach(key=> {
        this.filters.technologies[key] = false;
      });
      this.cloudUsed.forEach(key=> {
        this.filters.cloudUsed[key] = false;
      });
      this.feedback.forEach(key=> {
        this.filters.feedback[key] = false;
      });
      this.SQA.forEach(key=> {
        this.filters.SQA[key] = false;
      });
      this.domain.forEach(key=> {
        this.filters.domain[key] = false;
      });
      this.projectType.forEach(key=> {
        this.filters.projectType[key] = false;
      });
      this.databaseUsed.forEach(key=> {
        this.filters.databaseUsed[key] = false;
      });
 }

   ApplyFilters(){
       return this.isDivVisible=false;
     }
   }   

  

