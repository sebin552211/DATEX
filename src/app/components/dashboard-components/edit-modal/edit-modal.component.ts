import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';



interface EditableProject {
  [key: string]: string | number | Date | undefined;
  sqa?: string;
  forecastedEndDate?: Date;
 
  projectType?: string;
  domain?: string;
  databaseUsed?: string;
  cloudUsed?: string;
 
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
  selector: 'app-edit-modal',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './edit-modal.component.html',
  styleUrl: './edit-modal.component.css'
})
export class EditModalComponent {

  @Input() isModalOpen = false;
  @Input() editableProject: Partial<Project> = {};
  
  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<void>();
 
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
  ];
  editableColumns = [
    { field: 'sqa', header: 'SQA' },
    { field: 'projectType', header: 'Project Type' },
    { field: 'domain', header: 'Domain' },
    { field: 'databaseUsed', header: 'Database Used' },
    { field: 'cloudUsed', header: 'Cloud Used' },
    { field: 'forecastedEndDate', header: 'Forecasted End Date' },
   
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
