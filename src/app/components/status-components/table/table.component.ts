import { CommonModule } from '@angular/common';
import { Component, ElementRef, EventEmitter, HostListener, Input, OnInit, Output, Renderer2 } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EditModalComponent } from '../edit-modal/edit-modal.component';

 
interface Project {
  projectCode: string;
  projectName: string;
  deliveryUnit: string;
  deliveryHead: string;
  startDate: Date;
  endDate: Date;
  contractType: string;
  numberOfResources: number;
  region: string;
  projectType: string;
  mailStatus: string;
  feedbackStatus: string;
}
interface EditableProject {
  [key: string]: string | number | Date | undefined;
  feedbackStatus?: string;
  vocEligibilityDate?: Date;
}

 
@Component({
  selector: 'app-table',
  standalone: true,
  imports: [FormsModule, CommonModule, EditModalComponent],
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
 
export class TableComponent implements OnInit {
  @Input() isModalOpen = false;
  @Input() editableProject: Partial<Project> = {};

  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<void>();
  searchQuery: any;
  totalPages: any;
  currentPage: any;
  dropdownVisible: boolean = false;
  selectedColumns: { field: keyof Project; header: string }[] = [];
 
  projects: Project[] = [
    {
      projectCode: 'DU6-254-SBP',
      projectName: 'Salesboost - Development',
      deliveryUnit: 'DU6',
      deliveryHead: 'Jayan M S',
      startDate: new Date('2017-11-13'),
      endDate: new Date('2025-03-31'),
      contractType: 'T&M',
      numberOfResources: 7,
      region: 'US',
      projectType: 'Development',
      mailStatus: 'Mail Initiated',
      feedbackStatus: 'Pending',
    },
    {
      projectCode: 'DU6-140-MPH',
      projectName: 'MapHabit',
      deliveryUnit: 'DU6',
      deliveryHead: 'Jayan M S',
      startDate: new Date('2019-01-14'),
      endDate: new Date('2024-09-30'),
      contractType: 'T&M',
      numberOfResources: 3,
      region: 'US',
      projectType: 'Development',
      mailStatus: 'Mail Initiated',
      feedbackStatus: 'Pending',
    },
    {
      projectCode: 'DU6-286-DAR',
      projectName: 'Neighbors',
      deliveryUnit: 'DU6',
      deliveryHead: 'Jayan M S',
      startDate: new Date('2018-06-18'),
      endDate: new Date('2025-03-31'),
      contractType: 'T&M',
      numberOfResources: 17,
      region: 'US',
      projectType: 'Development',
      mailStatus: 'Moll Initiated',
      feedbackStatus: 'Received',
    },
    {
      projectCode: 'DU6-284-PRT',
      projectName: 'Proteus 2',
      deliveryUnit: 'DU6',
      deliveryHead: 'Jayan M S',
      startDate: new Date('2018-07-09'),
      endDate: new Date('2025-03-31'),
      contractType: 'T&M',
      numberOfResources: 22,
      region: 'US',
      projectType: 'Development',
      mailStatus: 'Mall Initiated',
      feedbackStatus: 'Pending',
    },
    {
      projectCode: 'DU6-286-DAR',
      projectName: 'Neighbors',
      deliveryUnit: 'DU6',
      deliveryHead: 'Jayan M S',
      startDate: new Date('2018-06-18'),
      endDate: new Date('2025-03-31'),
      contractType: 'T&M',
      numberOfResources: 17,
      region: 'US',
      projectType: 'Development',
      mailStatus: 'Moll Initiated',
      feedbackStatus: 'Received',
    },
    {
      projectCode: 'DU6-284-PRT',
      projectName: 'Proteus 2',
      deliveryUnit: 'DU6',
      deliveryHead: 'Jayan M S',
      startDate: new Date('2018-07-09'),
      endDate: new Date('2025-03-31'),
      contractType: 'T&M',
      numberOfResources: 22,
      region: 'US',
      projectType: 'Development',
      mailStatus: 'Mall Initiated',
      feedbackStatus: 'Pending',
    },
  ];
 
  allColumns: { field: keyof Project; header: string }[] = [
    { field: 'deliveryUnit', header: 'Delivery Unit' },
    { field: 'deliveryHead', header: 'Delivery Head' },
    { field: 'startDate', header: 'Start Date' },
    { field: 'endDate', header: 'End Date' },
    { field: 'contractType', header: 'Contract Type' },
    { field: 'numberOfResources', header: 'Number of Resources' },
    { field: 'region', header: 'Region' },
    { field: 'projectType', header: 'Project Type' },
    { field: 'mailStatus', header: 'Mail Status' },
    { field: 'feedbackStatus', header: 'Feedback Status' },
 
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
  editableColumns = [
    { field: 'feedbackStatus', header: 'Feedback Status', type: 'select', options: ['Received', 'Pending'] },
    { field: 'vocEligibilityDate', header: 'VOC Eligibility Date' },
  ];

  getEditableProjectField(field: string): any {
    return this.editableProject[field as keyof Project];
  }

  setEditableProjectField(field: string, value: any): void {
    this.editableProject[field as keyof Project] = value;
  }

  openEditModal(project: Project) {
    // Open the modal and pass the project to the EditModalComponent
    // For simplicity, let's assume you're using a service or a reference to open the modal
    this.isModalOpen = true;
    this.editableProject = { ...project }; // Copy project data to editableProject
   
    
  
  }
  closeModal() {
    this.isModalOpen = false;
    this.close.emit();
  }

  saveProject() {
   
    this.isModalOpen = false;
  }
}
