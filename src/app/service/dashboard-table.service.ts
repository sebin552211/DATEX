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
}
