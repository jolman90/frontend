import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Ciudad } from './models/ciudad';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CiudadesService {

  constructor(private http: HttpClient) { }

  consultarCiudades(): Observable<Ciudad[]>{
    return this.http.get<Ciudad[]>('http://localhost:8080/ciudad/obtenerCiudades');
  }

  crearCiudad(ciudad:Ciudad): Observable<Ciudad>{
    return this.http.post<Ciudad>('http://localhost:8080/ciudad/guardarNuevaCiudad',ciudad);
  }

  consultarCiudadesPais(idpais:number): Observable<Ciudad[]>{
    return this.http.get<Ciudad[]>(`http://localhost:8080/ciudad/buscarPorPaisId/${idpais}`);
  }

}