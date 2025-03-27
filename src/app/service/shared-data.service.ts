import { ChangeDetectorRef, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { DashboardTable } from '../interface/dashboard-table';
import { HttpClient, HttpResponse } from '@microsoft/signalr';

@Injectable({
  providedIn: 'root'
})


export class SharedDataService {

  private projectsSubject = new BehaviorSubject<DashboardTable[]>([]);
  projects$: Observable<DashboardTable[]> = this.projectsSubject.asObservable();
  private dateSubject = new BehaviorSubject<string | null>(null);
  currentDate$ = this.dateSubject.asObservable();
  private projectSource = new BehaviorSubject<DashboardTable[]>([]); 
  project$ = this.projectSource.asObservable();
  private cproSource = new BehaviorSubject<DashboardTable[]>([]);
  cpro$ = this.cproSource.asObservable();
  private uploadResponseSource = new Subject<string>();
  uploadResponse$ = this.uploadResponseSource.asObservable();

  updateProjects(projects: DashboardTable[]): void {
    this.projectsSubject.next(projects);
  }
  setDate(date: string): void {
    this.dateSubject.next(date);
  }
  addProject(project: DashboardTable) {   
    const currentProjects = this.projectSource.value;   
    const updatedProjects = [...currentProjects, project];   
    this.projectSource.next(updatedProjects); 
  }
  removeProject(project: DashboardTable) {
    const currentProjects = this.projectSource.value;
    const updatedProjects = currentProjects.filter(p => p.projectId !== project.projectId);
    this.projectSource.next(updatedProjects);
  }  

  
  getStatusProjects(cpro:DashboardTable[]): DashboardTable[] {
    return cpro || [];
  }

  updateCpro(cpro: DashboardTable[]) {
    this.cproSource.next(cpro);
    localStorage.setItem('cpro', JSON.stringify(cpro));
  }

  loadCproFromStorage() {
    const savedCpro = localStorage.getItem('cpro');
    if (savedCpro) {
      this.cproSource.next(JSON.parse(savedCpro));
    }
  }

  addProjectToCpro(project: DashboardTable) {
    const currentCpro = this.cproSource.value;
    if (!currentCpro.some((p) => p.projectId === project.projectId)) {
      const updatedCpro = [...currentCpro, project];
      this.updateCpro(updatedCpro);
    }
  }

  removeProjectFromCpro(project: DashboardTable) {
    const currentCpro = this.cproSource.value;
    const updatedCpro = currentCpro.filter((p) => p.projectId !== project.projectId);
    this.updateCpro(updatedCpro);
  }
  setUploadResponse(message: string): void {
    this.uploadResponseSource.next(message);
  }
}