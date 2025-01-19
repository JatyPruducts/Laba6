import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ITour } from '../models/tour.model';

@Injectable({ providedIn: 'root' })
export class TourService {
  private apiUrl = 'http://localhost:5135/api/tours'; 

  constructor(private http: HttpClient) {}

  getAllTours(): Observable<ITour[]> {
    return this.http.get<ITour[]>(this.apiUrl);
  }

  getTourById(id: number): Observable<ITour> {
    return this.http.get<ITour>(`${this.apiUrl}/${id}`);
  }

  // и т.д. (create, update, delete) при необходимости
}