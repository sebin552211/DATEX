import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, debounceTime, distinctUntilChanged, map, Observable, of, throwError } from 'rxjs';
import { DashboardTable } from '../interface/dashboard-table';
import { ExcelRow } from '../interface/excel-row';
import { SharedDataService } from './shared-data.service';


@Injectable({
  providedIn: 'root'
})
export class DashboardTableService {
 
  private apiUrl = 'https://localhost:7259/api/Project';
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

  updateProject(project: any) {
    this.projectSubject.next(project);
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
            console.log('Fetched projects:', projects);
            // this.projectsData.next(projects); // Store data locally
            // console.log(this.projectsData,"projectsdata")
            return projects;
        }),
        catchError(this.handleError)
    );
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
    console.log("Formatted Date: " + JSON.stringify(payload));

    return this.http.post<DashboardTable>(
        `${this.apiUrl}/${projectId}/VOCFeedbackReceivedDate`, payload); 
  }

  deleteVOCFeedbackReceivedDate(projectId : number): Observable<void> {
  return this.http.delete<void>(`${this.apiUrl}/${projectId}/VOCFeedbackReceivedDate`);
  }

  addPMInitiateDate(projectId: number, PMInitiateDates:Date):Observable<DashboardTable>{
  const payload = { PMInitiateDate: PMInitiateDates };
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
  private selectedFiltersSubject = new BehaviorSubject<{ [key: string]: string[] }>({});
  selectedFilters$ = this.selectedFiltersSubject.asObservable();

  // Method to update the selected filters
  updateSelectedFilters(filters: { [key: string]: string[] }) {
    this.selectedFiltersSubject.next(filters);
  }

  
}
