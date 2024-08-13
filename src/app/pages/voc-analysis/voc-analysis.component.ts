import { Component } from '@angular/core';
import { AnalysisCardComponent } from '../../components/analysis-components/Analysiscard/Analysiscard.component';


@Component({
  selector: 'app-voc-analysis',
  standalone: true,
  imports: [AnalysisCardComponent],
  templateUrl: './voc-analysis.component.html',
  styleUrl: './voc-analysis.component.css'
})
export class VocAnalysisComponent {

}
