import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AnalysisCardComponent } from './components/analysis-components/Analysiscard/Analysiscard.component';
import { SidebarComponent } from './layout/sidebar/sidebar.component';
import { DashboardcardComponent } from './components/dashboard-components/Dashboardcard/Dashboardcard.component';
import { NavbarComponent } from './layout/navbar/navbar.component';
import { DashboardComponent } from "./pages/dashboard/dashboard.component";
import { TableComponent } from './components/status-components/table/table.component';
import { EditModalComponent } from "./components/dashboard-components/edit-modal/edit-modal.component";
import { HttpClientModule } from '@angular/common/http';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { CommonModule} from '@angular/common';
import { DashboardTableService } from './service/dashboard-table.service';
import { FilterComponent } from "./layout/filter/filter.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    SidebarComponent,
    NavbarComponent,
    RouterOutlet,
    FilterComponent
],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'], // Corrected 'styleUrl' to 'styleUrls'
})
export class AppComponent {
  title = 'ProjectDatabase';
  isLoading: boolean = true;

  constructor(private dashboardTableService:DashboardTableService) {}

  ngOnInit() {
    console.log('entered');
    this.fetchData(); // Fetch data on init
  }

  fetchData() {
    this.dashboardTableService.getProjects().subscribe(
      (data) => {
        console.log(data);
        this.isLoading = false;
      },
      (error) => {
        console.error('Error fetching data:', error);
        this.isLoading = false; // Hide loader even if there's an error
      }
    );
  }
}
