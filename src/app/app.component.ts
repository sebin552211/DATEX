import { Component, NgModule } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { AnalysisCardComponent } from './components/analysis-components/Analysiscard/Analysiscard.component';

import { SidebarComponent } from './layout/sidebar/sidebar.component';
import { DashboardcardComponent } from './components/dashboard-components/Dashboardcard/Dashboardcard.component';
import { NavbarComponent } from './layout/navbar/navbar.component';
import { DashboardComponent } from "./pages/dashboard/dashboard.component";
import { TableComponent } from './components/status-components/table/table.component';
import { EditModalComponent } from "./components/dashboard-components/edit-modal/edit-modal.component";import { HttpClientModule } from '@angular/common/http';
import { FilterComponent } from "./layout/filter/filter.component";
import { GraphComponent } from "./components/dashboard-components/graph/graph.component";




@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, AnalysisCardComponent, DashboardcardComponent, SidebarComponent, NavbarComponent, DashboardComponent, TableComponent, EditModalComponent, FilterComponent, GraphComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'ProjectDatabase';
  currentFilters = {};

  onFilterChange(filters: any) {
    this.currentFilters = filters;
  }
}
