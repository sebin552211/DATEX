import { Component, OnInit } from '@angular/core';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from '../navbar/navbar.component';
import { HttpClient } from '@angular/common/http';
import { Filters } from '../../interface/Filters';
import { DashboardTableService } from '../../service/dashboard-table.service';
import { CommonModule } from '@angular/common';
import { ExportbuttonComponent } from "../../ui/exportbutton/exportbutton.component";

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, ExportbuttonComponent]
})
export class FilterComponent implements OnInit {


  
onApplyFilters() {
  // var isdivDivisible = true;
  const params: any = {};

  Object.keys(this.selectedFilters).forEach(key => {
    if (this.selectedFilters[key].length > 0) {
      if (key === 'dusAndDuHeads') {
        const duValues = this.selectedFilters[key].map(value => value.split(' - ')[0]);
        params['du'] = duValues.join(',');
      } else {
        params[key] = this.selectedFilters[key].join(',');
      }
    }
  });

  this.dashboardTableService.getProjects(params).subscribe(response => {
    this.projectData = response;
    console.log('Filtered project data:', this.projectData);
    this.updateFilterOptions(response);
  });
  // isdivDivisible=false;
}



  dropdownVisible: { [key: string]: boolean } = {};
  selectedFilters: { [key: string]: string[] } = {};
  filters: Filters = {
    du: {},
    duHead: {},
    dusAndDuHeads: {},
    projectStartDate: {},
    projectEndDate: {},
    projectManager: {},
    contractType: {},
    customerNames: {},
    regions: {},
    technologies: {},
    status: {},
    sqa: {},
    vocEligibilityDate: {},
    projectType: {},
    domain: {},
    databaseUsed: {},
    cloudUsed: {},
    feedbackStatus: {},
    mailStatus: {},
    numberOfResources: {}
  };

  statuses: string[] = [];
  contractTypes: string[] = [];
  dusAndDuHeads: string[] = [];
  regions: string[] = [];
  customerNames: string[] = [];
  technologies: string[] = [];
  projectStartDates: string[] = [];
  projectEndDates: string[] = [];
  projectManagers: string[] = [];
  sqas: string[] = [];
  projectTypes: string[] = [];
  domains: string[] = [];
  databasesUsed: string[] = [];
  cloudsUsed: string[] = [];

  showStatus: boolean = false;
  showContractType: boolean = false;
  showDuAndDuHead: boolean = false;
  showRegions: boolean = false;
  showCustomerName: boolean = false;
  showTechnologies: boolean = false;
  showProjectStartDate: boolean = false;
  showProjectEndDate: boolean = false;
  showProjectManager: boolean = false;
  showSqa: boolean = false;
  showProjectType: boolean = false;
  showDomain: boolean = false;
  showDatabaseUsed: boolean = false;
  showCloudUsed: boolean = false;
  showDate = false;
  showNumberOfResources = false;
  showTechnology = false;
  showFeedbackStatus = false;
  showSQA= false;


  selectedStatusItems: string[] = [];
  selectedContractTypeItems: string[] = [];
  selectedduDuHeadItems: string[] = [];
  selectedRegionItems: string[] = [];
  selectedCustomerNameItems: string[] = [];
  selectedProjectManagerItems: string[] = [];
  selectedResourcesItems: string[] = [];
  selectedTechnologyItems: string[] = [];
  selectedsqaItems: string[] = [];
  selectedProjectTypeItems: string[] = [];
  selectedDomainItems: string[] = [];
  selectedDatabaseUsedItems: string[] = [];
  selectedCloudUsedItems: string[] = [];
  selectedProjectStartDate: string[] = [];
  selectedProjectEndDate: string[] = [];
  


    private projectData: any[] = [];

  constructor(private http: HttpClient, private dashboardTableService: DashboardTableService) {}

  ngOnInit() {
    this.dashboardTableService.getProjects().subscribe((projects) => {
      this.updateFilterOptions(projects);
    });
  }

  getDistinctValues(projects: any[], key: string): string[] {
    return [...new Set(projects.map(project => project[key]))];
  }

  getMappedDuAndDuHeads(projects: any[]): string[] {
    const duMap: { [key: string]: Set<string> } = {};

    projects.forEach(project => {
      const du = project['du'];
      const duHead = project['duHead'];

      if (du && duHead) {
        if (!duMap[du]) {
          duMap[du] = new Set();
        }
        duMap[du].add(duHead);
      }
    });

    const mappedValues: string[] = [];

    Object.keys(duMap).forEach(du => {
      duMap[du].forEach(duHead => {
        mappedValues.push(`${du} - ${duHead}`);
      });
    });

    return mappedValues;
  }
///////Adding functions
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

