import { CommonModule } from '@angular/common';
import { ExcelRow } from './../../../interface/excel-row';
import { Component, ElementRef, EventEmitter, HostListener, Input, OnInit, Output, Renderer2 } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EditModalComponent } from '../edit-modal/edit-modal.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { DashboardTableService } from '../../../service/dashboard-table.service';
import { ExcelService } from '../../../service/excel.service';
import { DashboardTable } from '../../../interface/dashboard-table';
import { ExcelTableComponent } from '../../dashboard-components/excel-table/excel-table.component';





@Component({
  selector: 'app-table',
  standalone: true,
  imports: [FormsModule, CommonModule, EditModalComponent,ExcelTableComponent,HttpClientModule],
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})

export class TableComponent implements OnInit {

  @Input() isModalOpen = false;
  // @Input() editableProject: Partial<DashboardTable> = {};

  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<void>();
  searchQuery: string = '';
  totalPages: number = 0;
  currentPage: number = 1;
  dropdownVisible: boolean = false;
  selectedColumns: { field: keyof DashboardTable; header: string }[] = [];
  editableProject: Partial<DashboardTable> = {};
  projects: DashboardTable[] = [];
  selectedFile: File | null = null;
  pageNumber: number = 1;
  pageSize: number = 7;
  totalProjects: number = 0;
  excelData: any[] = [];

  allColumns: { field: keyof DashboardTable; header: string }[] = [
    { field: 'du', header: 'DU' },
    { field: 'duHead', header: 'DU Head' },
    { field: 'projectManager', header: 'Project Manager' },
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
    { field: 'vocEligibilityDate', header: 'VOC Eligibility Date' },
    { field: 'domain', header: 'Domain' },
    { field: 'databaseUsed', header: 'Database Used' },
    { field: 'cloudUsed', header: 'Cloud Used' },
    { field: 'mailStatus', header: 'Mail Status' },
    { field: 'feedbackStatus', header: 'Feedback Status' },
   
   

  ];

  constructor(private eRef: ElementRef, private renderer: Renderer2,    private dashboardTableService: DashboardTableService,
    private excelService: ExcelService,
    private http: HttpClient) {}

    showExcelTable: boolean = false; 

    openExcelModal(excelData: ExcelRow[]): void {
      this.excelData = excelData;
      this.showExcelTable = true;
    }


  ngOnInit(): void {
    this.selectedColumns = this.allColumns.filter(col =>
      ['vocEligibilityDate', 'projectManager','mailStatus','feedbackStatus'].includes(col.field)
    );
    this.loadProjects();
    this.loadPagedProjects();
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

  loadProjects(): void {
    this.dashboardTableService.getProjects().subscribe((data: DashboardTable[]) => {
      this.projects = data;
      console.log(data);
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
  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.selectedFile = input.files ? input.files[0] : null;
  }
  onSearch() {
    const trimmedQuery = this.searchQuery.trim().toLowerCase();

    if (trimmedQuery) {
      // Fetch projects based on the search query
      this.dashboardTableService
        .getProjectsName(trimmedQuery)
        .subscribe((data: DashboardTable[]) => {
          this.projects = data;
          console.log(data);
        });
    } else {
      // If the search box is empty, fetch all projects
      this.loadProjects();
    }
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const targetElement = event.target as HTMLElement;
    const isClickInside = targetElement.closest('.dropdown');

    if (!isClickInside) {
      this.dropdownVisible = false;
    }
  }

  toggleDropdown() {
    this.dropdownVisible = !this.dropdownVisible;
  }

  onCheckboxChange(event: Event, column: { field: keyof DashboardTable; header: string }) {
    const checkbox = event.target as HTMLInputElement;
    if (checkbox.checked) {
      this.selectedColumns.push(column);
    } else {
      this.selectedColumns = this.selectedColumns.filter(
        (selectedColumn) => selectedColumn.field !== column.field
      );
    }
  }

  isSelected(column: { field: keyof DashboardTable; header: string }): boolean {
    return this.selectedColumns.some((selectedColumn) => selectedColumn.field === column.field);
  }

  removeSelection(column: { field: keyof DashboardTable; header: string }) {
    this.selectedColumns = this.selectedColumns.filter(
      (selectedColumn) => selectedColumn.field !== column.field
    );
  }

 

 
  editableColumns = [
    { field: 'feedbackStatus', header: 'Feedback Status', type: 'select', options: ['Received', 'Pending'] },
    { field: 'vocEligibilityDate', header: 'VOC Eligibility Date' },
  ];

  // getEditableProjectField(field: string): any {
  //   return this.editableProject[field as keyof DashboardTable];
  // }

  // setEditableProjectField(field: string, value: any): void {
  //   this.editableProject[field as keyof DashboardTable] = value;
  // }

  openEditModal(project: DashboardTable) {
    // Open the modal and pass the project to the EditModalComponent
    // For simplicity, let's assume you're using a service or a reference to open the modal
    this.isModalOpen = true;
    this.editableProject = { ...project }; // Copy project data to editableProject



  }
  closeModal() {
    this.isModalOpen = false;
    this.close.emit();
  }

  saveChanges(): void {
    console.log('Save changes called');
    // Implement the save logic here
    this.isModalOpen = false;
  }
}
