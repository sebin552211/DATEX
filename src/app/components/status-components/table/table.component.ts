import { CommonModule } from '@angular/common';
import { Component, ElementRef, HostListener, OnInit, Renderer2 } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface Project {
  projectCode: string;
  projectName: string;
  deliveryUnit: string;
  deliveryHead: string;
  startDate: Date;
  endDate: Date;
  contractType: string;
  numberOfResources: number;
  region: string;
  projectType: string;
  mailStatus: string;
  feedbackStatus: string;
}

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})

export class TableComponent implements OnInit {
  searchQuery: any;
  totalPages: any;
  currentPage: any;

  nextPage() {
    throw new Error('Method not implemented.');
  }

  previousPage() {
    throw new Error('Method not implemented.');
  }

  onExport() {
    throw new Error('Method not implemented.');
  }

  onSearch($event: Event) {
    throw new Error('Method not implemented.');
  }

  projects: Project[] = [
    {
      projectCode: 'DU6-254-SBP',
      projectName: 'Salesboost - Development',
      deliveryUnit: 'DU6',
      deliveryHead: 'Jayan M S',
      startDate: new Date('2017-11-13'),
      endDate: new Date('2025-03-31'),
      contractType: 'T&M',
      numberOfResources: 7,
      region: 'US',
      projectType: 'Development',
      mailStatus: 'Mail Initiated',
      feedbackStatus: 'Pending',
    },
    {
      projectCode: 'DU6-140-MPH',
      projectName: 'MapHabit',
      deliveryUnit: 'DU6',
      deliveryHead: 'Jayan M S',
      startDate: new Date('2019-01-14'),
      endDate: new Date('2024-09-30'),
      contractType: 'T&M',
      numberOfResources: 3,
      region: 'US',
      projectType: 'Development',
      mailStatus: 'Mail Initiated',
      feedbackStatus: 'Pending',
    },
    {
      projectCode: 'DU6-286-DAR',
      projectName: 'Neighbors',
      deliveryUnit: 'DU6',
      deliveryHead: 'Jayan M S',
      startDate: new Date('2018-06-18'),
      endDate: new Date('2025-03-31'),
      contractType: 'T&M',
      numberOfResources: 17,
      region: 'US',
      projectType: 'Development',
      mailStatus: 'Moll Initiated',
      feedbackStatus: 'Received',
    },
    {
      projectCode: 'DU6-284-PRT',
      projectName: 'Proteus 2',
      deliveryUnit: 'DU6',
      deliveryHead: 'Jayan M S',
      startDate: new Date('2018-07-09'),
      endDate: new Date('2025-03-31'),
      contractType: 'T&M',
      numberOfResources: 22,
      region: 'US',
      projectType: 'Development',
      mailStatus: 'Mall Initiated',
      feedbackStatus: 'Pending',
    },
  ];

  selectedColumns: { field: keyof Project; header: string }[] = [];

  allColumns: { field: keyof Project; header: string }[] = [
    
    { field: 'deliveryUnit', header: 'Delivery Unit' },
    { field: 'deliveryHead', header: 'Delivery Head' },
    { field: 'startDate', header: 'Start Date' },
    { field: 'endDate', header: 'End Date' },
    { field: 'contractType', header: 'Contract Type' },
    { field: 'numberOfResources', header: 'Number of Resources' },
    { field: 'region', header: 'Region' },
    { field: 'projectType', header: 'Project Type' },
    { field: 'mailStatus', header: 'Mail Status' },
    { field: 'feedbackStatus', header: 'Feedback Status' },
  ];

  dropdownVisible: any;

  constructor(private eRef: ElementRef, private renderer: Renderer2) {}

  ngOnInit(): void {}

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const targetElement = event.target as HTMLElement;
    const isClickInside = targetElement.closest('.dropdown');

    if (!isClickInside) {
      this.dropdownVisible = false;
    }
  }

  onCheckboxChange(event: Event, column: { field: keyof Project; header: string }) {
    const checkbox = event.target as HTMLInputElement;
    if (checkbox.checked) {
      this.selectedColumns.push(column);
    } else {
      this.selectedColumns = this.selectedColumns.filter(
        (selectedColumn) => selectedColumn.field !== column.field
      );
    }
  }

  isSelected(column: { field: keyof Project; header: string }): boolean {
    return this.selectedColumns.some((selectedColumn) => selectedColumn.field === column.field);
  }

  removeSelection(column: { field: keyof Project; header: string }) {
    this.selectedColumns = this.selectedColumns.filter(
      (selectedColumn) => selectedColumn.field !== column.field
    );
  }

  toggleDropdown() {
    this.dropdownVisible = !this.dropdownVisible;
  }
}
