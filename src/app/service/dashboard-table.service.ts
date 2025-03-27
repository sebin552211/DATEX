import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, debounceTime, distinctUntilChanged, map, Observable, of, tap, throwError } from 'rxjs';
import { DashboardTable } from '../interface/dashboard-table';
import { ExcelRow } from '../interface/excel-row';
import { SharedDataService } from './shared-data.service';
import { VocAnalysis } from '../interface/voc-analysis';


@Injectable({
  providedIn: 'root'
})
export class DashboardTableService {
  projects: DashboardTable[] = []; // To store the list of projects
  totalProjects: number = 0;       // To store the total number of projects
  currentPage: number = 1;         // To track the current page number
 
  private apiUrl = 'https://localhost:7259/api/Project';
  private url = 'https://localhost:7259/api/VocAnalysis/surveyId';
  private projectsData: BehaviorSubject<DashboardTable[]> = new BehaviorSubject<DashboardTable[]>([]);
  private projectSubject = new BehaviorSubject<any>(null);
  public project$ = this.projectSubject.asObservable();


  constructor(private http: HttpClient, private sharedDataService: SharedDataService) {}
  private cachedProjects: DashboardTable[] | null = null;

  // getProjects(params: any): Observable<DashboardTable[]> {
  //   return this.http.get<object>(this.apiUrl).pipe(
  //     map((response: any) => {
  //       const projects = response.result as DashboardTable[];
  //       this.projectsData.next(projects); // Store data locally
  //       return projects;
  //     }),
  //     catchError(this.handleError)
  //   );
  // }

  updateProject(project: Partial<DashboardTable>): Observable<DashboardTable[]> {
    this.projectSubject.next(project);
    return this.projectSubject.asObservable(); // Return an observable for the updated state
  }
  getProjects(filters: any = {}): Observable<DashboardTable[]> {
    console.log('Filters:', filters);
    let params = new HttpParams(); // Use HttpParams for query parameters
    let url = this.apiUrl; // Default to the base URL

    // Add filters to query parameters
    Object.keys(filters).forEach(key => {
        const filterValue = filters[key];
        
        if (Array.isArray(filterValue) && filterValue.length > 0) {
            params = params.append(key, filterValue.join(','));
            url = `${this.apiUrl}/filter`;
        } else if (filterValue) {
            params = params.append(key, filterValue);
            url = `${this.apiUrl}/filter`;
        }
    });

    return this.http.get<any>(url, { params }).pipe(
        map(response => {
            console.log('Raw API response:', response); // Log the entire response

            let projects: DashboardTable[] = [];

            // Handle different response structures
            if (Array.isArray(response)) {
                projects = response as DashboardTable[];
            } else if (response && response.result && Array.isArray(response.result)) {
                projects = response.result as DashboardTable[];
            } else if (response && typeof response === 'object') {
                // Convert object to array if needed
                console.log("Converted to array")
                projects = Object.values(response) as DashboardTable[];
            } else {
                console.error("Unexpected API response structure:", response);
            }
            this.sharedDataService.updateProjects(projects); // Notify other components
        return projects;
        }),
        catchError(this.handleError)
    );
}

  getProject2(): Observable<any[]>{
    return this.http.get<string[]>(this.url).pipe();
  }

  getallDUs():Observable<any[]>{
    const Api = `https://localhost:7259/api/VocAnalysis/DU`;
    return this.http.get<VocAnalysis[]>(`${Api}`).pipe();
     //https://localhost:7259/api/VocAnalysis/DU
  } 

  getLocalProjects(): Observable<DashboardTable[]> {
    return this.projectsData.asObservable(); // Return locally stored data as observable
  }
  updateProjects(data: ExcelRow[]): Observable<any> {
    return this.http.post(this.apiUrl + '/update', data);
  }
 
  getProjectsByQuarter(quarter: number): Observable<any> {
    return this.http.get(`api/projects/quarter/${quarter}`);
  }
  addVOCFeedbackReceivedDate(projectId: number, VOCFeedbackReceivedDates: Date): Observable<DashboardTable> {
    const payload = { VOCFeedbackReceivedDate: VOCFeedbackReceivedDates };

    return this.http.post<DashboardTable>(
        `${this.apiUrl}/${projectId}/VOCFeedbackReceivedDate`, payload); 
  }

  deleteVOCFeedbackReceivedDate(projectId : number): Observable<void> {
  return this.http.delete<void>(`${this.apiUrl}/${projectId}/VOCFeedbackReceivedDate`);
  }

