import { Component, OnInit } from '@angular/core';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from '../navbar/navbar.component';

interface Filters {
  projectStatus: { [key: string]: boolean };
  projectContractType: { [key: string]: boolean };
  duAndDuHead: { [key: string]: boolean };
  region: { [key: string]: boolean };
  date: { [key: string]: boolean };
  resource: { [key: string]: boolean };
  projectType: { [key: string]: boolean };
  domain: { [key: string]: boolean };
  technology: { [key: string]: boolean };
  databaseUsed: { [key: string]: boolean };
  cloudUsed: { [key: string]: boolean };
}

@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [NgClass, NgFor, NgIf, FormsModule, NavbarComponent],
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {
  
  showFilters = false;

  // Options for the filters
  projectStatusOptions = ['Active', 'On Hold', 'Closed'];
  projectContractTypeOptions = ['FP', 'T&M'];
  duAndDuHeadOptions = [
    'DU 1 - Abhilash N Kishore',
    'DU 2 - Harisankar',
    'DU 3 - Anish Alias',
    'DU 4 - Pramodh Pillai',
    'DU 5 - Abhilash N Kishore',
    'DU 6 - Jayan M S'
  ];
  regionOptions = ['US', 'UK', 'Australia', 'Japan', 'India', 'UNZ'];
  resourceOptions = ['1-20', '21-40', '41-60', '61-80', '81-100'];
  projectTypeOptions = ['Project Type'];
  domainOptions = ['Domain'];
  technologyOptions = [ 'Technology '];
  databaseUsedOptions = ['Database Used'];
  cloudUsedOptions = ['Cloud Used'];

  // Dropdown visibility toggles
  showProjectStatus = false;
  showProjectContractType = false;
  showDuAndDuHead = false;
  showRegion = false;
  showDate = false;
  showResource = false;
  showProjectType =false;
  showDomain = false;
  showTechnology = false;
  showDatabaseUsed = false;
  showCloudUsed = false;

  filters: Filters = {
    projectStatus: {},
    projectContractType: {},
    duAndDuHead: {},
    region: {},
    date: {},
    resource:{},
    projectType:{},
    domain:{},
    technology:{},
    databaseUsed:{},
    cloudUsed:{},
  };

  isDivVisible:boolean = false;

  ngOnInit() {
    this.initializeFilters();
  }

  initializeFilters() {
    this.projectStatusOptions.forEach(option => {
      this.filters.projectStatus[option] = false;
    });
    this.projectContractTypeOptions.forEach(option => {
      this.filters.projectContractType[option] = false;
    });
    this.duAndDuHeadOptions.forEach(option => {
      this.filters.duAndDuHead[option] = false;
    });
    this.regionOptions.forEach(option => {
      this.filters.region[option] = false;
    }); 
    this.resourceOptions.forEach(option => {
      this.filters.resource[option] = false;
    });
    this.projectTypeOptions.forEach(option => {
      this.filters.projectContractType[option] = false;
    }); 
    this.domainOptions.forEach(option => {
      this.filters.domain[option] = false;
    }); 
    this.technologyOptions.forEach(option => {
      this.filters.technology[option] = false;
    });  
    this.databaseUsedOptions.forEach(option => {
      this.filters.databaseUsed[option] = false;
    });  
    this.cloudUsedOptions.forEach(option => {
      this.filters.cloudUsed[option] = false;
    });
  }

toggleDropdown(section: string) {
    if (section === 'projectStatus') {
      this.showProjectStatus = !this.showProjectStatus;
    } else if (section === 'projectContractType') {
      this.showProjectContractType = !this.showProjectContractType;
    } else if (section === 'duAndDuHead') {
      this.showDuAndDuHead = !this.showDuAndDuHead;
    } else if (section === 'region') {
      this.showRegion = !this.showRegion;
    } else if (section === 'date') {
    this.showDate = !this.showDate;
    }else if (section === 'resource') {
    this.showResource = !this.showResource;
    }else if (section === 'projectType') {
    this.showProjectType = !this.showProjectType;
    }else if (section === 'domain') {
    this.showDomain = !this.showDomain;
    }else if (section === 'technology') {
    this.showTechnology = !this.showTechnology;
    }else if (section === 'databaseUsed') {
    this.showDatabaseUsed = !this.showDatabaseUsed;
    }else if (section === 'cloudUsed') {
    this.showCloudUsed = !this.showCloudUsed;
    }
  } 

}
