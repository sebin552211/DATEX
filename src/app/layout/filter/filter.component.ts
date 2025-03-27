import { Injectable, Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Filter } from '../../interface/filter';
import { DashboardTableService } from '../../service/dashboard-table.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DashboardFilterService } from '../../service/dashboard-filter-service.service';
import { Subject, Subscription } from 'rxjs';
import { SharedDataService } from '../../service/shared-data.service';

@Injectable({
  providedIn: 'root',
})

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class FilterComponent implements OnInit {


  private filterSelectionSubscription: Subscription | undefined;
  private filterSelectionSubject = new Subject<{ filterKey: string; value: string }>();

onApplyFilters() {
  const params: any = {};
  const filterSelection$ = this.filterSelectionSubject.asObservable();

  Object.keys(this.selectedFilters).forEach(key => {
    if (this.selectedFilters[key].length > 0) {
        params[key] = this.selectedFilters[key].join(',');
    }
  });

  this.dashboardTableService.getProjects(params).subscribe(response => {
    this.projectData = response;
    this.updateFilterOptions(response);
  });
}

 dropdownVisible: { [key: string]: boolean } = {};
 selectedFilters : { [key: string]: string[] } = {};
  filters: Filter = {
    DU: {},
    DUHead: {},
    projectStartDate: {},
    projectEndDate: {},
    projectManager: {},
    contractType: {},
    customerName: {},
    region: {},
    technology: {},
    status: {},
    sqa: {},
    vocEligibilityDate: {},
    projectType: {},
    domain: {},
    databaseUsed: {},
    cloudUsed: {},
    feedbackStatus: {},
    mailStatus: {},
    projectCode: {}
  };

  statuses: string[] = [];
  contractTypes: string[] = [];
  DUs: string[] = [];
  DuHeads: string[] = [];
  regions: string[] = [];
  customerNames: string[] = [];
  technologies: string[] = [];
  projectStartDates: string[] = [];
  projectEndDates: string[] = [];
  projectManagers: string[] = [];
  sqas: string[] = [];
  projectCodes: string[]=[];
  projectTypes: string[] = [];
  domains: string[] = [];
  databasesUsed: string[] = [];
  cloudsUsed: string[] = [];
  showStatus: boolean = false;
  showContractType: boolean = false;
  showDu: boolean = false;
  ShowDuHead: boolean = false;
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

  private projectData: any[] = [];

  constructor(private http: HttpClient, private dashboardTableService: DashboardTableService ,private dashboardFilterService: DashboardFilterService, private sharedataservice : SharedDataService) {}

  ngOnInit() {
    this.dashboardTableService.getProjects().subscribe((projects) => {
      this.updateFilterOptions(projects);
    });
    this.filterSelectionSubscription = this.dashboardFilterService.filterSelection$.subscribe(
      ({ filterKey, value }) => {
        this.selectFilterOption(filterKey, value);
        this.applyFilters();
      }
    );
  }

  selectFilterOption(filterKey: string, value: string): void {
    if (!this.selectedFilters[filterKey]) {
      this.selectedFilters[filterKey] = [];
    }
    if (!this.selectedFilters[filterKey].includes(value)) {
      this.selectedFilters[filterKey].push(value);
    }
    // if (filterKey === 'projectCode') {
    //   this.updateSurveyId();
    // }
  }
  getDistinctValues(projects: any[], key: string): string[] {
    return [...new Set(projects.map(project => project[key]))];
  }

  // updateSurveyId(): void {
  //   const surveyId = this.getSelectedProjectCode();
  //   this.dashboardFilterService.updateSurveyId(surveyId);
  // }
  toggleDropdown(filterKey: string): void {
    this.dropdownVisible[filterKey] = !this.dropdownVisible[filterKey];
  }

  // Method to get selected status for display
  getSelectedStatus(): string | null {
    const selectedStatuses = this.selectedFilters['status'];
    if (selectedStatuses && selectedStatuses.length > 0) {
      return selectedStatuses.length > 1
        ? selectedStatuses.join(', ') //
        : selectedStatuses[0]; 
    }
    return null; 
  }

// Method to get selected contract types for display
getSelectedContractType(): string | null {
  const selectedContractTypes = this.selectedFilters['contractType'];
  if (selectedContractTypes && selectedContractTypes.length > 0) {
    return selectedContractTypes.length > 1
      ? selectedContractTypes.join(', ') 
      : selectedContractTypes[0]; 
  }
  return null; 
}

getSelectedDU(): string | null {
  const selectedDus = this.selectedFilters['DU'];
  if (selectedDus && selectedDus.length > 0) {
    return selectedDus.length > 1
      ? selectedDus.join(', ') 
      : selectedDus[0]; 
  }
  return null; 
}

getSelectedDUHead(): string | null {
  const selectedDuHeads = this.selectedFilters['DUHead'];
  if (selectedDuHeads && selectedDuHeads.length > 0) {
    return selectedDuHeads.length > 1
      ? selectedDuHeads.join(', ')
      : selectedDuHeads[0]; 
  }
  return null; 
}

// Method to get selected regions for display
getSelectedRegion(): string | null {
  const selectedRegions = this.selectedFilters['region'];
  if (selectedRegions && selectedRegions.length > 0) {
    return selectedRegions.length > 1
      ? selectedRegions.join(', ') 
      : selectedRegions[0]; 
  }
  return null; 
}


// Method to get selected customer names for display
getSelectedCustomerName(): string | null {
  const selectedCustomerNames = this.selectedFilters['customerName'];
  if (selectedCustomerNames && selectedCustomerNames.length > 0) {
    return selectedCustomerNames.length > 1
      ? selectedCustomerNames.join(', ') 
      : selectedCustomerNames[0]; 
  }
  return null; 
}

// Method to get selected technologies for display
getSelectedTechnology(): string | null {
  const selectedTechnologies = this.selectedFilters['technology'];
  if (selectedTechnologies && selectedTechnologies.length > 0) {
    return selectedTechnologies.length > 1
      ? selectedTechnologies.join(', ') 
      : selectedTechnologies[0]; 
  }
  return null; 
}


// Method to get selected project start dates for display
getSelectedProjectStartDate(): string | null {
  const selectedStartDates = this.selectedFilters['projectStartDate'];
  if (selectedStartDates && selectedStartDates.length > 0) {
    return selectedStartDates.length > 1
      ? selectedStartDates.join(', ') 
      : selectedStartDates[0]; 
  }
  return null; 
}

// Method to get selected project end dates for display
getSelectedProjectEndDate(): string | null {
  const selectedEndDates = this.selectedFilters['projectEndDate'];
  if (selectedEndDates && selectedEndDates.length > 0) {
    return selectedEndDates.length > 1
      ? selectedEndDates.join(', ') 
      : selectedEndDates[0]; 
  }
  return null; 
}

// Method to get selected project managers for display
getSelectedProjectManager(): string | null {
  const selectedManagers = this.selectedFilters['projectManager'];
  if (selectedManagers && selectedManagers.length > 0) {
    return selectedManagers.length > 1
      ? selectedManagers.join(', ') 
      : selectedManagers[0]; 
  }
  return null; 
}

// Method to get selected SQA for display
getSelectedSQA(): string | null {
  const selectedSQAs = this.selectedFilters['sqa'];
  if (selectedSQAs && selectedSQAs.length > 0) {
    return selectedSQAs.length > 1
      ? selectedSQAs.join(', ')
      : selectedSQAs[0];
  }
  return null; 
}

// Method to get selected Project Type for display
getSelectedProjectType(): string | null {
  const selectedProjectTypes = this.selectedFilters['projectType'];
  if (selectedProjectTypes && selectedProjectTypes.length > 0) {
    return selectedProjectTypes.length > 1
      ? selectedProjectTypes.join(', ') 
      : selectedProjectTypes[0]; 
  }
  return null; 
}

// Method to get selected Domain for display
getSelectedDomain(): string | null {
  const selectedDomains = this.selectedFilters['domain'];
  if (selectedDomains && selectedDomains.length > 0) {
    return selectedDomains.length > 1
      ? selectedDomains.join(', ') 
      : selectedDomains[0];
  }
  return null; 
}

// Method to get selected Database Used for display
getSelectedDatabaseUsed(): string | null {
  const selectedDatabasesUsed = this.selectedFilters['databaseUsed'];
  if (selectedDatabasesUsed && selectedDatabasesUsed.length > 0) {
    return selectedDatabasesUsed.length > 1
      ? selectedDatabasesUsed.join(', ') 
      : selectedDatabasesUsed[0]; 
  }
  return null;
}


getSelectedProjectCode(): string | null {
  const selectedProjectCode = this.selectedFilters['projectCode']
  if (selectedProjectCode && selectedProjectCode.length > 0) {

    return selectedProjectCode.length > 1
      ? selectedProjectCode.join(', ') 
      : selectedProjectCode[0]; 
  }
  return null; 
}

// Method to get selected Cloud Used for display
getSelectedCloudUsed(): string | null {
  const selectedCloudsUsed = this.selectedFilters['cloudUsed'];
  if (selectedCloudsUsed && selectedCloudsUsed.length > 0) {
    return selectedCloudsUsed.length > 1
      ? selectedCloudsUsed.join(', ') 
      : selectedCloudsUsed[0]; 
  }
  return null; 
}

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
    // Apply filters based on new selection
    this.applyFilters();

    // if (filterKey === 'projectCode') {
    //   const surveyId = this.getSelectedProjectCode();
    //   this.dashboardFilterService.updateSurveyId(surveyId);
    // }
  }

  applyFilters(): void {
    const params: any = {};
      this.http.get<any[]>('https://localhost:7259/api/Project/filter', { params })
        .subscribe(response => {
          this.projectData = response;
          this.updateFilterOptions(this.projectData);
        });
    this.onApplyFilters(); 
  }   

  updateFilterOptions(projects: any[]): void {
    // Helper function to get distinct values, excluding null or empty strings
    const getNonNullDistinctValues = (projects: any[], key: string): string[] => {
      return [...new Set(projects.map(project => project[key]).filter(value => value !== null && value !== ''))];
    };

    this.statuses = getNonNullDistinctValues(projects, 'status');
    this.contractTypes = getNonNullDistinctValues(projects, 'contractType');
    this.DUs = getNonNullDistinctValues(projects, 'du');
    this.DuHeads = getNonNullDistinctValues(projects, 'duHead');
    this.regions = getNonNullDistinctValues(projects, 'region');
    this.customerNames = getNonNullDistinctValues(projects, 'customerName');
    this.technologies = getNonNullDistinctValues(projects, 'technology');
    this.projectStartDates = getNonNullDistinctValues(projects, 'projectStartDate');
    this.projectEndDates = getNonNullDistinctValues(projects, 'projectEndDate');
    this.projectManagers = getNonNullDistinctValues(projects, 'projectManager');
    this.sqas = getNonNullDistinctValues(projects, 'sqa');
    this.projectTypes = getNonNullDistinctValues(projects, 'projectType');
    this.domains = getNonNullDistinctValues(projects, 'domain');
    this.databasesUsed = getNonNullDistinctValues(projects, 'databaseUsed');
    this.cloudsUsed = getNonNullDistinctValues(projects, 'cloudUsed');
    this.projectCodes = getNonNullDistinctValues(projects, 'projectCode');
    this.dropdownVisible = {};    
  }

// Method to check if a specific status is selected

isSelectedFilter(filterKey: string, value: string): boolean {
  return this.selectedFilters[filterKey] && this.selectedFilters[filterKey].includes(value);
}
  resetFilters(): void {
    this.selectedFilters = {}; // Reset selected filters
    this.dashboardTableService.getProjects().subscribe((projects) => {
      this.updateFilterOptions(projects);
    });
  }
}
