import { Component } from '@angular/core';
import { DashboardcardComponent } from '../../components/dashboard-components/Dashboardcard/Dashboardcard.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [DashboardcardComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

}
