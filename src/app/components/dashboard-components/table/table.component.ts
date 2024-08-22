import { CommonModule } from '@angular/common';
import { Component, ElementRef, EventEmitter, HostListener, OnInit, Output, Renderer2 } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EditModalComponent } from "../edit-modal/edit-modal.component";
import { ExcelService } from '../../../service/excel.service';

// interface Project {
//   projectCode: string;
//   projectName: string;
//   du: string;
//   js: string;
//   deliveryHead: string;
//   startDate: Date;
//   endDate: Date;
//   contractType: string;
//   numberOfResources: number;
//   region: string;
//   projectType: string;
//   technology: string;
//   status: string;
//   sqa: string;  // New column
//   forecastedEndDate: Date;  // New column
//   vocEligibilityDate: Date;  // New column
//   domain: string;  // New column
//   databaseUsed: string;  // New column
//   cloudUsed: string;  // New column
//   feedbackStatus: string;  // New column
// }
import { DashboardTableService } from '../../../service/dashboard-table.service';
import { DashboardTable } from '../../../interface/dashboard-table';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [FormsModule, CommonModule, EditModalComponent,HttpClientModule],
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
})
export class TableComponent implements OnInit {

  searchQuery: any;
  totalPages: any;
  currentPage: any;
  dropdownVisible: boolean = false;
  selectedColumns: { field: keyof DashboardTable; header: string }[] = [];
  isModalOpen = false;
  editableProject: Partial<DashboardTable> = {};
  projects: DashboardTable[] = []; // Array to hold the projects data

  // Updated `allColumns` array to match the `DashboardTable` interface
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
    { field: 'vocEligibilityDate', header: 'VOC Eligibility Date' },
    { field: 'domain', header: 'Domain' },
    { field: 'databaseUsed', header: 'Database Used' },
    { field: 'cloudUsed', header: 'Cloud Used' },
    { field: 'feedbackStatus', header: 'Feedback Status' },
  ];

  // Updated `editableColumns` array to match the `DashboardTable` interface
  editableColumns = [
    { field: 'sqa', header: 'SQA' },
    { field: 'projectType', header: 'Project Type' },
    { field: 'domain', header: 'Domain' },
    { field: 'databaseUsed', header: 'Database Used' },
    { field: 'cloudUsed', header: 'Cloud Used' },
    { field: 'feedbackStatus', header: 'Feedback Status', type: 'select', options: ['Received', 'Pending'] },
    { field: 'forecastedEndDate', header: 'Forecasted End Date' },
    { field: 'vocEligibilityDate', header: 'VOC Eligibility Date' },
  ];
  selectedFile: File | null = null;
  constructor(
    private eRef: ElementRef,
    private renderer: Renderer2,
    private dashboardTableService: DashboardTableService, // Injecting the service
    private excelService: ExcelService, private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.loadProjects(); // Load projects on component initialization
  }

  loadProjects() {
    this.dashboardTableService.getProjects().subscribe((data: DashboardTable[]) => {
      this.projects = data;
      console.log(data);
    });
  }

  onFileChange(event: any) {
    this.selectedFile = event.target.files[0];
  }

  importExcel() {
    if (this.selectedFile) {
      this.excelService.readExcel(this.selectedFile).then((data) => {
        console.log(data);
        this.http.post('API_ENDPOINT_URL', data).subscribe({
          next: (response) => {
            console.log('Data saved successfully', response);
          },
          error: (error) => {
            console.error('Error saving data', error);
          }
        });
      }).catch(error => {
        console.error('Error reading Excel file', error);
      });
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

  nextPage() {
    // Implement pagination logic here
  }

  previousPage() {
    // Implement pagination logic here
  }

  onExport() {
    // Implement export logic here
  }

  onSearch(event: Event) {
    // Implement search logic here
  }

  openModal(project: DashboardTable) {
    this.editableProject = { ...project };
    this.isModalOpen = true;
  }

  getEditableProjectField(field: string): any {
    return this.editableProject[field as keyof DashboardTable];
  }

  setEditableProjectField(field: string, value: any): void {
    this.editableProject[field as keyof DashboardTable] = value;
  }


  closeModal() {
    this.isModalOpen = false;
  }

  saveChanges() {
    // Update the project with the new values
    const projectIndex = this.projects.findIndex(
      (proj) => proj.projectCode === this.editableProject.projectCode
    );
    if (projectIndex !== -1) {
      this.projects[projectIndex] = { ...this.projects[projectIndex], ...this.editableProject };
    }
    this.closeModal();
  }
}
