
// import { CommonModule } from '@angular/common';
// import { Component, ElementRef, HostListener, OnInit, Renderer2 } from '@angular/core';
// import { FormsModule } from '@angular/forms';

// interface Project {
//   projectCode: string;
//   projectName: string;
//   du: string;
//   js: string;
//   deliveryHead: string;
//   startDate: Date;
//   endDate: Date;
//   contractType: string;
//   numberOfResources: number;
//   region: string;
//   projectType: string;
//   technology: string;
//   status: string;
// }

// @Component({
//   selector: 'app-table',
//   standalone: true,
//   imports: [FormsModule,CommonModule],
//   templateUrl: './table.component.html',
//   styleUrl: './table.component.css'
// })


// export class TableComponent implements OnInit {
//   searchQuery: any;
//   nextPage() {
//     throw new Error('Method not implemented.');
//   }
//   totalPages: any;
//   previousPage() {
//     throw new Error('Method not implemented.');
//   }
//   currentPage: any;
//   onExport() {
//     throw new Error('Method not implemented.');
//   }
//   onSearch($event: Event) {
//     throw new Error('Method not implemented.');
//   }

//   projects: Project[] = [
//     {
//       projectCode: 'DU6-254-SBP',
//       projectName: 'Salesboost - Development',
//       du: 'DU6',
//       js: 'Jayan M S',
//       deliveryHead: 'Jayan M S',
//       startDate: new Date('2017-11-13'),
//       endDate: new Date('2025-03-31'),
//       contractType: 'T&M',
//       numberOfResources: 7,
//       region: 'US',
//       projectType: 'Development',
//       technology: '.NET',
//       status: 'Active',
//     },
//     {
//       projectCode: 'DU6-140-MPH',
//       projectName: 'MapHabit',
//       du: 'DU6',
//       js: 'Jayan M S',
//       deliveryHead: 'Jayan M S',
//       startDate: new Date('2019-01-14'),
//       endDate: new Date('2024-09-30'),
//       contractType: 'T&M',
//       numberOfResources: 3,
//       region: 'US',
//       projectType: 'Development',
//       technology: 'React JS',
//       status: 'Active',
//     },
//     {
//       projectCode: 'DU6-286-DAR',
//       projectName: 'Neighbors',
//       du: 'DU6',
//       js: 'Jayan M S',
//       deliveryHead: 'Jayan M S',
//       startDate: new Date('2018-06-18'),
//       endDate: new Date('2025-03-31'),
//       contractType: 'T&M',
//       numberOfResources: 17,
//       region: 'US',
//       projectType: 'Development',
//       technology: '.NET',
//       status: 'Inactive',
//     },
//     {
//       projectCode: 'DU6-284-PRT',
//       projectName: 'Proteus 2',
//       du: 'DU6',
//       js: 'Jayan M S',
//       deliveryHead: 'Jayan M S',
//       startDate: new Date('2018-07-09'),
//       endDate: new Date('2025-03-31'),
//       contractType: 'T&M',
//       numberOfResources: 22,
//       region: 'US',
//       projectType: 'Development',
//       technology: '.NET',
//       status: 'Active',
//     },
//   ];

//   selectedColumns: { field: keyof Project; header: string }[] = [];

  // allColumns: { field: keyof Project; header: string }[] = [
   
  //   { field: 'du', header: 'DU' },
  //   { field: 'deliveryHead', header: 'Delivery Head' },
  //   { field: 'startDate', header: 'Start Date' },
  //   { field: 'endDate', header: 'End Date' },
  //   { field: 'contractType', header: 'Contract Type' },
  //   { field: 'numberOfResources', header: 'Number of Resources' },
  //   { field: 'region', header: 'Region' },
  //   { field: 'projectType', header: 'Project Type' },
  //   { field: 'technology', header: 'Technology' },
  //   { field: 'status', header: 'Status' },
  // ];
  

//   dropdownVisible: any;
//   constructor(private eRef: ElementRef, private renderer: Renderer2) {}

//   ngOnInit(): void {}
  
//   @HostListener('document:click', ['$event'])
//   onDocumentClick(event: MouseEvent) {
//     const targetElement = event.target as HTMLElement;
//     const isClickInside = targetElement.closest('.dropdown');