  CustomerCheckboxChange(customername: string){
    if (this.filters.customerNames[customername]) {
      // Add item to selected list
      this.selectedCustomerNameItems.push(customername);
    } else {
      // Remove item from selected list
      this.selectedCustomerNameItems= this.selectedCustomerNameItems.filter(
      (item) => item !== customername
      );
    }
  }

  TechnologyCheckboxChange(technologyItem: string){
    if (this.filters.technologies[technologyItem]) {
      // Add item to selected list
      this.selectedTechnologyItems.push(technologyItem);
    } else {
      // Remove item from selected list
      this.selectedTechnologyItems = this.selectedTechnologyItems.filter(
      (item) => item !== technologyItem
      );
    }
  }
 
  ProjectManagerCheckboxChange(managerItem: string){
    if (this.filters.projectManager[managerItem]) {
      // Add item to selected list
      this.selectedProjectManagerItems.push(managerItem);
    } else {
      // Remove item from selected list
      this.selectedProjectManagerItems = this.selectedProjectManagerItems.filter(
      (item) => item !== managerItem
      );
    }
  }

  SQACheckboxChange(SQAItem: string){
    if (this.filters.sqa[SQAItem]) {
      // Add item to selected list
      this.selectedsqaItems.push(SQAItem);
    } else {
      // Remove item from selected list
      this.selectedsqaItems = this.selectedsqaItems.filter(
      (item) => item !== SQAItem
      );
    }
  }
  ProjectTypeCheckboxChange(projectTypeItem:string){
    if (this.filters.projectType[projectTypeItem]) {
      // Add item to selected list
      this.selectedProjectTypeItems.push(projectTypeItem);
    } else {
      // Remove item from selected list
      this.selectedDomainItems = this.selectedDomainItems.filter(
      (item) => item !== projectTypeItem
      );
    }
  }

  DomainCheckboxChange(domainItem:string){
    if (this.filters.domain[domainItem]) {
      // Add item to selected list
      this.selectedDomainItems.push(domainItem);
    } else {
      // Remove item from selected list
      this.selectedDomainItems = this.selectedDomainItems.filter(
      (item) => item !== domainItem
      );
    }
  }

 CloudUsedCheckboxChange(cloudItem: string){
  if (this.filters.cloudUsed[cloudItem]) {
    // Add item to selected list
    this.selectedCloudUsedItems.push(cloudItem);
  } else {
    // Remove item from selected list
    this.selectedCloudUsedItems = this.selectedCloudUsedItems.filter(
    (item) => item !== cloudItem
    );
  }
 }
 
 DatabaseUsedCheckboxChange(databseItem: string){
  if (this.filters.databaseUsed[databseItem]) {
    // Add item to selected list
    this.selectedDatabaseUsedItems.push(databseItem);
  } else {
    // Remove item from selected list
    this.selectedDatabaseUsedItems = this.selectedDatabaseUsedItems.filter(
    (item) => item !== databseItem
    );
  }
 }

 ProjectStartDateCheckboxChange(projectstartdate:string){
  if (this.filters.projectStartDate[projectstartdate]) {
    // Add item to selected list
    this.selectedProjectStartDate.push(projectstartdate);
  } else {
    // Remove item from selected list
    this.selectedProjectStartDate = this.selectedProjectStartDate.filter(
    (item) => item !== projectstartdate
    );
  }
 }
 
 ProjectEndDateCheckboxChange(projectenddate:string){
  if (this.filters.projectEndDate[projectenddate]) {
    // Add item to selected list
    this.selectedProjectEndDate.push(projectenddate);
  } else {
    // Remove item from selected list
    this.selectedProjectEndDate = this.selectedProjectEndDate.filter(
    (item) => item !== projectenddate
    );
  }
 }

  ///remove functions
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
    this.filters.customerNames[customerItem] = false;
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

  removeTechnologyItem(technologyItem: string) {
    this.filters.technologies[technologyItem] = false;
    this.selectedTechnologyItems= this.selectedTechnologyItems.filter(
      (item) => item !== technologyItem
    );
  }
  
  
  removeSQAItem(SQAItem: string) {
    this.filters.sqa[SQAItem] = false;
    this.selectedsqaItems= this.selectedsqaItems.filter(
      (item) => item !== SQAItem
    );
  }
  
  removeProjectTypeItem(projectTypeItem: string) {
    this.filters.projectType[projectTypeItem] = false;
    this.selectedProjectTypeItems= this.selectedProjectTypeItems.filter(
      (item) => item !== projectTypeItem
    );
  }
  
