import { Component } from '@angular/core';
import { GraphComponent } from "../../components/dashboard-components/graph/graph.component";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [GraphComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

}
