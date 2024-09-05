import { Component } from '@angular/core';
import { GraphComponent2 } from "../../components/status-components/graph/graph.component";
import { CardComponent } from "../../components/status-components/card/card.component";
import { TableComponent } from '../../components/status-components/table/table.component';



@Component({
  selector: 'app-voc-status',
  standalone: true,
  imports: [GraphComponent2, CardComponent, TableComponent],
  templateUrl: './voc-status.component.html',
  styleUrl: './voc-status.component.css'
})
export class VocStatusComponent {

}
