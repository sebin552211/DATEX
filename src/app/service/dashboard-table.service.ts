import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { DashboardTable } from '../interface/dashboard-table';
import { ExcelRow } from '../interface/excel-row';

@Injectable({
  providedIn: 'root'
})
export class DashboardTableService {
  private apiUrl = 'https://localhost:7259/api/Project';

  constructor(private http: HttpClient) {}

  // Method to get projects
  getProjects(): Observable<DashboardTable[]> {
    return this.http.get<DashboardTable[]>(this.apiUrl)
      .pipe(
        catchError(this.handleError)
      );
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
}
