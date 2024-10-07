import { Component, Input, Output, EventEmitter } from '@angular/core';
import { DashboardTableService } from '../../../service/dashboard-table.service';
import { ExcelService } from '../../../service/excel.service';
import { ExcelRow } from '../../../interface/excel-row';
import {  CommonModule } from '@angular/common';

@Component({
  selector: 'app-excel-table',
  standalone: true,
  imports: [ CommonModule],
  templateUrl: './excel-table.component.html',
  styleUrls: ['./excel-table.component.css']
})
export class ExcelTableComponent {
  @Input() excelData: ExcelRow[] = [];
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
    private excelService: ExcelService
  ) {}


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

  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length) {
      const file = input.files[0];
      this.isLoading = true;
      this.errorMessage = null; // Clear previous errors
      this.successMessage = null; // Clear previous success messages
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

  // Pagination logic

  get paginatedData(): ExcelRow[] {
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

  saveData(): void {
    this.isLoading = true;
    this.errorMessage = null; // Clear previous errors
    this.successMessage = null; // Clear previous success messages

    this.dashboardTableService.updateProjects(this.excelData).subscribe(
      response => {
        console.log('Data updated successfully:', response);
        this.isLoading = false;
        this.successMessage = 'Data saved successfully!';

        // Clear the success message after 3 seconds
        setTimeout(() => this.successMessage = null, 3000);
      },
      error => {
        console.error('Error updating data:', error);
        this.errorMessage = 'Failed to save data. Please try again.';
        this.isLoading = false;
      }
    );
  }
}
