import { Component, NgModule } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { AnalysisCardComponent } from './components/analysis-components/Analysiscard/Analysiscard.component';

import { SidebarComponent } from './layout/sidebar/sidebar.component';
import { DashboardcardComponent } from './components/dashboard-components/Dashboardcard/Dashboardcard.component';
import { NavbarComponent } from './layout/navbar/navbar.component';
import { DashboardComponent } from "./pages/dashboard/dashboard.component";
import { TableComponent } from './components/status-components/table/table.component';
import { EditModalComponent } from "./components/dashboard-components/edit-modal/edit-modal.component";import { HttpClientModule } from '@angular/common/http';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { CommonModule, NgClass, NgIf } from '@angular/common';



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, AnalysisCardComponent, DashboardcardComponent, SidebarComponent, NavbarComponent, DashboardComponent, TableComponent, EditModalComponent,HttpClientModule,ProgressSpinnerModule,NgIf,NgClass],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'ProjectDatabase';
  isLoading: boolean = true;

  ngOnInit() {
    console.log("entered");
    // Simulate data fetching
    setTimeout(() => {
      this.isLoading = false;
    }, 2000); // Simulate a 2-second data fetch
    console.log("exit")
  }
}
