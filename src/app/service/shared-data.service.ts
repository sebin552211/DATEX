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
  private dateSubject = new BehaviorSubject<string | null>(null);
  currentDate$ = this.dateSubject.asObservable();

  updateProjects(projects: DashboardTable[]): void {
    this.projectsSubject.next(projects);
  }
  setDate(date: string): void {
    this.dateSubject.next(date);
  }
}