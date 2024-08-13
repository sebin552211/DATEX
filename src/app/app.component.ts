import { Component, NgModule } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { GraphComponent } from './components/dashboard-components/graph/graph.component';
import { GraphComponent1 } from "./components/analysis-components/graph/graph.component";
import { GraphComponent2 } from "./components/status-components/graph/graph.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, GraphComponent, GraphComponent1, GraphComponent2],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'ProjectDatabase';
}