  removeDomainItem(domainItem: string) {
    this.filters.domain[domainItem] = false;
    this.selectedDomainItems= this.selectedDomainItems.filter(
      (item) => item !== domainItem
    );
  }

  removeCloudUsedItem(cloudItem: string) {
    this.filters.cloudUsed[cloudItem] = false;
    this.selectedCloudUsedItems= this.selectedCloudUsedItems.filter(
      (item) => item !== cloudItem
    );
  }

  removeDatabaseItem(databaseItem: string) {
    this.filters.databaseUsed[databaseItem] = false;
    this.selectedDatabaseUsedItems= this.selectedDatabaseUsedItems.filter(
      (item) => item !== databaseItem
    );
  }

  removeProjectStartDateItem(projectstartdate: string) {
    this.filters.projectStartDate[projectstartdate] = false;
    this.selectedProjectStartDate= this.selectedProjectStartDate.filter(
      (item) => item !== projectstartdate
    );
  }

  removeProjectEndDateItem(projectenddate: string) {
    this.filters.projectEndDate[projectenddate] = false;
    this.selectedProjectEndDate= this.selectedProjectEndDate.filter(
      (item) => item !== projectenddate
    );
  }


  // toggleDropdown(filterKey: string): void {
  //   this.dropdownVisible[filterKey] = !this.dropdownVisible[filterKey];
  // }

