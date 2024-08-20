import { CommonModule } from '@angular/common';
import { Component, ElementRef, HostListener, OnInit, Renderer2 } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface EditableProject {
  [key: string]: string | number | Date | undefined;
  sqa?: string;
  forecastedEndDate?: Date;
  vocEligibilityDate?: Date;
  projectType?: string;
  domain?: string;
  databaseUsed?: string;
  cloudUsed?: string;
  feedbackStatus?: string;
}

interface Project {
  projectCode: string;
  projectName: string;
  du: string;
  js: string;
  deliveryHead: string;
  startDate: Date;
  endDate: Date;
  contractType: string;
  numberOfResources: number;
  region: string;
  projectType: string;
  technology: string;
  status: string;
  sqa: string;  // New column
  forecastedEndDate: Date;  // New column
  vocEligibilityDate: Date;  // New column
  domain: string;  // New column
  databaseUsed: string;  // New column
  cloudUsed: string;  // New column
  feedbackStatus: string;  // New column
}

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})

export class TableComponent implements OnInit {

  searchQuery: any;
  totalPages: any;
  currentPage: any;
  dropdownVisible: boolean = false;
  selectedColumns: { field: keyof Project; header: string }[] = [];
 
  
  isModalOpen = false;
  editableProject: Partial<Project> = {};
  projects: Project[] = [
    {
      projectCode: 'DU6-254-SBP',
      projectName: 'Salesboost - Development',
      du: 'DU6',
      js: 'Jayan M S',
      deliveryHead: 'Jayan M S',
      startDate: new Date('2017-11-13'),
      endDate: new Date('2025-03-31'),
      contractType: 'T&M',
      numberOfResources: 7,
      region: 'US',
      projectType: 'Development',
      technology: '.NET',
      status: 'Active',
      sqa: 'John Doe',
      forecastedEndDate: new Date('2025-03-01'),
      vocEligibilityDate: new Date('2024-08-01'),
      domain: 'Finance',
      databaseUsed: 'SQL Server',
      cloudUsed: 'Azure',
      feedbackStatus: 'Received',
    },
    {
      projectCode: 'DU6-140-MPH',
      projectName: 'MapHabit',
      du: 'DU6',
      js: 'Jayan M S',
      deliveryHead: 'Jayan M S',
      startDate: new Date('2019-01-14'),
      endDate: new Date('2024-09-30'),
      contractType: 'T&M',
      numberOfResources: 3,
      region: 'US',
      projectType: 'Development',
      technology: 'React JS',
      status: 'Active',
      sqa: 'Jane Smith',
      forecastedEndDate: new Date('2024-09-15'),
      vocEligibilityDate: new Date('2024-07-15'),
      domain: 'Healthcare',
      databaseUsed: 'MySQL',
      cloudUsed: 'AWS',
      feedbackStatus: 'Pending',
    },
    {
      projectCode: 'DU6-286-DAR',
      projectName: 'Neighbors',
      du: 'DU6',
      js: 'Jayan M S',
      deliveryHead: 'Jayan M S',
      startDate: new Date('2018-06-18'),
      endDate: new Date('2025-03-31'),
      contractType: 'T&M',
      numberOfResources: 17,
      region: 'US',
      projectType: 'Development',
      technology: '.NET',
      status: 'Inactive',
      sqa: 'Michael Brown',
      forecastedEndDate: new Date('2025-03-01'),
      vocEligibilityDate: new Date('2024-08-01'),
      domain: 'Real Estate',
      databaseUsed: 'PostgreSQL',
      cloudUsed: 'GCP',
      feedbackStatus: 'Received',
    },
    {
      projectCode: 'DU6-284-PRT',
      projectName: 'Proteus 2',
      du: 'DU6',
      js: 'Jayan M S',
      deliveryHead: 'Jayan M S',
      startDate: new Date('2018-07-09'),
      endDate: new Date('2025-03-31'),
      contractType: 'T&M',
      numberOfResources: 22,
      region: 'US',
      projectType: 'Development',
      technology: '.NET',
      status: 'Active',
      sqa: 'Alice Johnson',
      forecastedEndDate: new Date('2025-03-01'),
      vocEligibilityDate: new Date('2024-08-01'),
      domain: 'E-commerce',
      databaseUsed: 'Oracle',
      cloudUsed: 'Azure',
      feedbackStatus: 'Pending',
    },
    {
      projectCode: 'DU6-254-SBP',
      projectName: 'Salesboost - Development',
      du: 'DU6',
      js: 'Jayan M S',
      deliveryHead: 'Jayan M S',
      startDate: new Date('2017-11-13'),
      endDate: new Date('2025-03-31'),
      contractType: 'T&M',
      numberOfResources: 7,
      region: 'US',
      projectType: 'Development',
      technology: '.NET',
      status: 'Active',
      sqa: 'John Doe',
      forecastedEndDate: new Date('2025-03-01'),
      vocEligibilityDate: new Date('2024-08-01'),
      domain: 'Finance',
      databaseUsed: 'SQL Server',
      cloudUsed: 'Azure',
      feedbackStatus: 'Received',
    },
    {
      projectCode: 'DU6-140-MPH',
      projectName: 'MapHabit',
      du: 'DU6',
      js: 'Jayan M S',
      deliveryHead: 'Jayan M S',
      startDate: new Date('2019-01-14'),
      endDate: new Date('2024-09-30'),
      contractType: 'T&M',
      numberOfResources: 3,
      region: 'US',
      projectType: 'Development',
      technology: 'React JS',
      status: 'Active',
      sqa: 'Jane Smith',
      forecastedEndDate: new Date('2024-09-15'),
      vocEligibilityDate: new Date('2024-07-15'),
      domain: 'Healthcare',
      databaseUsed: 'MySQL',
      cloudUsed: 'AWS',
      feedbackStatus: 'Pending',
    },
    {
      projectCode: 'DU6-286-DAR',
      projectName: 'Neighbors',
      du: 'DU6',
      js: 'Jayan M S',
      deliveryHead: 'Jayan M S',
      startDate: new Date('2018-06-18'),
      endDate: new Date('2025-03-31'),
      contractType: 'T&M',
      numberOfResources: 17,
      region: 'US',
      projectType: 'Development',
      technology: '.NET',
      status: 'Inactive',
      sqa: 'Michael Brown',
      forecastedEndDate: new Date('2025-03-01'),
      vocEligibilityDate: new Date('2024-08-01'),
      domain: 'Real Estate',
      databaseUsed: 'PostgreSQL',
      cloudUsed: 'GCP',
      feedbackStatus: 'Received',
    },
    {
      projectCode: 'DU6-284-PRT',
      projectName: 'Proteus 2',
      du: 'DU6',
      js: 'Jayan M S',
      deliveryHead: 'Jayan M S',
      startDate: new Date('2018-07-09'),
      endDate: new Date('2025-03-31'),
      contractType: 'T&M',
      numberOfResources: 22,
      region: 'US',
      projectType: 'Development',
      technology: '.NET',
      status: 'Active',
      sqa: 'Alice Johnson',
      forecastedEndDate: new Date('2025-03-01'),
      vocEligibilityDate: new Date('2024-08-01'),
      domain: 'E-commerce',
      databaseUsed: 'Oracle',
      cloudUsed: 'Azure',
      feedbackStatus: 'Pending',
    },
    {
      projectCode: 'DU6-286-DAR',
      projectName: 'Neighbors',
      du: 'DU6',
      js: 'Jayan M S',
      deliveryHead: 'Jayan M S',
      startDate: new Date('2018-06-18'),
      endDate: new Date('2025-03-31'),
      contractType: 'T&M',
      numberOfResources: 17,
      region: 'US',
      projectType: 'Development',
      technology: '.NET',
      status: 'Inactive',
      sqa: 'Michael Brown',
      forecastedEndDate: new Date('2025-03-01'),
      vocEligibilityDate: new Date('2024-08-01'),
      domain: 'Real Estate',
      databaseUsed: 'PostgreSQL',
      cloudUsed: 'GCP',
      feedbackStatus: 'Received',
    },
    {
      projectCode: 'DU6-284-PRT',
      projectName: 'Proteus 2',
      du: 'DU6',
      js: 'Jayan M S',
      deliveryHead: 'Jayan M S',
      startDate: new Date('2018-07-09'),
      endDate: new Date('2025-03-31'),
      contractType: 'T&M',
      numberOfResources: 22,
      region: 'US',
      projectType: 'Development',
      technology: '.NET',
      status: 'Active',
      sqa: 'Alice Johnson',
      forecastedEndDate: new Date('2025-03-01'),
      vocEligibilityDate: new Date('2024-08-01'),
      domain: 'E-commerce',
      databaseUsed: 'Oracle',
      cloudUsed: 'Azure',
      feedbackStatus: 'Pending',
    },
  ];
 
