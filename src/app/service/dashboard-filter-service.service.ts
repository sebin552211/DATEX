import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardFilterService{

  constructor() { }
  private filterSelectionSubject = new Subject<{ filterKey: string, value: string }>();
  filterSelection$ = this.filterSelectionSubject.asObservable();

  selectFilter(filterKey: string, value: string) {
    this.filterSelectionSubject.next({ filterKey, value });
}
}
