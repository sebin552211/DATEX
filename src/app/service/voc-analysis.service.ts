import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
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
}
