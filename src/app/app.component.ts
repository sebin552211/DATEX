import { Component, NgModule } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { AnalysisCardComponent } from './components/analysis-components/Analysiscard/Analysiscard.component';

import { SidebarComponent } from './layout/sidebar/sidebar.component';
import { DashboardcardComponent } from './components/dashboard-components/Dashboardcard/Dashboardcard.component';
import { NavbarComponent } from './layout/navbar/navbar.component';
import { DashboardComponent } from "./pages/dashboard/dashboard.component";
import { TableComponent } from './components/status-components/table/table.component';
import { HttpClientModule } from '@angular/common/http';




@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, AnalysisCardComponent, DashboardcardComponent, SidebarComponent, NavbarComponent, DashboardComponent, TableComponent,HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'ProjectDatabase';
}