  onFilterChange(event: Event, filterKey: string): void {
    const checkbox = event.target as HTMLInputElement;
    const value = checkbox.value;

    if (checkbox.checked) {
      if (!this.selectedFilters[filterKey]) {
        this.selectedFilters[filterKey] = [];
      }
      this.selectedFilters[filterKey].push(value);
    } else {
      this.selectedFilters[filterKey] = this.selectedFilters[filterKey].filter(
        (v) => v !== value
      );
    }

    this.applyFilters();
  }
  toggleDropdown(section: string) {
    if (section === 'status') {
      this.showStatus = !this.showStatus;
      this.showContractType = false;
      this.showDuAndDuHead = false;
      this.showRegions = false;
      this.showCustomerName = false;
      this.showProjectManager = false;
      this.showProjectStartDate= false;
      this.showProjectEndDate = false;
      this.showNumberOfResources = false;
      this.showTechnology = false;
      this.showCloudUsed = false;
      this.showFeedbackStatus = false;
      this.showSQA = false;
      this.showDomain = false;
      this.showProjectType = false;
      this.showDatabaseUsed = false;
    } else if (section === 'contractType') {
      this.showContractType = !this.showContractType;
      this.showStatus = false;
      this.showDuAndDuHead = false;
      this.showRegions = false;
      this.showCustomerName = false;
      this.showProjectManager = false;
      this.showProjectStartDate= false;
      this.showProjectEndDate = false;
      this.showNumberOfResources = false;
      this.showTechnology = false;
      this.showCloudUsed = false;
      this.showFeedbackStatus = false;
      this.showSQA = false;
      this.showDomain = false;
      this.showProjectType = false;
      this.showDatabaseUsed = false;
    }else if (section === 'dusAndDuHeads') {
      this.showDuAndDuHead = !this.showDuAndDuHead;
       this.showStatus = false; 
       this.showContractType = false;
       this.showRegions = false;
      this.showCustomerName = false;
      this.showProjectManager = false;
      this.showProjectStartDate= false;
      this.showProjectEndDate = false;
      this.showNumberOfResources = false;
      this.showTechnology = false;
      this.showCloudUsed = false;
      this.showFeedbackStatus = false;
      this.showSQA = false;
      this.showDomain = false;
      this.showProjectType = false;
      this.showDatabaseUsed = false;
    }else if (section === 'regions') {
      this.showStatus = false;
      this.showContractType = false;
      this.showDuAndDuHead = false;
      this.showCustomerName = false;
      this.showProjectManager = false;
      this.showProjectStartDate= false;
      this.showProjectEndDate = false;
      this.showNumberOfResources = false;
      this.showTechnology = false;
      this.showCloudUsed = false;
      this.showFeedbackStatus = false;
      this.showSQA = false;
      this.showDomain = false;
      this.showProjectType = false;
      this.showDatabaseUsed = false;
      this.showRegions = !this.showRegions;
    }else if (section === 'customerName') {
      this.showCustomerName = !this.showCustomerName;
      this.showStatus = false;
      this.showContractType = false;
      this.showDuAndDuHead = false;
      this.showRegions = false;
      this.showProjectManager = false;
      this.showProjectStartDate= false;
      this.showProjectEndDate = false;
      this.showNumberOfResources = false;
      this.showTechnology = false;
      this.showCloudUsed = false;
      this.showFeedbackStatus = false;
      this.showSQA = false;
      this.showDomain = false;
      this.showProjectType = false;
      this.showDatabaseUsed = false;
    }else if (section === 'projectManager') {
       this.showProjectManager = !this.showProjectManager;
       this.showCustomerName = false;
      this.showStatus = false;
      this.showContractType = false;
      this.showDuAndDuHead = false;
      this.showRegions = false;
      this.showCustomerName = false;
       this.showProjectStartDate= false;
      this.showProjectEndDate = false;
      this.showDatabaseUsed = false;
      this.showNumberOfResources = false;
      this.showTechnology = false;
      this.showCloudUsed = false;
      this.showFeedbackStatus = false;
      this.showSQA = false;
      this.showDomain = false;
      this.showProjectType = false;
    } else if (section === 'projectStartDate') {
       this.showProjectStartDate = !this.showProjectStartDate;
       this.showCustomerName = false;
       this.showStatus = false;
       this.showContractType = false;
       this.showDuAndDuHead = false;
       this.showRegions = false;
       this.showCustomerName = false;
       this.showProjectManager = false;
       this.showDatabaseUsed = false;
       this.showProjectEndDate = false;
      this.showNumberOfResources = false;
      this.showTechnology = false;
      this.showCloudUsed = false;
      this.showFeedbackStatus = false;
      this.showSQA = false;
      this.showDomain = false;
      this.showProjectType = false;
    }else if (section === 'projectEndDate') {
      this.showProjectEndDate = !this.showProjectEndDate;
      this.showProjectStartDate = false;
      this.showCustomerName = false;
      this.showStatus = false;
      this.showContractType = false;
      this.showDuAndDuHead = false;
      this.showRegions = false;
      this.showDatabaseUsed = false;
      this.showCustomerName = false;
      this.showProjectManager = false;
      this.showNumberOfResources = false;
      this.showTechnology = false;
      this.showCloudUsed = false;
      this.showFeedbackStatus = false;
      this.showSQA = false;
      this.showDomain = false;
      this.showProjectType = false;
   }else if (section === 'numberOfResources') {
    this.showNumberOfResources = !this.showNumberOfResources;
    this.showProjectEndDate = false;
      this.showProjectStartDate = false;
      this.showCustomerName = false;
      this.showStatus = false;
      this.showContractType = false;
      this.showDuAndDuHead = false;
      this.showRegions = false;
      this.showCustomerName = false;
      this.showProjectManager = false;
      this.showTechnology = false;
      this.showCloudUsed = false;
      this.showFeedbackStatus = false;
      this.showSQA = false;
      this.showDomain = false;
      this.showProjectType = false;
      this.showDatabaseUsed = false;
    }else if (section === 'technologies') {
    this.showTechnology = !this.showTechnology;
    this.showNumberOfResources = false;
    this.showProjectEndDate = false;
      this.showProjectStartDate = false;
      this.showCustomerName = false;
      this.showStatus = false;
      this.showContractType = false;
      this.showDuAndDuHead = false;
      this.showRegions = false;
      this.showCustomerName = false;
      this.showProjectManager = false;
      this.showCloudUsed = false;
      this.showFeedbackStatus = false;
      this.showSQA = false;
      this.showDatabaseUsed = false;
      this.showDomain = false;
      this.showProjectType = false;
    } else if (section === 'cloudUsed') {
    this.showCloudUsed = !this.showCloudUsed;
    this.showTechnology = false;
    this.showNumberOfResources = false;
    this.showProjectEndDate = false;
      this.showProjectStartDate = false;
      this.showCustomerName = false;
      this.showStatus = false;
      this.showContractType = false;
      this.showDuAndDuHead = false;
      this.showRegions = false;
      this.showCustomerName = false;
      this.showProjectManager = false;
      this.showFeedbackStatus = false;
      this.showSQA = false;
      this.showDomain = false;
      this.showDatabaseUsed = false;
      this.showProjectType = false;
    } else if (section === 'feedback') {
    this.showFeedbackStatus = !this.showFeedbackStatus;
    this.showCloudUsed = false;
    this.showTechnology = false;
    this.showNumberOfResources = false;
    this.showProjectEndDate = false;
      this.showProjectStartDate = false;
      this.showCustomerName = false;
      this.showStatus = false;
      this.showContractType = false;
      this.showDuAndDuHead = false;
      this.showRegions = false;
      this.showCustomerName = false;
      this.showProjectManager = false;
      this.showSQA = false;
      this.showDomain = false;
      this.showProjectType = false;
      this.showDatabaseUsed = false;
    } else if (section === 'SQA') {
    this.showSQA = !this.showSQA;
    this.showFeedbackStatus = false;
    this.showCloudUsed = false;
    this.showTechnology = false;
    this.showNumberOfResources = false;
    this.showProjectEndDate = false;
      this.showProjectStartDate = false;
      this.showCustomerName = false;
      this.showStatus = false;
      this.showContractType = false;
      this.showDuAndDuHead = false;
      this.showRegions = false;
      this.showCustomerName = false;
      this.showProjectManager = false;
      this.showDomain = false;
      this.showProjectType = false;
      this.showDatabaseUsed = false;
    } else if (section === 'domain') {
      this.showDomain = !this.showDomain;
      this.showSQA = false;
      this.showFeedbackStatus = false;
    this.showCloudUsed = false;
    this.showTechnology = false;
    this.showNumberOfResources = false;
    this.showProjectEndDate = false;
      this.showProjectStartDate = false;
      this.showCustomerName = false;
      this.showStatus = false;
      this.showContractType = false;
      this.showDuAndDuHead = false;
      this.showRegions = false;
      this.showCustomerName = false;
      this.showProjectManager = false;
      this.showProjectType = false;
      this.showDatabaseUsed = false;
    } else if (section === 'projectType') {
    this.showProjectType = !this.showProjectType;
    this.showDomain = false;
      this.showSQA = false;
      this.showFeedbackStatus = false;
    this.showCloudUsed = false;
    this.showTechnology = false;
    this.showNumberOfResources = false;
    this.showProjectEndDate = false;
      this.showProjectStartDate = false;
      this.showCustomerName = false;
      this.showStatus = false;
      this.showContractType = false;
      this.showDuAndDuHead = false;
      this.showRegions = false;
      this.showCustomerName = false;
      this.showProjectManager = false;
      this.showDatabaseUsed = false;
    } else if (section === 'databaseUsed') {
    this.showDatabaseUsed = !this.showDatabaseUsed;
    this.showProjectType = false;
    this.showDomain = false;
    this.showFeedbackStatus = false;
    this.showCloudUsed = false;
    this.showTechnology = false;
    this.showNumberOfResources = false;
    this.showProjectEndDate = false;
    this.showProjectStartDate = false;
    this.showCustomerName = false;
    this.showStatus = false;
    this.showContractType = false;
    this.showDuAndDuHead = false;
    this.showRegions = false;
    this.showCustomerName = false;
    this.showProjectManager = false;
    }
}   

