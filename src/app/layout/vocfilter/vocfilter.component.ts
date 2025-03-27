import { NgFor, NgIf } from '@angular/common';
import { Component, Injectable, OnInit } from '@angular/core';
import { DashboardTableService } from '../../service/dashboard-table.service';
import { DashboardFilterService } from '../../service/dashboard-filter-service.service';
import { SharedDataService } from '../../service/shared-data.service';
import { HttpClient } from '@angular/common/http';
import { Subject, Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})

@Component({
  selector: 'app-vocfilter',
  standalone: true,
  imports: [NgFor, NgIf, CommonModule, FormsModule],
  templateUrl: './vocfilter.component.html',
  styleUrl: './vocfilter.component.css'
})
export class VOCFilterComponent implements OnInit{

  private filterSelectionSubscription: Subscription | undefined;
  private filterSelectionSubject = new Subject<{ filterKey: string; value: string }>();
  
  financialQuarters: string[] = ['Q1 (2021-2022)', 'Q2 (2021-2022)', 'Q3 (2021-2022)', 'Q4 (2021-2022)', 
                                 'Q1 (2022-2023)', 'Q2 (2022-2023)', 'Q3 (2022-2023)', 'Q4 (2022-2023)',
                                 'Q1 (2023-2024)', 'Q2 (2023-2024)', 'Q3 (2023-2024)', 'Q4 (2023-2024)',
                                 'Q1 (2024-2025)', 'Q2 (2024-2025)', 'Q3 (2024-2025)', 'Q4 (2024-2025)'];
  // financialQuarters: string[] = ['Q1', 'Q2', 'Q3', 'Q4'];
  financialYears: string[] = ['2021-2022', '2022-2023', '2023-2024', '2024-2025', '2025-2026', '2026-2027', '2027-2028']
  // financialYears: string[] = ['2021-2022', '2022-2023', '2023-2024', '2024-2025', '2025-2026', '2026-2027', '2027-2028']
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
    if (!this.selectedFilters[filterKey].includes(value))
       {
      this.selectedFilters[filterKey].push(value);
    }
  }

  toggleDropdown(filterKey: string): void {
    this.dropdownVisible[filterKey] = !this.dropdownVisible[filterKey];
  }

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
  private projectData: any[] = [];

  vocEligibilityDate:string[] = [];

  getSelectedQuarter(): string | null {
    const selectedQuarters = this.selectedFilters['financialQuarter'];
    if (selectedQuarters && selectedQuarters.length > 0) {
      return selectedQuarters.length > 1 ? selectedQuarters.join(', ') : selectedQuarters[0];
    }
    return null;
  }

  getSelectedYear(): string | null {
    const selectedYears = this.selectedFilters['financialYear'];
    if (selectedYears && selectedYears.length > 0) {
      return selectedYears.length > 1 ? selectedYears.join(', ') : selectedYears[0];
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
  }

  applyFilters(): void {
    const selectedQuarter = this.getSelectedQuarter();
    const selectedYear = this.getSelectedYear();
    const params: any = {};
    if (selectedQuarter && selectedYear) {
      this.http.get<any[]>(`https://localhost:7259/api/Project/GetProjectsByFinancialQuarter`, {
        params: { financialYear: selectedYear, quarter: this.convertQuarterToNumber(selectedQuarter) }
      }).subscribe(response => {
        this.projectData = response;
        this.updateFilterOptions(this.projectData);
        this.sharedataservice.updateProjects(this.projectData);
        console.log("ewrdfgdfgb: "+JSON.stringify(this.projectData));
      });
    }
    else if (selectedYear) {
      this.http.get<any[]>(`https://localhost:7259/api/Project/GetProjectsByFinancialYear`, {
        params: { financialYear: selectedYear }
      }).subscribe(response => {
        this.projectData = response;
        this.updateFilterOptions(this.projectData);
        this.sharedataservice.updateProjects(this.projectData);
        console.log("argsfgdf: "+JSON.stringify(this.projectData));
      });
    }
    else {
      this.onApplyFilters(); 
    }
  }   
  convertQuarterToNumber(quarter: string): number {
    switch (quarter) {
      case 'Q1': return 1;
      case 'Q2': return 2;
      case 'Q3': return 3;
      case 'Q4': return 4;
      default: throw new Error("Invalid quarter");
    }
  }
  updateFilterOptions(projects: any[]): void {
    const getNonNullDistinctValues = (projects: any[], key: string): string[] => {
      return [...new Set(projects.map(project => project[key]).filter(value => value !== null && value !== ''))];
    };
   
    this.vocEligibilityDate = getNonNullDistinctValues(projects, 'vocEligibilityDate');
    this.dropdownVisible = {};    
  }

  isSelectedFilter(filterKey: string, value: string): boolean {
    return this.selectedFilters[filterKey] && this.selectedFilters[filterKey].includes(value);
  }
  
}
