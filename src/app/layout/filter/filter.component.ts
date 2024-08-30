import { Component, OnInit } from '@angular/core';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from '../navbar/navbar.component';
import { HttpClient } from '@angular/common/http';
import { Filter } from '../../interface/filter';
import { DashboardTableService } from '../../service/dashboard-table.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class FilterComponent implements OnInit {


  
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

  toggleDropdown(filterKey: string): void {
    this.dropdownVisible[filterKey] = !this.dropdownVisible[filterKey];
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
