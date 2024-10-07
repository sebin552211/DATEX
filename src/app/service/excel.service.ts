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
        resolve(data);
      };
      reader.onerror = (error) => reject(error);
      reader.readAsBinaryString(file);
    });
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
      'ForecastedEndDate',
      'VOCEligibilityDate',
      'ProjectType',
      'Domain',
      'DatabaseUsed',
      'CloudUsed',
      'FeedbackStatus',
      'MailStatus'
    ];
  }
}


