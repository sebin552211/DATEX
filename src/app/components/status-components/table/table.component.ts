import { CommonModule } from '@angular/common';
import { ExcelRow } from './../../../interface/excel-row';
import { ChangeDetectorRef, Component, ElementRef, EventEmitter, HostListener, Input, OnDestroy, OnInit, Output, Renderer2 } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EditModalComponent } from '../edit-modal/edit-modal.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { DashboardTableService } from '../../../service/dashboard-table.service';
import { ExcelService } from '../../../service/excel.service';
import { DashboardTable } from '../../../interface/dashboard-table';
import { ExcelTableComponent } from '../../dashboard-components/excel-table/excel-table.component';
import { interval, Subscription } from 'rxjs';
import { SignalRService } from '../../../service/signal-r.service';
import { SharedDataService } from '../../../service/shared-data.service';





@Component({
  selector: 'app-table',
  standalone: true,
  imports: [FormsModule, CommonModule, EditModalComponent,ExcelTableComponent,HttpClientModule],
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})

export class TableComponent implements OnInit ,OnDestroy{
  private pollingSubscription!: Subscription;
  @Input() isModalOpen = false;
  // @Input() editableProject: Partial<DashboardTable> = {};

  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<void>();
  searchQuery: string = '';
  totalPages: number = 0;
  currentPage: number = 1;
  dropdownVisible: boolean = false;
  selectedColumns: { field: keyof DashboardTable; header: string }[] = [];
  editableProject: Partial<DashboardTable> = {};
  projects: DashboardTable[] = [];
  selectedFile: File | null = null;
  pageNumber: number = 1;
  pageSize: number = 7;
  totalProjects: number = 0;
  excelData: any[] = [];

  allColumns: { field: keyof DashboardTable; header: string }[] = [
    { field: 'du', header: 'DU' },
    { field: 'duHead', header: 'DU Head' },
    { field: 'projectManager', header: 'Project Manager' },
    { field: 'projectStartDate', header: 'Start Date' },
    { field: 'projectEndDate', header: 'End Date' },
    { field: 'contractType', header: 'Contract Type' },
    { field: 'numberOfResources', header: 'Number of Resources' },
    { field: 'region', header: 'Region' },
    { field: 'projectType', header: 'Project Type' },
    { field: 'technology', header: 'Technology' },
    { field: 'status', header: 'Status' },
    { field: 'sqa', header: 'SQA' },
    { field: 'forecastedEndDate', header: 'Forecasted End Date' },
    { field: 'vocEligibilityDate', header: 'VOC Eligibility Date' },
    { field: 'domain', header: 'Domain' },
    { field: 'databaseUsed', header: 'Database Used' },
    { field: 'cloudUsed', header: 'Cloud Used' },
    { field: 'mailStatus', header: 'Mail Status' },
    { field: 'feedbackStatus', header: 'Feedback Status' },
  ];
 
  private projectsSubscription: Subscription | undefined;
  constructor(private eRef: ElementRef, private renderer: Renderer2,    private dashboardTableService: DashboardTableService,   
    private cd: ChangeDetectorRef,
    private excelService: ExcelService,
    private http: HttpClient, private signalRService: SignalRService,
    private sharedDataService: SharedDataService) {}
    ngOnDestroy(): void {
    if (this.pollingSubscription) {
      this.pollingSubscription.unsubscribe();
    } 
  }

    showExcelTable: boolean = false; 

    openExcelModal(excelData: ExcelRow[]): void {
      this.excelData = excelData;
      this.showExcelTable = true;
    }


  ngOnInit(): void {
    // this.startPolling();
    
    this.projectsSubscription = this.sharedDataService.projects$.subscribe(projects => {
      this.projects = projects;
    });
    this.signalRService.mailStatusUpdated$.subscribe(() => {
      this.onMailStatusUpdated();
    });

    
    this.selectedColumns = this.allColumns.filter(col =>
      ['vocEligibilityDate', 'projectManager','mailStatus','feedbackStatus'].includes(col.field)
    );
    this.loadProjects();
    this.loadPagedProjects();
    this.signalRService.mailStatusUpdated$.subscribe(() => {
      this.loadProjects(); // Reload the projects to get the updated Mail Status
    });
    this.cd.detectChanges();
  }
  onMailStatusUpdated() {
    this.loadProjects();

    // Manually trigger change detection to update the UI
    this.cd.detectChanges();
  }
  startPolling(): void {
    this.pollingSubscription = interval(5000) // Poll every 5 seconds
      .subscribe(() => {
        this.loadProjects(); // Refresh the table data
      });
  }
  loadPagedProjects() {
    this.dashboardTableService
      .getProjectsPaged(this.pageNumber, this.pageSize)
      .subscribe((data: any) => {
        this.projects = data.projects;
        this.totalProjects = data.totalProjects;
        this.totalPages = Math.ceil(this.totalProjects / this.pageSize);
      });
  }

