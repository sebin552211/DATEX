import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, Observable, throwError } from 'rxjs';
import { DashboardTable } from '../interface/dashboard-table';
import { ExcelRow } from '../interface/excel-row';
import { SharedDataService } from './shared-data.service';

@Injectable({
  providedIn: 'root'
})
export class DashboardTableService {
 
  private apiUrl = 'https://localhost:7259/api/Project';
  private projectsData: BehaviorSubject<DashboardTable[]> = new BehaviorSubject<DashboardTable[]>([]);


  constructor(private http: HttpClient, private sharedDataService: SharedDataService) {}

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
  // Method to update projects
  updateProjects(projectData: ExcelRow): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    // Log the request payload before sending it
    console.log('Request Payload:', projectData);

    return this.http.post(`${this.apiUrl}/update`, projectData, { headers })
      .pipe(
        catchError(this.handleError)
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
    return this.http.get<DashboardTable[]>(`https://localhost:7259/api/Project/search?query=${searchQuery}`);
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
