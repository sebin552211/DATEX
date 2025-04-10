import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardFilterService{

  constructor() { }
  private filterSelectionSubject = new Subject<{ filterKey: string, value: string }>();
  filterSelection$ = this.filterSelectionSubject.asObservable();
  private filtersSelectionSubject = new Subject<{ filterKey: string, value: string }>();
  filterSelections$ = this.filtersSelectionSubject.asObservable();
  private surveyIdSource = new BehaviorSubject<string | null>(null);
  surveyId$ = this.surveyIdSource.asObservable();
  private DUSource = new BehaviorSubject<string | null>(null);
  Du$ = this.DUSource.asObservable();
  private filterSource = new BehaviorSubject<{ surveyId: string | null; DU: string | null; quarter: string | null }>({ surveyId: null, DU: null, quarter: null });
  filters$ = this.filterSource.asObservable();


  selectFilter(filterKey: string, value: string) {
    this.filterSelectionSubject.next({ filterKey, value });
  }

updateVOCAnalysis(DU: string | null, surveyId: string | null, Quarter:string | null): void {
  const currentFilters = this.filterSource.value;
  this.filterSource.next({
    ...currentFilters,
    surveyId: surveyId,
    DU: DU,
    quarter: Quarter,
  });
}

}