  loadProjects(): void {
    this.dashboardTableService.getProjects().subscribe((data: DashboardTable[]) => {
      this.projects = data;
      this.totalProjects = data.length; // Update total projects based on data length
        this.totalPages = Math.ceil(this.totalProjects / this.pageSize);
    });
  }
  changePage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.pageNumber = page;
      this.loadPagedProjects();
    }
  }
  get paginationArray(): number[] {
    const pagesToShow = 5; // Show 5 pages at a time
    const half = Math.floor(pagesToShow / 2);
    let start = Math.max(1, this.pageNumber - half);
    let end = Math.min(this.totalPages, start + pagesToShow - 1);

    if (end - start < pagesToShow) {
      start = Math.max(1, end - pagesToShow + 1);
    }

    return Array.from({ length: end - start + 1 }, (_, i) => i + start);
  }
  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.selectedFile = input.files ? input.files[0] : null;
  }
  onSearch() {
    const trimmedQuery = this.searchQuery.trim().toLowerCase();

    if (trimmedQuery) {
      // Fetch projects based on the search query
      this.dashboardTableService
        .getProjectsName(trimmedQuery)
        .subscribe((data: DashboardTable[]) => {
          this.projects = data;
         
        });
    } else {
      // If the search box is empty, fetch all projects
      this.loadProjects();
    }
  }

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

  onCheckboxChange(event: Event, column: { field: keyof DashboardTable; header: string }) {
    const checkbox = event.target as HTMLInputElement;
    if (checkbox.checked) {
      this.selectedColumns.push(column);
    } else {
      this.selectedColumns = this.selectedColumns.filter(
        (selectedColumn) => selectedColumn.field !== column.field
      );
    }
  }

  isSelected(column: { field: keyof DashboardTable; header: string }): boolean {
    return this.selectedColumns.some((selectedColumn) => selectedColumn.field === column.field);
  }

  removeSelection(column: { field: keyof DashboardTable; header: string }) {
    this.selectedColumns = this.selectedColumns.filter(
      (selectedColumn) => selectedColumn.field !== column.field
    );
  }

  exportToExcel(): void {
    const exportData = this.projects.map((project) => {
      const exportObj: any = {
        'Project Code': project.projectCode, // Add Project Code
        'Project Name': project.projectName, // Add Project Name
      };
  
      // Add selected dynamic columns
      this.selectedColumns.forEach((col) => {
        exportObj[col.header] = project[col.field];
      });
  
      return exportObj;
    });
  
    // Call the ExcelService to export the data
    this.excelService.exportAsExcelFile(exportData, 'ProjectDetails');
  }
  


 
  editableColumns = [
    { field: 'feedbackStatus', header: 'Feedback Status', type: 'select', options: ['Received', 'Pending'] },
    { field: 'vocEligibilityDate', header: 'VOC Eligibility Date' },
  ];
  
  openEditModal(project: DashboardTable) {
    // Open the modal and pass the project to the EditModalComponent
    // For simplicity, let's assume you're using a service or a reference to open the modal
    this.isModalOpen = true;
    this.editableProject = { ...project }; // Copy project data to editableProject



  }
  closeModal() {
    this.isModalOpen = false;
    this.close.emit();
  }

  
  saveChanges() {
    // Update the project with the new values
    this.loadPagedProjects();  // Reload the paginated project data
    this.loadProjects();       
    this.closeModal();
  }
  isAllSelected(): boolean {
    return this.selectedColumns.length === this.allColumns.length;
  }
  
  onSelectAllChange(event: Event): void {
    const checkbox = event.target as HTMLInputElement;
    if (checkbox.checked) {
      this.selectedColumns = [...this.allColumns];
    } else {
      this.selectedColumns = [];
    }
  }
  
}
