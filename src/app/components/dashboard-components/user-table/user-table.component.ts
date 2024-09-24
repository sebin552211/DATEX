
import {
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  OnInit,
  Output,
  Renderer2,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EditModalComponent } from '../edit-modal/edit-modal.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { DashboardTableService } from '../../../service/dashboard-table.service';
import { ExcelService } from '../../../service/excel.service';
import { DashboardTable } from '../../../interface/dashboard-table';
import { CommonModule } from '@angular/common';
import { SharedDataService } from '../../../service/shared-data.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-user-table',
  standalone: true,
  imports: [FormsModule, CommonModule, EditModalComponent,  HttpClientModule],
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.css'],
})
export class UserTableComponent implements OnInit {


areAllColumnsSelected() {
throw new Error('Method not implemented.');
}
toggleSelectAll($event: Event) {
throw new Error('Method not implemented.');
}

  searchQuery: string = '';
  totalPages: number = 0;
  currentPage: number = 1;
  dropdownVisible: boolean = false;
  selectedColumns: { field: keyof DashboardTable; header: string }[] = [];
  isModalOpen: boolean = false;
  editableProject: Partial<DashboardTable> = {};
  projects: DashboardTable[] = [];
  selectedFile: File | null = null;

  pageNumber: number = 1;
  pageSize: number = 7;
  totalProjects: number = 0;

  allColumns: { field: keyof DashboardTable; header: string }[] = [
    { field: 'du', header: 'DU' },
    { field: 'duHead', header: 'DU Head' },
    { field: 'projectStartDate', header: 'Start Date' },
    { field: 'projectEndDate', header: 'End Date' },
    { field: 'contractType', header: 'Contract Type' },
    { field: 'numberOfResources', header: 'Number of Resources' },
    { field: 'region', header: 'Region' },
    { field: 'projectType', header: 'Project Type' },
    { field: 'technology', header: 'Technology' },
    { field: 'status', header: 'Status' },
    { field: 'sqa', header: 'SQA' },
    { field: 'forecastedEndDate', header: 'Forecasted End Date' },
    { field: 'customerName', header: 'CustomerName' },
    { field: 'domain', header: 'Domain' },
    { field: 'databaseUsed', header: 'Database Used' },
    { field: 'cloudUsed', header: 'Cloud Used' },
   
  ];
  private projectsSubscription: Subscription | undefined;

  // Updated `editableColumns` array to match the `DashboardTable` interface

  constructor(
    private eRef: ElementRef,
    private renderer: Renderer2,
    private dashboardTableService: DashboardTableService,
    private excelService: ExcelService,
    private http: HttpClient,
    private sharedDataService: SharedDataService
  ) {}


  ngOnInit(): void {

    
    this.selectedColumns = this.allColumns.filter(col =>
      ['du', 'duHead', 'status','customerName'].includes(col.field)
    );
    this.loadProjects(); // Load projects on component initialization
    this.loadPagedProjects();
       
    this.projectsSubscription = this.sharedDataService.projects$.subscribe(projects => {
      this.projects = projects;
    });
  }

  loadProjects() {
    this.dashboardTableService
      .getProjects()
      .subscribe((data: DashboardTable[]) => {
        this.projects = data;
      });
  }
  loadPagedProjects() {
    this.dashboardTableService
      .getProjectsPaged(this.pageNumber, this.pageSize)
      .subscribe((data: any) => {
        this.projects = data.projects;
        this.totalProjects = data.totalProjects;
        this.totalPages = Math.ceil(this.totalProjects / this.pageSize);
      });
  }
  changePage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.pageNumber = page;
      this.loadPagedProjects();
    }
  }
  get paginationArray(): number[] {
    const pagesToShow = 5; // Show 5 pages at a time
    const half = Math.floor(pagesToShow / 2);
    let start = Math.max(1, this.pageNumber - half);
    let end = Math.min(this.totalPages, start + pagesToShow - 1);

    if (end - start < pagesToShow) {
      start = Math.max(1, end - pagesToShow + 1);
    }

    return Array.from({ length: end - start + 1 }, (_, i) => i + start);
  }

  onSearch() {
    const trimmedQuery = this.searchQuery.trim().toLowerCase();

    if (trimmedQuery) {
      // Fetch projects based on the search query
      this.dashboardTableService
        .getProjectsName(trimmedQuery)
        .subscribe((data: DashboardTable[]) => {
          this.projects = data;
         
        });
    } else {
      // If the search box is empty, fetch all projects
      this.loadProjects();
    }
  }


  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    const targetElement = event.target as HTMLElement;
    const isClickInside = targetElement.closest('.dropdown');

    if (!isClickInside) {
      this.dropdownVisible = false;
    }
  }

  toggleDropdown(): void {
    this.dropdownVisible = !this.dropdownVisible;
  }

  onCheckboxChange(
    event: Event,
    column: { field: keyof DashboardTable; header: string }
  ) {
    const checkbox = event.target as HTMLInputElement;
    if (checkbox.checked) {
      this.selectedColumns.push(column);
    } else {
      this.selectedColumns = this.selectedColumns.filter(
        (col) => col.field !== column.field
      );
    }
  }

  isSelected(column: { field: keyof DashboardTable; header: string }): boolean {
    return this.selectedColumns.some(
      (selectedColumn) => selectedColumn.field === column.field
    );
  }

  removeSelection(column: { field: keyof DashboardTable; header: string }) {
    this.selectedColumns = this.selectedColumns.filter(
      (selectedColumn) => selectedColumn.field !== column.field
    );
  }


  isAllSelected(): boolean {
    return this.selectedColumns.length === this.allColumns.length;
  }
  
  onSelectAllChange(event: Event): void {
    const checkbox = event.target as HTMLInputElement;
    if (checkbox.checked) {
      this.selectedColumns = [...this.allColumns];
    } else {
      this.selectedColumns = [];
    }
  }
  
}
