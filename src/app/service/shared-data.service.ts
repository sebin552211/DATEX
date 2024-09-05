import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { DashboardTable } from '../interface/dashboard-table';

@Injectable({
  providedIn: 'root'
})
export class SharedDataService {

  constructor() { }

  private projectsSubject = new BehaviorSubject<DashboardTable[]>([]);
  projects$: Observable<DashboardTable[]> = this.projectsSubject.asObservable();

  updateProjects(projects: DashboardTable[]): void {
    this.projectsSubject.next(projects);
}
}