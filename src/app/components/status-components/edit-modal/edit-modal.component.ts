import { DashboardTable } from './../../../interface/dashboard-table';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DashboardTableService } from '../../../service/dashboard-table.service';
import { concatMap, finalize, from } from 'rxjs';


interface EditableProject {
  [key: string]: string | number | Date | undefined;
  feedbackStatus?: string;
  vocEligibilityDate?: string;
  vocFeedbackReceivedDate?: Date;
  vocRemarks? : string;
  mailStatus? : string;
  pmMails?: string;
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

  
 
  projects: DashboardTable[] = [
    // Your existing project data
  ];
  successMessage: string | null = null;
  errorMessage: string | null = null;

  editableColumns = [
    { field: 'feedbackStatus', header: 'Feedback Status', type: 'select', options: ['Received', 'Pending'] },
    { field: 'vocEligibilityDate', header: 'VOC Eligibility Date'}, 
    { field: 'vocFeedbackReceivedDate', header: 'VOC Feedback Received Date'}, 
    { field: 'vocRemarks', header: 'VOC Remarks' },
    { field: 'mailStatus', header: 'Mail Status', type: 'select', options: ['Sent', 'Not Sent'] },
    { field: 'pmMails', header: 'PM Email' },
  ];

  constructor(private dashboardService: DashboardTableService, private http: HttpClient, private cdr: ChangeDetectorRef) {}
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
    const updateTasks = [];
  
if (this.editableProject.feedbackStatus === 'Received') {
  if (!this.editableProject.vocFeedbackReceivedDate) {
    const currentDate = new Date();
    this.editableProject.vocFeedbackReceivedDate = currentDate; 
  }
  updateTasks.push(
    this.dashboardService.addVOCFeedbackReceivedDate(
      this.editableProject.projectId!,
      this.editableProject.vocFeedbackReceivedDate
    )
  );
} else if (this.editableProject.feedbackStatus === 'Pending') {
  updateTasks.push(
    this.dashboardService.deleteVOCFeedbackReceivedDate(this.editableProject.projectId!)
  );
}

// Handle manual changes to vocFeedbackReceivedDate regardless of feedbackStatus
if (
  this.editableProject.vocFeedbackReceivedDate &&
  this.editableProject.feedbackStatus !== 'Pending'
) {
  updateTasks.push(
    this.dashboardService.addVOCFeedbackReceivedDate(
      this.editableProject.projectId!,
      this.editableProject.vocFeedbackReceivedDate
    )
  );
}
  
if (this.editableProject.mailStatus === 'Sent') {
  if (!this.editableProject.pmInitiateDate) {
    const currentDate = new Date();
    this.editableProject.pmInitiateDate = currentDate;
  }
  updateTasks.push(
    this.dashboardService.addPMInitiateDate(
      this.editableProject.projectId!,
      this.editableProject.pmInitiateDate
    )
  );
} else {
  updateTasks.push(
    this.dashboardService.deletePMInitiateDate(this.editableProject.projectId!)
  );
}
 
  
    // Handle remarks
    if (this.editableProject.vocRemarks) {
      updateTasks.push(
        this.dashboardService.updateProjectRemarks(this.editableProject.projectId!, this.editableProject.vocRemarks!)
      );
    } else {
      updateTasks.push(
        this.dashboardService.deleteProjectRemark(this.editableProject.projectId!)
      );
    }
  
    // Handle PM mails
    if (this.editableProject.pmMails!) {
      updateTasks.push(
        this.dashboardService.addPMmail(this.editableProject.projectManager!, this.editableProject.pmMails!)
      );
    } else {
      updateTasks.push(
        this.dashboardService.deletePMmail(this.editableProject.projectManager!)
      );
    }
  
    // Execute all update tasks sequentially
    from(updateTasks)
      .pipe(
        concatMap((task: any) => task), // Ensure sequential execution
        finalize(() => {
          // Update the editable project in the backend after all tasks are complete
          this.http.put(`https://localhost:7259/api/Project/editable/${this.editableProject.projectId}`, this.editableProject)
            .subscribe(
              (updatedProject: any) => {
                this.isModalOpen = false;
                this.save.emit();
                this.closeModal();
  
                // Update the local project data
                const index = this.projects.findIndex(p => p.projectId === updatedProject.projectId);
                this.dashboardService.updateProject(updatedProject);

                if (index !== -1) {
                  this.projects[index] = { ...this.projects[index], ...updatedProject };
                }
  
                // Display success message
                this.successMessage = 'Updated successfully';
                setTimeout(() => this.successMessage = null, 5000);
              },
              (error) => {
                console.error('Failed to save changes:', error);
  
                // Display error message
                this.errorMessage = 'Unable to update';
                setTimeout(() => this.errorMessage = null, 5000);
              }
            );
        })
      )
      .subscribe({
        next: () => {
          console.log('Operation successful');
        },
        error: (error: any) => {
          console.error('Error during operation:', error);
        },
      });
  
    // Notify Angular of changes
    this.cdr.detectChanges();
  }  
}
