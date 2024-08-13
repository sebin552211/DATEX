import { Component, NgModule } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AnalysisCardComponent } from './components/analysis-components/Analysiscard/Analysiscard.component';

import { SidebarComponent } from './layout/sidebar/sidebar.component';
import { DashboardcardComponent } from './components/dashboard-components/Dashboardcard/Dashboardcard.component';
import { NavbarComponent } from './layout/navbar/navbar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, AnalysisCardComponent, DashboardcardComponent, SidebarComponent, NavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'ProjectDatabase';
}
