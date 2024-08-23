import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DashboardTable } from '../interface/dashboard-table';

@Injectable({
  providedIn: 'root'
})
export class DashboardTableService {

  private apiUrl = 'https://localhost:7259/api/Project';

  constructor(private http: HttpClient) {}

  getProjects(): Observable<DashboardTable[]> {
    return this.http.get<DashboardTable[]>(this.apiUrl);
  }
  getProjectsName(searchQuery: string = ''): Observable<DashboardTable[]> {
    return this.http.get<DashboardTable[]>(`https://localhost:7259/api/Project/search?query=${searchQuery}`);
  }
  getProjectsPaged(pageNumber: number, pageSize: number): Observable<DashboardTable[]> {
    return this.http.get<DashboardTable[]>(`https://localhost:7259/api/Project/paged?pageNumber=${pageNumber}&pageSize=${pageSize}`);
  }
 
  
}
