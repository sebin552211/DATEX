import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Filter } from '../../interface/filter';
import { DashboardTableService } from '../../service/dashboard-table.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DashboardFilterService } from '../../service/dashboard-filter-service.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class FilterComponent implements OnInit {


  private filterSelectionSubscription: Subscription | undefined;
onApplyFilters() {
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

}



  dropdownVisible: { [key: string]: boolean } = {};
  selectedFilters: { [key: string]: string[] } = {};
  filters: Filter = {


    du: {},
    duHead: {},
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
    mailStatus: {}
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

    private projectData: any[] = [];

  constructor(private http: HttpClient, private dashboardTableService: DashboardTableService ,private dashboardFilterService: DashboardFilterService) {}

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

  toggleDropdown(filterKey: string): void {
    this.dropdownVisible[filterKey] = !this.dropdownVisible[filterKey];
  }

hasSelectedStatus(): boolean {
  return this.getSelectedStatus() !== '';
}


  // Method to get selected status for display
  getSelectedStatus(): string | null {
    const selectedStatuses = this.selectedFilters['status'];
    if (selectedStatuses && selectedStatuses.length > 0) {
      return selectedStatuses.length > 1
        ? selectedStatuses.join(', ') // Join multiple selected statuses
        : selectedStatuses[0]; // Display single selected status
    }
    return null; // No selection
  }

  hasSelectedContractType(): boolean {
    return this.getSelectedContractType() !== '';
  }
// Method to get selected contract types for display
getSelectedContractType(): string | null {
  const selectedContractTypes = this.selectedFilters['contractType'];
  if (selectedContractTypes && selectedContractTypes.length > 0) {
    return selectedContractTypes.length > 1
      ? selectedContractTypes.join(', ') // Join multiple selected contract types
      : selectedContractTypes[0]; // Display single selected contract type
  }
  return null; // No selection
}

hasSelectedDusAndDuHeads(): boolean {
  return this.getSelectedDusAndDuHeads() !== '';
}
// Method to get selected DU & DU Heads for display
getSelectedDusAndDuHeads(): string | null {
  const selectedDusAndDuHeads = this.selectedFilters['dusAndDuHeads'];
  if (selectedDusAndDuHeads && selectedDusAndDuHeads.length > 0) {
    return selectedDusAndDuHeads.length > 1
      ? selectedDusAndDuHeads.join(', ') // Join multiple selected DU & DU Heads
      : selectedDusAndDuHeads[0]; // Display single selected DU & DU Head
  }
  return null; // No selection
}

hasSelectedRegion(): boolean {
  return this.getSelectedRegion() !== '';
}
// Method to get selected regions for display
getSelectedRegion(): string | null {
  const selectedRegions = this.selectedFilters['region'];
  if (selectedRegions && selectedRegions.length > 0) {
    return selectedRegions.length > 1
      ? selectedRegions.join(', ') // Join multiple selected regions
      : selectedRegions[0]; // Display single selected region
  }
  return null; // No selection
}

hasSelectedCustomerName(): boolean {
  return this.getSelectedCustomerName() !== '';
}

// Method to get selected customer names for display
getSelectedCustomerName(): string | null {
  const selectedCustomerNames = this.selectedFilters['customerName'];
  if (selectedCustomerNames && selectedCustomerNames.length > 0) {
    return selectedCustomerNames.length > 1
      ? selectedCustomerNames.join(', ') // Join multiple selected customer names
      : selectedCustomerNames[0]; // Display single selected customer name
  }
  return null; // No selection
}

hasSelectedTechnology(): boolean {
  return this.getSelectedTechnology() !== '';
}

// Method to get selected technologies for display
getSelectedTechnology(): string | null {
  const selectedTechnologies = this.selectedFilters['technology'];
  if (selectedTechnologies && selectedTechnologies.length > 0) {
    return selectedTechnologies.length > 1
      ? selectedTechnologies.join(', ') // Join multiple selected technologies
      : selectedTechnologies[0]; // Display single selected technology
  }
  return null; // No selection
}

hasSelectedProjectStartDate(): boolean {
  return this.getSelectedProjectStartDate() !== '';
}

// Method to get selected project start dates for display
getSelectedProjectStartDate(): string | null {
  const selectedStartDates = this.selectedFilters['projectStartDate'];
  if (selectedStartDates && selectedStartDates.length > 0) {
    return selectedStartDates.length > 1
      ? selectedStartDates.join(', ') // Join multiple selected dates
      : selectedStartDates[0]; // Display single selected date
  }
  return null; // No selection
}
hasSelectedProjectEndDate(): boolean {
  return this.getSelectedProjectEndDate() !== '';
}
// Method to get selected project end dates for display
getSelectedProjectEndDate(): string | null {
  const selectedEndDates = this.selectedFilters['projectEndDate'];
  if (selectedEndDates && selectedEndDates.length > 0) {
    return selectedEndDates.length > 1
      ? selectedEndDates.join(', ') // Join multiple selected dates
      : selectedEndDates[0]; // Display single selected date
  }
  return null; // No selection
}
hasSelectedProjectManager(): boolean {
  return this.getSelectedProjectManager() !== '';
}
// Method to get selected project managers for display
getSelectedProjectManager(): string | null {
  const selectedManagers = this.selectedFilters['projectManager'];
  if (selectedManagers && selectedManagers.length > 0) {
    return selectedManagers.length > 1
      ? selectedManagers.join(', ') // Join multiple selected managers
      : selectedManagers[0]; // Display single selected manager
  }
  return null; // No selection
}
hasSelectedSQA(): boolean {
  return this.getSelectedSQA() !== '';
}
// Method to get selected SQA for display
getSelectedSQA(): string | null {
  const selectedSQAs = this.selectedFilters['sqa'];
  if (selectedSQAs && selectedSQAs.length > 0) {
    return selectedSQAs.length > 1
      ? selectedSQAs.join(', ') // Join multiple selected SQAs
      : selectedSQAs[0]; // Display single selected SQA
  }
  return null; // No selection
}

hasSelectedProjectType(): boolean {
  return this.getSelectedProjectType() !== '';
}
// Method to get selected Project Type for display
getSelectedProjectType(): string | null {
  const selectedProjectTypes = this.selectedFilters['projectType'];
  if (selectedProjectTypes && selectedProjectTypes.length > 0) {
    return selectedProjectTypes.length > 1
      ? selectedProjectTypes.join(', ') // Join multiple selected project types
      : selectedProjectTypes[0]; // Display single selected project type
  }
  return null; // No selection
}

hasSelectedDomain(): boolean {
  return this.getSelectedDomain() !== '';
}
// Method to get selected Domain for display
getSelectedDomain(): string | null {
  const selectedDomains = this.selectedFilters['domain'];
  if (selectedDomains && selectedDomains.length > 0) {
    return selectedDomains.length > 1
      ? selectedDomains.join(', ') // Join multiple selected domains
      : selectedDomains[0]; // Display single selected domain
  }
  return null; // No selection
}
hasSelectedDatabaseUsed(): boolean {
  return this.getSelectedDatabaseUsed() !== '';
}
// Method to get selected Database Used for display
getSelectedDatabaseUsed(): string | null {
  const selectedDatabasesUsed = this.selectedFilters['databaseUsed'];
  if (selectedDatabasesUsed && selectedDatabasesUsed.length > 0) {
    return selectedDatabasesUsed.length > 1
      ? selectedDatabasesUsed.join(', ') // Join multiple selected databases
      : selectedDatabasesUsed[0]; // Display single selected database
  }
  return null; // No selection
}
hasSelectedCloudUsed(): boolean {
  return this.getSelectedCloudUsed() !== '';
}
// Method to get selected Cloud Used for display
getSelectedCloudUsed(): string | null {
  const selectedCloudsUsed = this.selectedFilters['cloudUsed'];
  if (selectedCloudsUsed && selectedCloudsUsed.length > 0) {
    return selectedCloudsUsed.length > 1
      ? selectedCloudsUsed.join(', ') // Join multiple selected cloud options
      : selectedCloudsUsed[0]; // Display single selected cloud option
  }
  return null; // No selection
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

      this.onApplyFilters();
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
