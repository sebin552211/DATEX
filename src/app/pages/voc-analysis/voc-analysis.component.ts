import { Component } from '@angular/core';
import { GraphComponent1 } from "../../components/analysis-components/graph/graph.component";

@Component({
  selector: 'app-voc-analysis',
  standalone: true,
  imports: [GraphComponent1],
  templateUrl: './voc-analysis.component.html',
  styleUrl: './voc-analysis.component.css'
})
export class VocAnalysisComponent {

}
