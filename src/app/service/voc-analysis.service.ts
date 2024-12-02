import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, throwError } from 'rxjs';
import { VocAnalysis } from '../interface/voc-analysis';

@Injectable({
  providedIn: 'root'
})
export class VocAnalysisService {
  private apiUrl = 'https://localhost:7259/api/VocAnalysis';

  constructor(private http: HttpClient) {}

  getVocAnalyses(): Observable<VocAnalysis[]> {
    return this.http.get<VocAnalysis[]>(this.apiUrl);
  }

  addVocAnalyses(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);
  
    return this.http.post<any>(`${this.apiUrl}/upload`, formData, {
      observe: 'response', 
      responseType: 'text' as 'json'
    }).pipe(
      map(response => {
        if (response.body) {
          return response.body; 
        } else {
          throw new Error('Empty response from server');
        }
      }),
      catchError(error => {
        if (error.error instanceof ProgressEvent) {
          throw new Error('Network error or server not reachable');
        }
        if (typeof error.error === 'string') {
          throw new Error(error.error);
        }
        return throwError(() => error);
      })
    );
  }

}