  applyFilters(): void {
    const params: any = {};

    Object.keys(this.selectedFilters).forEach(key => {
      if (this.selectedFilters[key].length > 0) {
        if (key === 'dusAndDuHeads') {
          const duValues = this.selectedFilters[key].map(value => value.split(' - ')[0]);
          params['du'] = duValues.join(',');
        } else {
          params[key] = this.selectedFilters[key].join(',');
        }
      }
    });

    this.http.get<any[]>('https://localhost:7259/api/Project/filter', { params })
      .subscribe(response => {
        this.projectData = response;
        // Log the data to the console
        console.log('Filtered project data:', this.projectData);
        this.updateFilterOptions(response);
      });
  }

  updateFilterOptions(projects: any[]): void {
    this.statuses = this.getDistinctValues(projects, 'status');
    this.contractTypes = this.getDistinctValues(projects, 'contractType');
    this.dusAndDuHeads = this.getMappedDuAndDuHeads(projects);
    this.regions = this.getDistinctValues(projects, 'region');
    this.customerNames = this.getDistinctValues(projects, 'customerName');
    this.technologies = this.getDistinctValues(projects, 'technology');
    this.projectStartDates = this.getDistinctValues(projects, 'projectStartDate');
    this.projectEndDates = this.getDistinctValues(projects, 'projectEndDate');
    this.projectManagers = this.getDistinctValues(projects, 'projectManager');
    this.sqas = this.getDistinctValues(projects, 'sqa');
    this.projectTypes = this.getDistinctValues(projects, 'projectType');
    this.domains = this.getDistinctValues(projects, 'domain');
    this.databasesUsed = this.getDistinctValues(projects, 'databaseUsed');
    this.cloudsUsed = this.getDistinctValues(projects, 'cloudUsed');

    this.dropdownVisible = {};
  }

  isSelectedFilter(filterKey: string, value: string): boolean {
    return this.selectedFilters[filterKey]?.includes(value) || false;
  }

  resetFilters(): void {
    this.selectedFilters = {}; // Reset selected filters
    this.dashboardTableService.getProjects().subscribe((projects) => {
      this.updateFilterOptions(projects);
    });
  }
}
