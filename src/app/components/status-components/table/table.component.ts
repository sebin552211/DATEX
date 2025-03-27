import { CommonModule } from '@angular/common';
import { ExcelRow } from './../../../interface/excel-row';
import { ChangeDetectorRef, Component, ElementRef, EventEmitter, HostListener, Input, OnDestroy, OnInit, Output, Renderer2 } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EditModalComponent } from '../edit-modal/edit-modal.component';
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
  imports: [FormsModule, CommonModule, EditModalComponent, ExcelTableComponent],
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})

export class TableComponent implements OnInit ,OnDestroy{
  private pollingSubscription!: Subscription;
  @Input() isModalOpen = false;
  @Input() editableProject: Partial<DashboardTable> = {};
  

  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<void>();
  searchQuery: string = '';
  isEditingRemark = false;
  isEditing: boolean = false;  // Tracks if we are in edit mode
  editableRemark: string = '';  // Holds the remark text for editing
  currentProject: DashboardTable | null = null;  // The project currently being edited
  cpro : DashboardTable[] = [];
  totalPages: number = 0;
  flag: number = 0;
  currentPage: number = 1;
  dropdownVisible: boolean = false;
  selectedColumns: { field: keyof DashboardTable; header: string }[] = [];
  // editableProject: Partial<DashboardTable> = {};
  projects: DashboardTable[] = [];
  selectedFile: File | null = null;
  pageNumber: number = 1;
  pageSize: number = 7;
  totalProjects: number = 0;
  excelData: any[] = [];
  yearly: string[] = [];
  quaterly: string[] = [];

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
    { field: 'vocFeedbackReceivedDate', header: 'VOC Feedback Received date'},
    { field: 'vocRemarks', header: 'VOC Remarks'},
    { field: 'pmInitiateDate', header: 'PM Initiate date'},
    { field: 'pmMails', header: 'PM Email' },
  ];
 
  private projectsSubscription: Subscription | undefined;
  constructor(public dashboardTableService: DashboardTableService,   
    private cd: ChangeDetectorRef,
    private excelService: ExcelService,
    private signalRService: SignalRService,
    private sharedDataService: SharedDataService) {}
    
    ngOnDestroy(): void {
    if (this.pollingSubscription) {
      this.pollingSubscription.unsubscribe();
    } 
    if (this.projectsSubscription) {
      this.projectsSubscription.unsubscribe();
    }
  }
  
    showExcelTable: boolean = false; 

    openExcelModal(excelData: ExcelRow[]): void {
      this.excelData = excelData;
      this.showExcelTable = true;
    }
   
    ngOnInit(): void {
      
      this.editableProject.vocEligibilityDate = String(this.calculateVocEligibilityDate());
      // console.log('Initial VOC Eligibility Date:', this.editableProject.vocEligibilityDate);
      this.sharedDataService.loadCproFromStorage();
      const savedProjects = localStorage.getItem('cpro');
      if (savedProjects) {
      this.cpro = JSON.parse(savedProjects);
      // localStorage.removeItem('cpro');
      }
      // Subscribe to projects$
      // this.projectsSubscription = this.sharedDataService.projects$.subscribe((projects) => {
      //   this.projects = projects;
      this.projectsSubscription = this.sharedDataService.cpro$.subscribe((cpro) => {
        if(cpro){
        this.cpro = cpro;
        }
      });    

      // Subscribe to SignalR service
      this.signalRService.mailStatusUpdated$.subscribe(() => {
        this.onMailStatusUpdated();
        this.loadProjects(); // Reload projects when mail status is updated
      });
    
      this.sharedDataService.project$.subscribe((project) => {
        if (project) {
          const flatProject = Array.isArray(project) ? project.flat() : [project];
  
          // Add projects only if they do not already exist in cpro
          flatProject.forEach((proj) => {
            if (!this.isProjectInCpro(proj)) {
              this.cpro.push(proj);
            }
          });
  
          // Save the updated cpro to localStorage
          localStorage.setItem('cpro', JSON.stringify(this.cpro));
        }
      });
    
      // Filter columns to display in the table
      this.selectedColumns = this.allColumns.filter((col) =>
        ['vocEligibilityDate','vocFeedbackReceivedDate', 'vocRemarks', 'pmInitiateDate'].includes(col.field)
      );
    
      // Load projects data
      this.loadProjects();
      // this.loadPagedProjects();
    }
    isProjectInCpro(project: DashboardTable): boolean {
      return this.cpro.some((p) => p.projectId === project.projectId);
    }
  
  onMailStatusUpdated() {
    this.loadProjects();

    // Manually trigger change detection to update the UI
    this.cd.detectChanges();
  }
  startPolling(): void {
    this.pollingSubscription = interval(5000) // Poll every 5 seconds
      .subscribe(() => {
        // this.loadProjects(); // Refresh the table data
      });
  }
  // loadPagedProjects() {
  //   this.dashboardTableService
  //     .getProjectsPaged(this.pageNumber, this.pageSize)
  //     .subscribe((data: any) => {
        // const projectsArray = data.projects;
        // this.projects = data.projects|| []; 
        // this.cpro = [...this.projects];
        // this.cpro=data.projects;
        // console.log("sfgadsojfhgd:" + JSON.stringify(data))
        // this.cpro = data;   // if (Array.isArray(data.projects)
        // this.cpro = this.pru
        // this.totalProjects = data.totalProjects;
        // this.totalPages = Math.ceil(this.totalProjects / this.pageSize);
        // localStorage.setItem('cpro', JSON.stringify(this.cpro));
        // localStorage.removeItem('cpro', JSON.stringify(this.cpro));
      // console.log('Paged Projects Loaded:', this.projects);
  //     });
  // }

  loadProjects(): void {
    this.dashboardTableService.getProjects().subscribe((data: DashboardTable[]) => {
      this.projects = data;
      // this.cpro = data;
      this.projects = data || [];
      // this.cpro = [...this.projects];
      this.totalProjects = data.length; // Update total projects based on data length
        this.totalPages = Math.ceil(this.totalProjects / this.pageSize);
        localStorage.setItem('cpro', JSON.stringify(this.cpro));
        // localStorage.removeItem('cpro', JSON.stringify(this.cpro));
      // console.log('Projects Loaded:', this.projects);
    });
  }
  changePage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.pageNumber = page;
      // this.loadPagedProjects();
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
          this.cpro = data;
         
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

  private calculateVocEligibilityDate(): Date | null {  
  if (!this.editableProject.projectStartDate || !this.editableProject.projectEndDate) {    
    return null;  
  }  
  const startDate = new Date(this.editableProject.projectStartDate);  
  const endDate = new Date(this.editableProject.projectEndDate);  // Calculate project duration in months  
  const durationMonths = (endDate.getFullYear() - startDate.getFullYear()) * 12 + (endDate.getMonth() - startDate.getMonth());  // If project duration is 6 months or less, set VOC Eligibility Date to end date  
  if (durationMonths <= 6) {    
    return endDate;  
  }  // Otherwise, add 6 months to the current date  
  const vocEligibilityDate = new Date();  
  vocEligibilityDate.setMonth(vocEligibilityDate.getMonth() + 6);    
  return vocEligibilityDate;
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
    const exportData = this.cpro.map((project) => {
      const exportObj: any = {
        'Project Code': project.projectCode, 
        'Project Name': project.projectName, 
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
    { field: 'vocFeedbackReceivedDate', header: 'VOC Feedback Received Date'}, 
    { field: 'vocRemarks', header: 'VOC Remarks' },
    { field: 'pmMails', header: 'PM Mail'}
  ];
  
  openEditModal(project: DashboardTable) {
    // Open the modal and pass the project to the EditModalComponent
    // For simplicity, let's assume you're using a service or a reference to open the modal
    this.isModalOpen = true;
    this.editableProject = { ...project }; // Copy project data to editableProject
  }

  editRemark(project: DashboardTable): void {
    this.isEditing = true;  // Set editing mode to true
    this.currentProject = project;  // Set the project being edited
    this.editableRemark = project.vocRemarks || '';  // Load the current remark into the textarea
  }

  startEditing(project: DashboardTable) {
    this.editableProject = { ...project };
  }

  closeModal() {
    this.isModalOpen = false;
    this.close.emit();
  }

  
  saveChanges() {
    const projectIndex = this.cpro.findIndex(
      (proj) => proj.projectCode === this.editableProject.projectCode
    );
    if (projectIndex > -1) {
      this.cpro[projectIndex] = { ...this.editableProject } as DashboardTable;
    }
  
    this.isModalOpen = false; // Close modal
    // this.loadPagedProjects(); // Reload projects to reflect updates
    this.loadProjects();
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
