import { CommonModule} from '@angular/common';
import { Component } from '@angular/core';
import { FilterComponent } from '../filter/filter.component';
import { MenuItem } from 'primeng/api';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, FilterComponent, RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  User='ACE Team';
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

  isDashboardSelected = true;
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