//     if (!isClickInside) {
//       this.dropdownVisible = false;
//     }
//   }

//   onCheckboxChange(event: Event, column: { field: keyof Project; header: string }) {
//     const checkbox = event.target as HTMLInputElement;
//     if (checkbox.checked) {
//       this.selectedColumns.push(column);
//     } else {
//       this.selectedColumns = this.selectedColumns.filter(
//         (selectedColumn) => selectedColumn.field !== column.field
//       );
//     }
//   }

//   isSelected(column: { field: keyof Project; header: string }): boolean {
//     return this.selectedColumns.some((selectedColumn) => selectedColumn.field === column.field);
//   }

//   removeSelection(column: { field: keyof Project; header: string }) {
//     this.selectedColumns = this.selectedColumns.filter(
//       (selectedColumn) => selectedColumn.field !== column.field
//     );
//   }

//   toggleDropdown() {
//     this.dropdownVisible = !this.dropdownVisible;
//   }
// }

import { CommonModule } from '@angular/common';
import { Component, ElementRef, HostListener, OnInit, Renderer2 } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface Project {
  projectCode: string;
  projectName: string;
  du: string;
  js: string;
  deliveryHead: string;
  startDate: Date;
  endDate: Date;
  contractType: string;
  numberOfResources: number;
  region: string;
  projectType: string;
  technology: string;
  status: string;
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
  dropdownVisible: boolean = false;
  selectedColumns: { field: keyof Project; header: string }[] = [];

  projects: Project[] = [
    {
    projectCode: 'DU6-254-SBP',
      projectName: 'Salesboost - Development',
      du: 'DU6',
      js: 'Jayan M S',
      deliveryHead: 'Jayan M S',
      startDate: new Date('2017-11-13'),
      endDate: new Date('2025-03-31'),
      contractType: 'T&M',
      numberOfResources: 7,
      region: 'US',
      projectType: 'Development',
      technology: '.NET',
      status: 'Active',
    },
    {
      projectCode: 'DU6-140-MPH',
      projectName: 'MapHabit',
      du: 'DU6',
      js: 'Jayan M S',
      deliveryHead: 'Jayan M S',
      startDate: new Date('2019-01-14'),
      endDate: new Date('2024-09-30'),
      contractType: 'T&M',
      numberOfResources: 3,
      region: 'US',
      projectType: 'Development',
      technology: 'React JS',
      status: 'Active',
    },
    {
      projectCode: 'DU6-286-DAR',
      projectName: 'Neighbors',
      du: 'DU6',
      js: 'Jayan M S',
      deliveryHead: 'Jayan M S',
      startDate: new Date('2018-06-18'),
      endDate: new Date('2025-03-31'),
      contractType: 'T&M',
      numberOfResources: 17,
      region: 'US',
      projectType: 'Development',
      technology: '.NET',
      status: 'Inactive',
    },
    {
      projectCode: 'DU6-284-PRT',
      projectName: 'Proteus 2',
      du: 'DU6',
      js: 'Jayan M S',
      deliveryHead: 'Jayan M S',
      startDate: new Date('2018-07-09'),
      endDate: new Date('2025-03-31'),
      contractType: 'T&M',
      numberOfResources: 22,
      region: 'US',
      projectType: 'Development',
      technology: '.NET',
      status: 'Active',
    },
  ];

  allColumns: { field: keyof Project; header: string }[] = [
    { field: 'du', header: 'DU' },
    { field: 'deliveryHead', header: 'Delivery Head' },
    { field: 'startDate', header: 'Start Date' },
    { field: 'endDate', header: 'End Date' },
    { field: 'contractType', header: 'Contract Type' },
    { field: 'numberOfResources', header: 'Number of Resources' },
    { field: 'region', header: 'Region' },
    { field: 'projectType', header: 'Project Type' },
    { field: 'technology', header: 'Technology' },
    { field: 'status', header: 'Status' },
  ];

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

  toggleDropdown() {
    this.dropdownVisible = !this.dropdownVisible;
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

  nextPage() {
    // Implement pagination logic here
  }

  previousPage() {
    // Implement pagination logic here
  }

  onExport() {
    // Implement export logic here
  }

  onSearch(event: Event) {
    // Implement search logic here
  }
}
