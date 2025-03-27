import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { catchError, lastValueFrom, map, Observable, tap, throwError } from 'rxjs';
import { VocAnalysis } from '../interface/voc-analysis';

@Injectable({
  providedIn: 'root'
})
export class VocAnalysisService {
  private apiUrl = 'https://localhost:7259/api/VocAnalysis'; 

  constructor(private http: HttpClient) {}

  getVocAnalyses(): Observable<any> {
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

  updateFeedback(surveyId: string, newFeedback: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/update-feedback`, { surveyId, newFeedback });
  }

  updateDatabaseWithFile(file: File, surveyId: string): Promise<void> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('surveyId', surveyId);
  
    return lastValueFrom(this.http.put(`${this.apiUrl}/update`, formData)).then(() => {
      console.log(`Successfully updated feedback for Survey ID ${surveyId}`);
    }).catch((error) => {
      console.error(`Failed to update feedback for Survey ID ${surveyId}`, error);
      throw error; 
    });
  }

  getAllSurveyIds(): Observable<any>{
    return this.http.get<any[]>(`${this.apiUrl}/surveyId`).pipe(
      tap(response => {
          console.log("Raw Response: ", response); 
      })
  );
}

getFeedback(DU: string | null, SurveyId: string | null, Quarter: string | null): Observable<any> {
  const url = `${this.apiUrl}`;

  // Ensure at least one parameter is provided
  if (!DU && !SurveyId && !Quarter) {
    throw new Error('At least one of DU, SurveyId, or Quarter must be provided.');
  }

  // Construct query parameters dynamically, excluding null values
  const params: { [key: string]: string } = {};
  if (DU !== null) {
    params['Du'] = DU;
  }
  if (SurveyId !== null) {
    params['SurveyId'] = SurveyId;
  }
  if (Quarter !== null) {
    params['Quarter'] = Quarter;
  }

  const headers = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  return this.http.get<any>(url, { params, headers });
}


  addDuInSurveyId(DU:string, SurveyId:string):Observable<VocAnalysis>{
      const url = `${this.apiUrl}/Post/DU`;
      const params = { Du: DU, SurveyId: SurveyId };
  
      // Optional: Set headers if needed
      const headers = new HttpHeaders({
        'Content-Type': 'application/json'
      });
  
      return this.http.post<VocAnalysis>(url, null, { params, headers });
  }

  DeleteDUinSurveyId( SurveyId:string):Observable<void>  {
    const url = `https://localhost:7259/lapi/VocAnalysis/Delete/DU?SurveyId=${encodeURIComponent(SurveyId)}`;
    if (!SurveyId) {
      throw new Error("SurveyId is required to delete DU.");
    }
    console.log("Service is working")
    return this.http.delete<void>(url).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error("Delete request failed:", error);
        return throwError(() => new Error("Failed to delete AU"));
      })
    );
  }//https://localhost:7259/api/VocAnalysis/Delete/DU?SurveyId=ESS-APT-346-E

  uploadExcelAndGetScore(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/calculate`);
  }

  uploadExcelAndGetScoreBysSurveyId(SurveyId: string | null, Quarter: string | null, DU: string | null): Observable<any> {
    const url = `${this.apiUrl}/calculate/SurveyId`;
    const params = new HttpParams()
    .set('SurveyId', SurveyId ?? '')
    .set('Quarter', Quarter ?? '')
    .set('DU', DU ?? '');    
    console.log("the api is working: ", this.http.get<any>(url, { params }))
    return this.http.get<any>(url, { params });
  }  

}