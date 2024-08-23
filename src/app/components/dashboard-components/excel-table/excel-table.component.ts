import { Component, Input, Output, EventEmitter } from '@angular/core';
import { DashboardTableService } from '../../../service/dashboard-table.service';
import { ExcelService } from '../../../service/excel.service';
import { ExcelRow } from '../../../interface/excel-row';
import { NgFor, NgIf, CommonModule } from '@angular/common';

@Component({
  selector: 'app-excel-table',
  standalone: true,
  imports: [NgFor, NgIf, CommonModule],
  templateUrl: './excel-table.component.html',
  styleUrls: ['./excel-table.component.css']
})
export class ExcelTableComponent {
  @Input() excelData: ExcelRow[] = [];
  @Input() showExcelTable = false;
  @Output() close = new EventEmitter<void>();
  isLoading = false;
  errorMessage: string | null = null;
  successMessage: string | null = null; // Added property for success message

  constructor(
    private dashboardTableService: DashboardTableService,
    private excelService: ExcelService
  ) {}

  openModal(): void {
    this.showExcelTable = true;
  }

  closeModal(): void {
    this.showExcelTable = false;
    this.excelData = []; // Optionally clear data
    this.close.emit(); // Emit close event to notify the parent component
  }

  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length) {
      const file = input.files[0];
      this.isLoading = true;
      this.excelService.readExcel(file)
        .then(data => {
          this.excelData = data as ExcelRow[];
          this.openModal(); // Show the table when data is loaded
          this.isLoading = false;
        })
        .catch(error => {
          console.error('Error reading Excel file', error);
          this.errorMessage = 'Failed to read the Excel file. Please try again.';
          this.isLoading = false;
        });
    }
  }

  getColumnHeaders(): string[] {
    return this.excelData.length ? Object.keys(this.excelData[0]) : [];
  }

  saveData(): void {
    this.isLoading = true;
    this.errorMessage = null;
    this.successMessage = null; // Clear any previous success message

    this.dashboardTableService.updateProjects(this.excelData).subscribe(
      response => {
        console.log('Data updated successfully:', response);
        this.isLoading = false;
        this.successMessage = 'Data saved successfully!'; // Set success message
      },
      error => {
        console.error('Error updating data:', error);
        this.errorMessage = 'Failed to save data. Please try again.';
        this.isLoading = false;
      }
    );
  }
}