  addPMInitiateDate(projectId: number, PMInitiateDates:Date):Observable<DashboardTable>{
  const payload = { PMInitiateDate: PMInitiateDates };
  console.log("PM Initiate date: ", PMInitiateDates)
  return this.http.post<DashboardTable>(`${this.apiUrl}/${projectId}/PMIntiateDate`,payload);
  }
  
  deletePMInitiateDate(projectId:number): Observable<void>{
    return this.http.delete<void>(`${this.apiUrl}/${projectId}/PMIntiateDate`);
  }

  getVOCFeedbackReceivedDate(projectId:number): Observable<DashboardTable> {

    return this.http.get<DashboardTable>(`${this.apiUrl}/${projectId}/VOCFeedbackReceivedDate`);
  }

  AddProjectRemarks(projectId: number, remarks: string | null): Observable<DashboardTable> {
    const updatePayload = { vocRemarks: remarks }; 
    return this.http.post<DashboardTable>(`${this.apiUrl}/${projectId}/remarks`, updatePayload);
  }

  updateProjectRemarks(projectId: number, remarks: string | null): Observable<DashboardTable> {
    const updatePayload = { vocRemarks: remarks }; // The payload to send to the backend

    // Make an HTTP PUT request to update the remarks
    return this.http.put<DashboardTable>(`${this.apiUrl}/${projectId}/remarks`, updatePayload);
  }  
  
  deleteProjectRemark(projectId: number): Observable<void> {
    // Make an HTTP DELETE request to delete the remark
    return this.http.delete<void>(`${this.apiUrl}/${projectId}/remarks`);
  }

  addPMmail(projectManager:string, pmMails: string): Observable<DashboardTable> {
    return this.http.post<DashboardTable>(`${this.apiUrl}/${projectManager}?PMEmail=${encodeURIComponent(pmMails)}`,
        null);
  }
  deletePMmail(projectManager:string){
  return this.http.delete<DashboardTable>( `${this.apiUrl}/${projectManager}/PMMails`);
  }
      
  getProjectByProjectName(query: string){
    return this.http.get<DashboardTable>(`${this.apiUrl}/search?query=${query}`).pipe(
      map((projects) => projects.filter((project) => project != null))
    );
  }

  // Error handling
  private handleError(error: HttpErrorResponse): Observable<never> {
    console.error('An error occurred:', error); // Log full error

    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred
      console.error('Client-side error:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code
      console.error(`Backend returned code ${error.status}, body was:`, error.error);
    }

    // Return an observable with a user-facing error message
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }
  getProjectsName(searchQuery: string = ''): Observable<DashboardTable[]> {
    return this.http.get<DashboardTable[]>(`${this.apiUrl}/search`, { params: { query: searchQuery } }).pipe(
      debounceTime(300), // Add debounce
      distinctUntilChanged(), // Avoid duplicate requests
      catchError(this.handleError)
    );  
  }

  getProjectsPaged(pageNumber: number, pageSize: number): Observable<DashboardTable[]> {
    return this.http.get<DashboardTable[]>(`https://localhost:7259/api/Project/paged?pageNumber=${pageNumber}&pageSize=${pageSize}`);    
  }
  public selectedFiltersSubject = new BehaviorSubject<{ [key: string]: string[] }>({});
  selectedFilters$ = this.selectedFiltersSubject.asObservable();

  // Method to update the selected filters
  updateSelectedFilters(filters: { [key: string]: string[] }) {
    this.selectedFiltersSubject.next(filters);
  }
  
  getProjectsPagedAndFiltered(pageNumber: number, pageSize: number, filters: any = {}
  ): Observable<{ projects: DashboardTable[]; totalProjects: number }> {
    let params = new HttpParams()
      .set('pageNumber', pageNumber.toString())
      .set('pageSize', pageSize.toString());
  
    // Append filters to the request
    Object.keys(filters).forEach((key) => {
      const value = filters[key];
      if (value) {
        params = params.append(key, value);
      }
    });
  
    const url = `${this.apiUrl}/paged-filtered`;
    return this.http.get<{ projects: DashboardTable[]; totalProjects: number }>(url, { params });
  }
  
  
applyFilters(filters: any): void {
  this.updateSelectedFilters(filters); // Update selected filters
  this.fetchProjects(1); // Reset to the first page when filters are applied
}

fetchProjects(pageNumber: number): void {
  const pageSize = 10; // Define your page size
  const filters = this.selectedFiltersSubject.getValue(); // Get current filters

  this.getProjectsPagedAndFiltered(pageNumber, pageSize, filters).subscribe(response => {
      this.projects = response.projects;
      this.totalProjects = response.totalProjects;
      this.currentPage = pageNumber;
  });
}
onPageChange(newPage: number): void {
  this.fetchProjects(newPage);
}
}
