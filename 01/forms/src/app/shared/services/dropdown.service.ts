import { EstadoBr } from './../models/estado-br.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DropdownService {

  constructor(private http: HttpClient) { }

  getEstadosBr(): Observable<EstadoBr[]>{
    return this.http.get<EstadoBr[]>('assets/dados/estados.json');
}
}
