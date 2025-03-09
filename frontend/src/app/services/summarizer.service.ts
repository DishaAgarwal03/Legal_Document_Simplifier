import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class SummarizerService {
  private apiUrl = 'http://127.0.0.1:8000/api/summarize';
  
  constructor(private http: HttpClient) {}
  
  summarizeFile(file: File): Observable<{ summary: string }> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post<{ summary: string }>(this.apiUrl, formData);
  }
}