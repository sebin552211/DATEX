import { Component, NgModule } from '@angular/core';
import { RouterOutlet } from '@angular/router';
<<<<<<<<< Temporary merge branch 1
import { AnalysisCardComponent } from './components/analysis-components/Analysiscard/Analysiscard.component';

import { SidebarComponent } from './layout/sidebar/sidebar.component';
import { DashboardcardComponent } from './components/dashboard-components/Dashboardcard/Dashboardcard.component';
import { NavbarComponent } from './layout/navbar/navbar.component';
import { DashboardComponent } from "./pages/dashboard/dashboard.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, SidebarComponent, DashboardcardComponent, AnalysisCardComponent, DashboardComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'ProjectDatabase';
}
