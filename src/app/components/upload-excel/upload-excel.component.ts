import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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

export class UploadExcelComponent implements OnInit{
  @Input() excelData: VocAnalysis[] = [];
  @Input() showExcelTable = false;
  @Output() close = new EventEmitter<void>();
  isLoading = false;
  errorMessage: string | null = null;
  successMessage: string | null = null;
  selectedFile: File | null = null;
  duplicates: { surveyId: string; newFeedback: string }[] = [];
  isProcessingDuplicates = false;
  // Pagination variables
  currentPage = 1;
  rowsPerPage = 10;
  existingSurveyIds: Set<string> = new Set(); 

  constructor(
    private dashboardTableService: DashboardTableService,
    private excelService: VocAnalysisExcelService,
    private vocAnalysis : VocAnalysisService,
    private sharedDataService: SharedDataService
  ) { }

  ngOnInit(): void {
    this.loadExistingSurveyIds(); // Load existing survey IDs from the backend
  }

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

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  loadExistingSurveyIds(): void {
    this.vocAnalysis.getAllSurveyIds().subscribe(
      (ids: string[]) => {
        this.existingSurveyIds = new Set(ids);
      },
      (error: any) => {
        console.error('Error fetching existing Survey IDs:', error);
        this.errorMessage = 'Failed to load existing Survey IDs. Please try again.';
      }
    );
  }
  

  saveData(fileInput: HTMLInputElement): void {
    this.isLoading = true;
    this.errorMessage = null;
    this.successMessage = null;

    const input = fileInput;

    if (input.files && input.files.length) {
        const file = input.files[0];
        const duplicates: any[] = []; // Store duplicates
        const newEntries: any[] = []; // Store new entries
        this.excelService.readExcel(file)
            .then((data: VocAnalysis[]) => {
                const newExcelData = data.map(row => ({
                    surveyId: row['Survey ID'],
                }));

                newExcelData.forEach(item => {
                    if (this.existingSurveyIds.has(item.surveyId)) {
                        // Duplicate detected in previously uploaded data
                        duplicates.push(item);
                    } else {
                        // New entry
                        newEntries.push(item);
                    }
                });

                // If duplicates exist, ask the user for confirmation
                if (duplicates.length > 0) {
                  this.handleDuplicates(duplicates, file, () => {
                    // Callback to upload after user decisions
                    this.uploadData(file, newEntries);
                  });
                } else {
                    // If no duplicates, upload directly
                    this.uploadData(file, newEntries);
                }
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
    // window.location.reload();
}

handleDuplicates(duplicates: any[], file: File, onComplete: () => void): void {
  const updateDecisions: { [key: string]: boolean } = {};
  let processedCount = 0;

  const processNext = () => {
    if (processedCount < duplicates.length) {
      const duplicate = duplicates[processedCount];
      const userConfirmed = confirm(
        `Feedback for Survey ID ${duplicate.surveyId} already exists. Do you want to update the new feedback?`
      );

      updateDecisions[duplicate.surveyId] = userConfirmed;
      if (userConfirmed) {
        this.vocAnalysis.updateDatabaseWithFile(file, duplicate.surveyId)
          .then(() => {
            processedCount++;
            processNext();
          })
          .catch((error: any) => {
            console.error(
              `Failed to update feedback for Survey ID ${duplicate.surveyId}`,
              error
            );
            processedCount++; 
            processNext();
          });
      } else {
        processedCount++;
        processNext();
      }
    } else {
      // All duplicates processed
      onComplete();
    }
  };
  processNext();
}

uploadData(file: File, newEntries: any[]): void {
  const seenSurveyIds = new Set(this.existingSurveyIds); // Initialize with existing IDs
  const duplicates: any[] = [];
  const nonDuplicateEntries: any[] = [];

  // Identify duplicates and non-duplicate entries
  newEntries.forEach(item => {
      if (seenSurveyIds.has(item.surveyId)) {
          duplicates.push(item);
      } else {
          nonDuplicateEntries.push(item);
      }
  });

  const confirmedUpdates: any[] = [];

  // Function to finalize the upload
  const finalizeUpload = () => {
      const finalEntries = [...confirmedUpdates, ...nonDuplicateEntries];

      if (finalEntries.length > 0) {
          this.vocAnalysis.addVocAnalyses(file).subscribe(
              response => {
                  console.log('File data uploaded successfully:', response);
                  this.successMessage = 'File data uploaded successfully!';
                  this.sharedDataService.setUploadResponse(response);
                  this.updateDateInLocalStorage();
              },
              error => {
                  console.error('Error uploading file data:', error);
                  this.errorMessage = 'Failed to upload the data. Please try again.';
                  this.sharedDataService.setUploadResponse(this.errorMessage);
              }
          );
      } else {
          console.warn('No new data to upload.');
          this.successMessage = 'No new data to upload. All entries already exist or were skipped.';
      }

      this.isLoading = false;
  };

  // Process duplicates
  if (duplicates.length > 0) {
      let processedCount = 0;

      const processNextDuplicate = () => {
          if (processedCount < duplicates.length) {
              const duplicate = duplicates[processedCount];
              const userConfirmed = confirm(`Feedback for Survey ID ${duplicate.surveyId} already exists. Do you want to update the new feedback?`);

              if (userConfirmed) {
                  confirmedUpdates.push(duplicate);
              }

              processedCount++;
              processNextDuplicate();
          } else {
              // Call finalizeUpload after processing all duplicates
              finalizeUpload();
          }
      };

      processNextDuplicate();
  } else {
      // No duplicates, directly finalize upload
      finalizeUpload();
  }
}

updateDateInLocalStorage(): void {
    const currentDate = new Date();
    const day = currentDate.getDate();
    const month = currentDate.toLocaleString('en-US', { month: 'short' }).toUpperCase();
    const year = currentDate.getFullYear();
    const ordinal = this.getOrdinalSuffix(day);
    const formattedDate = `${day}${ordinal} ${month} ${year}`;
    this.sharedDataService.setDate(formattedDate);
    localStorage.setItem('vocUploadDate', formattedDate);
}

private getOrdinalSuffix(day: number): string {
    if (day > 3 && day < 21) return 'th';
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

