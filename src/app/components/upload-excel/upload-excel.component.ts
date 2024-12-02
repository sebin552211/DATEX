import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DashboardTableService } from '../../service/dashboard-table.service';
import { VocAnalysis } from '../../interface/voc-analysis';
import { VocAnalysisExcelService } from '../../service/voc-analysis-excel.service';
import { CommonModule } from '@angular/common';
import { VocAnalysisService } from '../../service/voc-analysis.service';
import { SharedDataService } from '../../service/shared-data.service';

@Component({
  selector: 'app-upload-excel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './upload-excel.component.html',
  styleUrl: './upload-excel.component.css'
})

export class UploadExcelComponent {
  @Input() excelData: VocAnalysis[] = [];
  @Input() showExcelTable = false;
  @Output() close = new EventEmitter<void>();
  isLoading = false;
  errorMessage: string | null = null;
  successMessage: string | null = null;

  // Pagination variables
  currentPage = 1;
  rowsPerPage = 10;

  constructor(
    private dashboardTableService: DashboardTableService,
    private excelService: VocAnalysisExcelService,
    private vocAnalysis : VocAnalysisService,
    private sharedDataService: SharedDataService
  ) { }

  openModal(): void {
    this.showExcelTable = true;
  }

  downloadTemplate(): void {
    this.excelService.downloadTemplate();
  }

  closeModal(): void {
    this.showExcelTable = false;
    this.excelData = []; // Optionally clear data
    this.close.emit(); // Emit close event to notify the parent component
  }

  getColumnHeaders(): string[] {
    return this.excelData.length ? Object.keys(this.excelData[0]) : [];
  }

  get paginatedData(): VocAnalysis[] {
    const startIndex = (this.currentPage - 1) * this.rowsPerPage;
    return this.excelData.slice(startIndex, startIndex + this.rowsPerPage);
  }

  get totalPages(): number {
    return Math.ceil(this.excelData.length / this.rowsPerPage);
  }

  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }
  saveData(fileInput: HTMLInputElement): void {
    this.isLoading = true;
    this.errorMessage = null;
    this.successMessage = null;  
    const input = fileInput;
    if (input.files && input.files.length) {
      const file = input.files[0];
  
      // Step 1: Read and process the Excel file
      this.excelService.readExcel(file)
        .then(data => {
          this.excelData = data as VocAnalysis[]; // Populate data for modal
  
          // Step 2: Upload the file to the backend
          this.vocAnalysis.addVocAnalyses(file).subscribe(
            response => {
              console.log('File uploaded successfully:', response);
              this.successMessage = 'File uploaded successfully!';

              const currentDate = new Date();
              const day = currentDate.getDate();
              const month = currentDate.toLocaleString('en-US', { month: 'short' }).toUpperCase();
              const year = currentDate.getFullYear();
              const ordinal = this.getOrdinalSuffix(day);
              const formattedDate = `${day}${ordinal} ${month} ${year}`;
              console.log("Excel Component: "+this.sharedDataService.setDate(formattedDate));
              this.sharedDataService.setDate(formattedDate);

              window.location.reload();
  
              // Step 3: Save the data to the backend after uploading the file
              // const projectData = this.transformExcelData(this.excelData);
            //   this.dashboardTableService.updateProjects(projectData).subscribe(
            //     response => {
            //       console.log('Data updated successfully:', response);
            //       this.successMessage = 'Data saved successfully!';
            //       setTimeout(() => this.successMessage = null, 5000);
            //     },
            //     error => {
            //       console.error('Error updating data:', error);
            //       this.errorMessage = `Failed to save data.`;
            //     }
            //   );
            },
            error => {
              console.error('Error uploading file:', error);
              this.errorMessage = 'Failed to upload the file. Please try again.';
            }
          );
  
          this.isLoading = false;
        })
        .catch(error => {
          console.error('Error reading Excel file', error);
          this.errorMessage = 'Failed to read the Excel file. Please try again.';
          this.isLoading = false;
        });
    } else {
      this.errorMessage = 'No file selected. Please upload a file.';
      this.isLoading = false;
    }
  }

  getOrdinalSuffix(day: number): string {
    if (day >= 11 && day <= 13) {
      return 'th';
    }
    switch (day % 10) {
      case 1: return 'st';
      case 2: return 'nd';
      case 3: return 'rd';
      default: return 'th';
    }
  }

  
  // private transformExcelData(data: VocAnalysis[]): any[] {
  //   return data.map(row => { 
  //     return {
  //       CustomerFocus: row.CustomerFocus,
  //       PlanningAndControl: row.PlanningAndControl,
  //       Quality: row.Quality,
  //       Communication: row.Communication,
  //       Knowledge: row.Knowledge,
  //       EngageService: row.EngageService,
  //       Score: row.Score,
  //     };
  //   });
  // }  
}

