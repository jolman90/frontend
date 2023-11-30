import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pais } from './models/pais';
//import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PaisesService {

  constructor(private http: HttpClient) { }

  consultarPaises(): Observable<Pais[]>{
    return this.http.get<Pais[]>('http://localhost:8080/Pais/obtenerPaises');
  }

  crearPais(pais:Pais): Observable<Pais>{
    return this.http.post<Pais>('http://localhost:8080/Pais/CrearNuevoPais',pais);
  }

  actualizarPais(pais:Pais): Observable<Pais>{
    return this.http.post<Pais>('http://localhost:8080/Pais/CrearNuevoPais',pais);
  }

}