import { Component } from '@angular/core';
import { AnalysisCardComponent } from '../../components/analysis-components/Analysiscard/Analysiscard.component';
import { GraphComponent1 } from "../../components/analysis-components/graph/graph.component";



@Component({
  selector: 'app-voc-analysis',
  standalone: true,
  imports: [AnalysisCardComponent, GraphComponent1],
  templateUrl: './voc-analysis.component.html',
  styleUrl: './voc-analysis.component.css'
})
export class VocAnalysisComponent {

}
