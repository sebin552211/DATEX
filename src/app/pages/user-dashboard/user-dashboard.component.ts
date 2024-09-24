import { Component } from '@angular/core';
import { DashboardcardComponent } from "../../components/dashboard-components/Dashboardcard/Dashboardcard.component";
import { GraphComponent } from "../../components/dashboard-components/graph/graph.component";
import { UserTableComponent } from '../../components/dashboard-components/user-table/user-table.component';

@Component({
  selector: 'app-user-dashboard',
  standalone: true,
  imports: [DashboardcardComponent, GraphComponent, UserTableComponent],
  templateUrl: './user-dashboard.component.html',
  styleUrl: './user-dashboard.component.css'
})
export class UserDashboardComponent {

}
