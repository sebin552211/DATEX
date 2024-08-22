import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DashboardTableService } from '../../../service/dashboard-table.service';
import { DashboardTable } from '../../../interface/dashboard-table';
import { HttpClient } from '@angular/common/http';




@Component({
  selector: 'app-edit-modal',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './edit-modal.component.html',
  styleUrl: './edit-modal.component.css'
})
export class EditModalComponent {

  @Input() isModalOpen = false;
  @Input() editableProject: Partial<DashboardTable> = {};
  
  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<void>();
 
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
    { field: 'forecastedEndDate', header: 'Forecasted End Date' },
   
  ]; 

  constructor(private http: HttpClient) {}
  getEditableProjectField(field: string): any {
    return this.editableProject[field as keyof DashboardTable];
  }
  
  setEditableProjectField(field: string, value: any): void {
    this.editableProject[field as keyof DashboardTable] = value;
  }
  

  closeModal() {
    this.isModalOpen = false;
    this.close.emit();
  }
  saveChanges() {
    // Make an HTTP PUT request to update the project in the backend
    this.http.put(`https://localhost:7259/api/Project/editable/${this.editableProject.projectId}`, this.editableProject)
      .subscribe(
        () => {
          // Handle success, e.g., close the modal, refresh the data, etc.
          this.isModalOpen = false;
          this.save.emit();
          this.closeModal();
        },
        error => {
          // Handle error, e.g., show an error message
          console.error('Failed to save changes:', error);
        }
      );

    }}
