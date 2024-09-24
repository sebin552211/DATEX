import { Injectable } from '@angular/core';
import * as XLSX from 'xlsx';

@Injectable({
  providedIn: 'root',
})
export class ExcelService {

  readExcel(file: File): Promise<any[]> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const binaryStr = e.target.result;
        const workbook = XLSX.read(binaryStr, { type: 'binary' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const data = XLSX.utils.sheet_to_json(worksheet);

        // Convert and format dates
        data.forEach((row: any) => {
          if (row.ForecastedEndDate && typeof row.ForecastedEndDate === 'number') {
            row.ForecastedEndDate = this.excelDateToISODate(row.ForecastedEndDate);
          } else if (row.ForecastedEndDate && typeof row.ForecastedEndDate === 'string') {
            row.ForecastedEndDate = new Date(row.ForecastedEndDate);
          }

          if (row.VOCEligibilityDate && typeof row.VOCEligibilityDate === 'number') {
            row.VOCEligibilityDate = this.excelDateToISODate(row.VOCEligibilityDate);
          } else if (row.VOCEligibilityDate && typeof row.VOCEligibilityDate === 'string') {
            row.VOCEligibilityDate = new Date(row.VOCEligibilityDate);
          }
        });

        resolve(data);
      };
      reader.onerror = (error) => reject(error);
      reader.readAsBinaryString(file);
    });
  }

  formatDate(date: Date | { y: number, m: number, d: number }): string {
    if (date instanceof Date) {
      // Format Date object as 'mm/dd/yyyy'
      return date.toLocaleDateString('en-US');
    } else if (date && typeof date.y === 'number' && typeof date.m === 'number' && typeof date.d === 'number') {
      // Handle the parsed date code
      return `${String(date.m).padStart(2, '0')}/${String(date.d).padStart(2, '0')}/${date.y}`;
    }
    return '';
  }

  excelDateToISODate(serial: number): string {
    // Convert Excel serial date to JavaScript Date object
    const utc_days = Math.floor(serial - 25569);
    const utc_value = utc_days * 86400;
    const date_info = new Date(utc_value * 1000);
    // Format as 'YYYY-MM-DD HH:MM:SS.SSS'
    return date_info.toISOString().split('T').join(' ').split('.')[0] + '.000';
  }

  downloadTemplate(): void {
    const headers = this.getTemplateHeaders();
    const worksheet = XLSX.utils.json_to_sheet([], { header: headers });
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Template');

    // Generate and download the Excel file
    XLSX.writeFile(workbook, 'ProjectDetailsUpload_Template.xlsx');
  }

  private getTemplateHeaders(): string[] {
    // Return the headers based on the ExcelRow interface
    return [
      'ProjectCode',
      'SQA',
      'ForecastedEndDate[yyyy-mm-dd]',
      'VOCEligibilityDate[yyyy-mm-dd]',
      'ProjectType',
      'Domain',
      'DatabaseUsed',
      'CloudUsed',
      'FeedbackStatus',
      'MailStatus',
      'Technology'
    ];
  }

 // Method to export data as Excel
 exportAsExcelFile(json: any[], fileName: string): void {
  const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
  const workbook: XLSX.WorkBook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');

  // Generate and download the Excel file
  XLSX.writeFile(workbook, `${fileName}.xlsx`);
}

}
