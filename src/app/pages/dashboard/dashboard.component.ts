import { Component } from '@angular/core';
import { DashboardcardComponent } from '../../components/dashboard-components/Dashboardcard/Dashboardcard.component';
import { GraphComponent } from "../../components/dashboard-components/graph/graph.component";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [DashboardcardComponent, GraphComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

}
