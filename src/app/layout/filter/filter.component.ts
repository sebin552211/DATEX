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
  SQA: { [key: string]: boolean };
  databaseUsed: { [key: string]: boolean };
  cloudUsed: { [key: string]: boolean };
  feedbackStatus: { [key: string]: boolean };
}

@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [NgClass, NgFor, NgIf, FormsModule, NavbarComponent],
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
  
})

export class FilterComponent implements OnInit {

  isDivVisible: boolean = true;

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
  SQAOptions = ['SQA'];
  databaseUsedOptions = ['Database Used'];
  cloudUsedOptions = ['Cloud Used'];
  feedbackStatusOptions = ['Pending', 'Recieved']

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
  showSQA= false;
  showDatabaseUsed = false;
  showCloudUsed = false;
  showFeedbackStatus = false;

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
    SQA:{},
    databaseUsed:{},
    cloudUsed:{},
    feedbackStatus:{}
  };

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
    this.SQAOptions.forEach(option => {
      this.filters.SQA[option] = false;
    });  
    this.databaseUsedOptions.forEach(option => {
      this.filters.databaseUsed[option] = false;
    });  
    this.cloudUsedOptions.forEach(option => {
      this.filters.cloudUsed[option] = false;
    });
    this.feedbackStatusOptions.forEach(option => {
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
    }else if (section === 'SQA') {
    this.showSQA = !this.showSQA;
    }else if (section === 'databaseUsed') {
    this.showDatabaseUsed = !this.showDatabaseUsed;
    }else if (section === 'cloudUsed') {
    this.showCloudUsed = !this.showCloudUsed;
    }else if (section === 'feedbackStatus') {
    this.showFeedbackStatus = !this.showFeedbackStatus;
    }
  } 

  resetFilters() {
    Object.keys(this.filters.projectStatus).forEach(key => {
      this.filters.projectStatus[key] = false;
    });
    Object.keys(this.filters.projectContractType).forEach(key => {
      this.filters.projectContractType[key] = false;
    });
    Object.keys(this.filters.duAndDuHead).forEach(key => {
      this.filters.duAndDuHead[key] = false;
    });
    Object.keys(this.filters.region).forEach(key => {
      this.filters.region[key] = false;
    });
    Object.keys(this.filters.date).forEach(key => {
      this.filters.date[key] = false;
    });
    Object.keys(this.filters.resource).forEach(key => {
      this.filters.resource[key] = false;
    });
    Object.keys(this.filters.projectType).forEach(key => {
      this.filters.projectType[key] = false;
    });
    Object.keys(this.filters.domain).forEach(key => {
      this.filters.domain[key] = false;
    });
    Object.keys(this.filters.technology).forEach(key => {
      this.filters.technology[key] = false;
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

