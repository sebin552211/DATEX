import { CommonModule } from '@angular/common';
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
  @Input() editableProject: Partial<Project> = {};

  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<void>();

  projects: Project[] = [
    // Your existing project data
  ];

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

  closeModal() {
    this.isModalOpen = false;
    this.close.emit();
  }

  saveChanges() {
    // Update the project with the new values
    this.isModalOpen = false;
    const projectIndex = this.projects.findIndex(
      (proj) => proj.projectCode === this.editableProject.projectCode
    );
    if (projectIndex !== -1) {
      this.projects[projectIndex] = { ...this.projects[projectIndex], ...this.editableProject };
    }
    this.closeModal();
  }
}
