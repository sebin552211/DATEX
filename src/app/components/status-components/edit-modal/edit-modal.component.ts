import { DashboardTable } from './../../../interface/dashboard-table';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DashboardTableService } from '../../../service/dashboard-table.service';
import { switchMap } from 'rxjs';


interface EditableProject {
  [key: string]: string | number | Date | undefined;
  feedbackStatus?: string;
  vocEligibilityDate?: Date;
  vocRemarks? : string;
  mailStatus? : string;
  pmMails?: string;
}

@Component({
  selector: 'app-edit-modal',
  standalone: true,
  imports: [FormsModule, CommonModule],
  // providers: [DatePipe],
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
    { field: 'vocRemarks', header: 'VOC Remarks' },
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
    if (this.editableProject.feedbackStatus === 'Received') {
      const currentDate = new Date();
  
      this.dashboardService.addVOCFeedbackReceivedDate(this.editableProject.projectId!, currentDate)
      .subscribe(
        (updatedProject) => {
          // Find the project in the list and update its remarks
          const index = this.projects.findIndex(p => p.projectId === updatedProject.projectId);
          if (index !== -1) {
            this.projects[index] = updatedProject;
          }
          this.dashboardService.updateProject(updatedProject);
          this.cdr.detectChanges();  // Trigger change detection
        },
        (error) => {
          console.error('Error saving remarks:', error);
        }
      );
    } else {
      this.dashboardService.deleteVOCFeedbackReceivedDate(this.editableProject.projectId!)
        .subscribe({
          next: () => {
            console.log('Feedback received date deleted successfully.');
  
            // Optionally reset the project data
            this.dashboardService.updateProject(null);
          },
          error: (error) => {
            console.error('Error deleting feedback received date:', error);
          }
        });
    }  
    
    if (this.editableProject.mailStatus === 'Sent') {
      const currentDate = new Date(); 
      this.dashboardService.addPMInitiateDate(this.editableProject.projectId!, currentDate)
      .subscribe({
        next: (response) => {
            console.log('PMInitiate received date added successfully:', response);
        },
        error: (error) => {
            console.error('Error adding PMInitiate received date:', error);
        }
    });      
    }
    else{
      this.dashboardService.deletePMInitiateDate(this.editableProject.projectId!);
    }
    if(this.editableProject.vocRemarks){
    this.dashboardService.updateProjectRemarks(this.editableProject.projectId!, this.editableProject.vocRemarks!)
      .subscribe(
        (updatedProject) => {
          this.dashboardService.updateProject(updatedProject);
          this.cdr.detectChanges();  // Trigger change detection
        },
        (error) => {
          console.error('Error saving remarks:', error);
        }
      );
    }
    else{
      this.dashboardService.deleteProjectRemark(this.editableProject.projectId!)
      .subscribe((response) => {
        this.dashboardService.updateProject(response);
        this.cdr.detectChanges();
      });
    }
    if(this.editableProject.pmMails!){
    this.dashboardService.addPMmail(this.editableProject.projectManager!,this.editableProject.pmMails!).subscribe({
      next: (response) => {
          console.log('PM Mail added successfully:', response);
          this.dashboardService.updateProject(response);
          this.cdr.detectChanges();
      },
      error: (error) => {
          console.error(' Error adding PM Mail:', error);
      }
  }); 
}
else{
  this.dashboardService.deletePMmail(this.editableProject.projectManager!).subscribe((response) => {
    this.dashboardService.updateProject(response);
    this.cdr.detectChanges();
  });
}     
  
    // Make an HTTP PUT request to update the project in the backend
    this.http.put(`https://localhost:7259/api/Project/editable/${this.editableProject.projectId}`, this.editableProject)
      .subscribe(
        (updatedProject: any) => {
          // Handle success
          this.isModalOpen = false;
          this.save.emit();
          this.closeModal();
  
          // Update the local data model
          const index = this.projects.findIndex(p => p.projectId === updatedProject.projectId);

          console.log(index)
          if (index !== -1) {
            this.projects[index] = { ...this.projects[index], ...updatedProject };
          }
  
          // Force Angular to detect changes
          this.cdr.detectChanges();
  
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

