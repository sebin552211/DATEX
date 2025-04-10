import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { DashboardTableService } from '../../../service/dashboard-table.service';
import { DashboardFilterService } from '../../../service/dashboard-filter-service.service';
import { DuModalComponent } from "../du-modal/du-modal.component";

@Component({
  selector: 'app-analysis-filter',
  standalone: true,
  imports: [CommonModule, FormsModule, DuModalComponent],
  templateUrl: './analysis-filter.component.html',
  styleUrl: './analysis-filter.component.css'
})

export class AnalysisFilterComponent implements OnInit {

  isModalOpen = false;
  
  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<void>();

  private filterSelectionSubscription: Subscription | undefined;
  private filterSelectionSubject = new Subject<{ filterKey: string; value: string }>();
  financialQuarters: string[] = ['Q1 (2021-2022)', 'Q2 (2021-2022)', 'Q3 (2021-2022)', 'Q4 (2021-2022)', 
                                 'Q1 (2022-2023)', 'Q2 (2022-2023)', 'Q3 (2022-2023)', 'Q4 (2022-2023)',
                                 'Q1 (2023-2024)', 'Q2 (2023-2024)', 'Q3 (2023-2024)', 'Q4 (2023-2024)',
                                 'Q1 (2024-2025)', 'Q2 (2024-2025)', 'Q3 (2024-2025)', 'Q4 (2024-2025)'];

  selectedFilters : { [key: string]: string[] } = {};
  dropdownVisible: { [key: string]: boolean } = {};
  SurveyIds: string[] | undefined;
  SurveyID: string | null = null;

  DUs: string[] | undefined;
  DU: string | null = null;
  
  Quarters: string[] | undefined;
  Quarter: string | null = null;

  private projectData: any[] = [];

  constructor(private http: HttpClient, 
              private dashboardTableService: DashboardTableService ,
              private dashboardFilterService: DashboardFilterService) {}

  ngOnInit() {
    this.dashboardTableService.getProject2().subscribe((projects) => {
      this.SurveyIds = projects;
    });

    this.dashboardTableService.getallDUs().subscribe((du)=>{
      this.DUs = du;      
    });

    Object.keys(this.selectedFilters).forEach(key => {
      this.dropdownVisible[key] = false;
    });

    this.filterSelectionSubscription = this.dashboardFilterService.filterSelections$.subscribe(
      ({ filterKey, value }) => {
        this.selectFilterOption(filterKey, value);
        // this.applyFilters();
      }
    );
  }

  ngOnDestroy(): void {
    if (this.filterSelectionSubscription) {
      this.filterSelectionSubscription.unsubscribe();
    }
  }
  
  onApplyFilters() {
    const params: any = {};
    const filterSelection$ = this.filterSelectionSubject.asObservable();
  
    Object.keys(this.selectedFilters).forEach(key => {
      if (this.selectedFilters[key].length > 0) {
          params[key] = this.selectedFilters[key].join(',');
      }
    });
  
    this.dashboardTableService.getProject2().subscribe(response => {
      this.projectData = response;
    }); 
  }

  selectFilterOption(filterKey: string, value: string): void {
    if (!this.selectedFilters[filterKey]) {
      this.selectedFilters[filterKey] = [];
    }
    if (!this.selectedFilters[filterKey].includes(value)) {
      this.selectedFilters[filterKey].push(value);
    }
    if (filterKey === 'SurveyId' || filterKey === 'DU' || filterKey === 'financialQuarter') {
      this.updateSurveyIdandDU();
    }

  }
  
  getDistinctValues(projects: any[], key: string): string[] {
    return [...new Set(projects.map(project => project[key]))];
  }

  updateSurveyIdandDU(): void {
    const surveyId = this.getSelectedSurveyId();
    const DU = this.getSelectedDU();
    const Quater = this.getSelectedQuarter();
    this.dashboardFilterService.updateVOCAnalysis(DU, surveyId, Quater);
  }
  
  toggleDropdown(filterKey: string): void {
    this.dropdownVisible[filterKey] = !this.dropdownVisible[filterKey];
  }

  getSelectedQuarter(): string | null {
    const selectedQuarters = this.selectedFilters['Quarters'];
    if (selectedQuarters && selectedQuarters.length > 0) {
      return selectedQuarters.length > 1 ? selectedQuarters.join(', ') : selectedQuarters[0];
    }
    return null;
  }

  getSelectedSurveyId(): string | null {
    const selectedSurveyId = this.selectedFilters['SurveyIds'];
    if (selectedSurveyId && selectedSurveyId.length > 0) {
  
      return selectedSurveyId.length > 1
        ? selectedSurveyId.join(', ') 
        : selectedSurveyId[0]; 
    }
    return null; 
  }
  
  getSelectedDU(): string | null {
    const selectedDus = this.selectedFilters['DUs'];
    if (selectedDus && selectedDus.length > 0) {
      return selectedDus.length > 1
        ? selectedDus.join(', ') 
        : selectedDus[0]; 
    }
    return null; 
  }

  onFilterChange(event: Event, filterKey: string): void {
  const checkbox = event.target as HTMLInputElement;
  const value = checkbox.value;

  if (!this.selectedFilters[filterKey]) {
    this.selectedFilters[filterKey] = [];
  }

  if (checkbox.checked) {
    // Add the value to the selected filters
    this.selectedFilters[filterKey].push(value);
    this.dropdownVisible = {};
  } else {
    // Remove the value from the selected filters
    this.selectedFilters[filterKey] = this.selectedFilters[filterKey].filter(
      (v) => v !== value
    );
  }
  
  // Update SurveyId and DU values if necessary
  if (filterKey === 'SurveyIds' || filterKey === 'DUs' || filterKey === 'Quarters') {
    const surveyId = this.getSelectedSurveyId();
    const DU = this.getSelectedDU();
    const Quater = this.getSelectedQuarter();
    this.dashboardFilterService.updateVOCAnalysis(DU, surveyId, Quater);
  }
}

  isSelectedFilter(filterKey: string, value: string): boolean {
    return this.selectedFilters[filterKey]?.includes(value) ?? false;
  }

  resetFilters(): void {
    this.selectedFilters = {}; // Reset selected filters
    this.dashboardTableService.getProject2().subscribe((projects) => {
    });
    this.dashboardFilterService.updateVOCAnalysis(null,null, null);
  }

  openEditModal(): void {
    this.isModalOpen = true;
  }

  closeModal(): void {
    this.isModalOpen = false;
  }

}

