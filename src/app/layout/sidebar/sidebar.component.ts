import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MenuItem } from 'primeng/api';
@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  items: MenuItem[] | undefined;
  ngOnInit() {
    this.items = [
      {
        label: 'dashboard',
        routerLink:'/'
      },
      {
        label: 'analysis',
        routerLink:'/voc-analysis'
      },
      {
        label: 'status',
        routerLink:'/voc-status'
      },

    ];
  }

  isDashboardSelected = false;
  isVocStatusSelected = false;
  isVocAnalysisSelected = false;

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
}