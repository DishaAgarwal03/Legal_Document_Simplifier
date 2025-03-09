import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
// for simplying the given text
@Injectable({ providedIn: 'root' })
export class SimplifierService {
  private apiUrl = 'http://127.0.0.1:8000/api/clause-simplify';
  
  constructor(private http: HttpClient) {}
  
  simplifyText(text: string): Observable<{ simplified_text: string }> {
    return this.http.post<{ simplified_text: string }>(this.apiUrl, { text });
  }
}