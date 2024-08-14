import { Component } from '@angular/core';
import { GraphComponent2 } from "../../components/status-components/graph/graph.component";
import { CardComponent } from "../../components/status-components/card/card.component";


@Component({
  selector: 'app-voc-status',
  standalone: true,
  imports: [GraphComponent2, CardComponent],
  templateUrl: './voc-status.component.html',
  styleUrl: './voc-status.component.css'
})
export class VocStatusComponent {

}
