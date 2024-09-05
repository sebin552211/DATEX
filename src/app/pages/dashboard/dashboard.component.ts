import { Component } from '@angular/core';
import { DashboardcardComponent } from '../../components/dashboard-components/Dashboardcard/Dashboardcard.component';
import { GraphComponent } from "../../components/dashboard-components/graph/graph.component";
import { TableComponent } from "../../components/dashboard-components/table/table.component";


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [DashboardcardComponent, GraphComponent, TableComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

}
