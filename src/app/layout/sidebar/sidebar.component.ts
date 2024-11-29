import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { FilterComponent } from "../filter/filter.component";
@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterLink, FilterComponent],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  isDivVisible: boolean = false;
  toggleFilters() {
    return this.isDivVisible=!this.isDivVisible;
 }
  // items: MenuItem[] | undefined;
  // ngOnInit() {
  //   this.items = [
  //     {
  //       label: 'dashboard',
  //       routerLink:'/'
  //     },
  //     {
  //       label: 'analysis',
  //       routerLink:'/voc-analysis'
  //     },
  //     {
  //       label: 'status',
  //       routerLink:'/voc-status'
  //     },

  //   ];
  // }

  // isDashboardSelected = true;
  // isVocStatusSelected = false;
  // isVocAnalysisSelected = false;

  // selectDashboard() {
  //   this.resetSelections();
  //   this.isDashboardSelected = true;
  // }

  // selectVocStatus() {
  //   this.resetSelections();
  //   this.isVocStatusSelected = true;
  // }

  // selectVocAnalysis() {
  //   this.resetSelections();
  //   this.isVocAnalysisSelected = true;
  // }

  // resetSelections() {
  //   this.isDashboardSelected = false;
  //   this.isVocStatusSelected = false;
  //   this.isVocAnalysisSelected = false;
  // }
}