  allColumns: { field: keyof Project; header: string }[] = [
    { field: 'du', header: 'DU' },
    { field: 'deliveryHead', header: 'Delivery Head' },
    { field: 'startDate', header: 'Start Date' },
    { field: 'endDate', header: 'End Date' },
    { field: 'contractType', header: 'Contract Type' },
    { field: 'numberOfResources', header: 'Number of Resources' },
    { field: 'region', header: 'Region' },
    { field: 'projectType', header: 'Project Type' },
    { field: 'technology', header: 'Technology' },
    { field: 'status', header: 'Status' },
    { field: 'sqa', header: 'SQA' },  // New column
    { field: 'forecastedEndDate', header: 'Forecasted End Date' },  // New column
    { field: 'vocEligibilityDate', header: 'VOC Eligibility Date' },  // New column
    { field: 'domain', header: 'Domain' },  // New column
    { field: 'databaseUsed', header: 'Database Used' },  // New column
    { field: 'cloudUsed', header: 'Cloud Used' },  // New column
    { field: 'feedbackStatus', header: 'Feedback Status' },  // New column
  ];
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
  

  constructor(private eRef: ElementRef, private renderer: Renderer2) {}

  ngOnInit(): void {}

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

  onCheckboxChange(event: Event, column: { field: keyof Project; header: string }) {
    const checkbox = event.target as HTMLInputElement;
    if (checkbox.checked) {
      this.selectedColumns.push(column);
    } else {
      this.selectedColumns = this.selectedColumns.filter(
        (selectedColumn) => selectedColumn.field !== column.field
      );
    }
  }

  isSelected(column: { field: keyof Project; header: string }): boolean {
    return this.selectedColumns.some((selectedColumn) => selectedColumn.field === column.field);
  }

  removeSelection(column: { field: keyof Project; header: string }) {
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
  openModal(project: Project) {
    this.editableProject = { ...project };
    this.isModalOpen = true;
  }
  getEditableProjectField(field: string): any {
    return this.editableProject[field as keyof Project];
  }
  
  setEditableProjectField(field: string, value: any): void {
    this.editableProject[field as keyof Project] = value;
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

