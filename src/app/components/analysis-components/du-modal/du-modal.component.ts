import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { VocAnalysisService } from '../../../service/voc-analysis.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DashboardTableService } from '../../../service/dashboard-table.service';

@Component({
  selector: 'app-du-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './du-modal.component.html',
  styleUrl: './du-modal.component.css'
})
export class DuModalComponent implements OnInit{

  @Input() isModalOpen = false;  

  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<void>();

  selectedFilters : { [key: string]: string[] } = {};
  SurveyIds: string[] | undefined;

  selectedSurveyId: string | null = null;
  selectedDu: string | null = null;


  constructor( private vocAnalysisService :VocAnalysisService, private dashboardTableService: DashboardTableService) { }
  ngOnInit() {
    this.dashboardTableService.getProject2().subscribe((projects) => {
      this.SurveyIds=projects;
    });
  }

  getSelectedSurveyId(): string | null {
    const selectedSurveyId = this.selectedFilters['SurveyIds'];
    if (selectedSurveyId && selectedSurveyId.length > 0) {
  
      return selectedSurveyId.length > 1
        ? selectedSurveyId.join(', ') 
        : selectedSurveyId[0]; 
    }
    return null; 
  }

  saveChanges(): void {
    if (this.selectedSurveyId && this.selectedDu) {
      this.vocAnalysisService.addDuInSurveyId(this.selectedDu, this.selectedSurveyId).subscribe(
        (response: any) => {
          this.save.emit(); 
          this.closeModal();
        },
        (error: any) => {
          console.error('Error while posting data:', error);
        }
      );
    } else {
      console.warn('Please select both Survey ID and DU.');
    }
  }
  
  Delete():void{
    if(this.selectedSurveyId){
      console.log("deleted: "+this.selectedSurveyId);
      this.vocAnalysisService.DeleteDUinSurveyId(this.selectedSurveyId);
    }
    else {
      console.warn('Please select correct Survey ID.');
    }
    this.closeModal(); 
  }

  closeModal(): void {
    this.isModalOpen = false;
    this.close.emit();
  }
}
