import { CommonModule} from '@angular/common';
import { Component } from '@angular/core';
import { FilterComponent } from '../filter/filter.component';
import { MenuItem } from 'primeng/api';
import { Router, RouterLink } from '@angular/router';
import {  MsalService } from '@azure/msal-angular';
import { ExcelRow } from '../../interface/excel-row';
import { ExcelTableComponent } from "../../components/dashboard-components/excel-table/excel-table.component";
import { VocAnalysisService } from '../../service/voc-analysis.service';
import { VocAnalysis } from '../../interface/voc-analysis';
import { UploadExcelComponent } from "../../components/upload-excel/upload-excel.component";

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, UploadExcelComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  User = 'ACE Team';
  items: MenuItem[] | undefined;
  fullUrl: string = '';
  hoverText: string = 'Import Excel';
  isDashboardSelected = true;
  isVocStatusSelected = false;
  isVocAnalysisSelected = false;
  excelData: any[] = [];
  showTooltip = false;

  constructor(private authService: MsalService, private router: Router, private vocAnalysisService: VocAnalysisService) {}

  ngOnInit() {
    // Initialize authentication service
    this.authService.instance.initialize();

    // Navigation items
    this.items = [
      {
        label: 'dashboard',
        routerLink: '/app/dashboard'
      },
      {
        label: 'analysis',
        routerLink: '/app/voc-analysis'
      },
      {
        label: 'status',
        routerLink: '/app/voc-status'
      }
    ];

    // Get the full URL
    this.fullUrl = window.location.href;

    // Set the selection state based on the URL
    if (this.fullUrl === 'http://localhost:4200/app/dashboard') {
      this.selectDashboard();
    } else if (this.fullUrl === 'http://localhost:4200/app/voc-status') {
      this.selectVocStatus();
    } else if (this.fullUrl === 'http://localhost:4200/app/voc-analysis') {
      this.selectVocAnalysis();
    }
  }

  selectDashboard() {
    this.resetSelections();
    this.isDashboardSelected = true;
  }

  selectVocStatus() {
    this.resetSelections();
    this.isVocStatusSelected = true;
  }

  selectVocAnalysis() {
    this.resetSelections();
    this.isVocAnalysisSelected = true;
  }

  resetSelections() {
    this.isDashboardSelected = false;
    this.isVocStatusSelected = false;
    this.isVocAnalysisSelected = false;
  }

  showExcelTable: boolean = false; 

  openExcelModal(excelData: any): void {
    this.excelData = excelData;
    this.vocAnalysisService.addVocAnalyses(excelData);
    this.showExcelTable = true;
  }

  // Logout function
  logout() {
    this.authService.instance.initialize();
    localStorage.removeItem('loginToken');
    this.router.navigate(['/']); // Redirect to login or home page
  }
}

