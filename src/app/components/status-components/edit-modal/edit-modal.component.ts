import { DashboardTable } from './../../../interface/dashboard-table';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';


interface EditableProject {
  [key: string]: string | number | Date | undefined;
  feedbackStatus?: string;
  vocEligibilityDate?: Date;
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
  feedbackStatus: string;  // New column
  vocEligibilityDate: Date;  // New column
}

@Component({
  selector: 'app-edit-modal',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './edit-modal.component.html',
  styleUrl: './edit-modal.component.css'
})
export class EditModalComponent {

  @Input() isModalOpen = false;
  @Input() editableProject: Partial<DashboardTable> = {};

  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<void>();

  projects: Project[] = [
    // Your existing project data
  ];
  successMessage: string | null = null;
  errorMessage: string | null = null;

  editableColumns = [
    { field: 'feedbackStatus', header: 'Feedback Status', type: 'select', options: ['Received', 'Pending'] },
    { field: 'vocEligibilityDate', header: 'VOC Eligibility Date' },
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
    // Reset messages
    this.successMessage = null;
    this.errorMessage = null;
  
    // Make an HTTP PUT request to update the project in the backend
    this.http.put(`https://localhost:7259/api/Project/editable/${this.editableProject.projectId}`, this.editableProject)
      .subscribe(
        (updatedProject: any) => {
          // Handle success
          this.isModalOpen = false;
          this.save.emit();
          this.closeModal();
  
          // Update the local data model
          const index = this.projects.findIndex(p => p.projectCode === updatedProject.projectCode);
          if (index !== -1) {
            this.projects[index] = updatedProject;
          }
  
          // Set success message
          this.successMessage = 'Updated successfully';
  
          // Clear message after 5 seconds
          setTimeout(() => this.successMessage = null, 5000);
        },
        error => {
          // Handle error
          console.error('Failed to save changes:', error);
  
          // Set error message
          this.errorMessage = 'Unable to update';
  
          // Clear message after 5 seconds
          setTimeout(() => this.errorMessage = null, 5000);
        }
      );
  }
  
  
  
}

