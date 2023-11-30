import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CiudadesService } from '../ciudades.service';
import { Ciudad } from '../models/ciudad';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatGridListModule } from '@angular/material/grid-list';
import { Pais } from '../models/pais';
import { PaisesService } from '../paises.service';
import { MatSelectModule } from '@angular/material/select';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-ciudades',
  standalone: true,
  imports: [CommonModule,
            MatTableModule,
            MatCardModule,
            MatMenuModule,
            MatIconModule,
            MatButtonModule,
            ReactiveFormsModule,
            MatInputModule,
            MatGridListModule,
            MatSelectModule],
  templateUrl: './ciudades.component.html',
  styleUrl: './ciudades.component.scss'
})
export class CiudadesComponent implements OnInit{

  dataSource: MatTableDataSource<Object> = new MatTableDataSource<Object>([]);

  listColumnas: string[] = [
    'id',
    'nombre',
    'descripcion',
    'latitud',
    'longitud',
    'idpais'
  ];

  form!: FormGroup;
 
  isForm!: Promise<any>;

  ciudad:Ciudad;

  listaPaises:Pais[];
  idpais:number;

  constructor(private ciudadesService:CiudadesService,private formBuilder: FormBuilder, private paisesService:PaisesService,private route: ActivatedRoute){  
    this.route.params.subscribe((data:Params)=>{
      this.idpais=data['idpais'];
    });
  }

  ngOnInit(): void {
    this.iniciarFormulario();
    this.cargarDatos();
  }

  private cargarDatos(): void{
    if (this.idpais!==0){
      this.ciudadesService.consultarCiudadesPais(this.idpais).subscribe((respuesta:Ciudad[])=>{
        this.dataSource=new MatTableDataSource<Object>(respuesta);
      });

    }else{
      this.ciudadesService.consultarCiudades().subscribe((respuesta:Ciudad[])=>{
        this.dataSource=new MatTableDataSource<Object>(respuesta);
      });
    }
    
    this.paisesService.consultarPaises().subscribe((respuesta:Pais[])=>{
      this.listaPaises=respuesta;
    })
   }
  

   private iniciarFormulario(): void {
    this.isForm = Promise.resolve(
      (this.form = this.formBuilder.group({
        nombre: new FormControl(null, [Validators.required]),
        descripcion: new FormControl(null,  [Validators.required]),
        latitud: new FormControl(null, []),
        longitud: new FormControl(null, []),
        idpais: new FormControl(null, []),
      }))
    );
  }

  guardarCiudad(): void{
    const values = this.form.value;
    let ciudad: Ciudad={
      nombre:values.nombre,
      descripcion:values.descripcion,
      latitud:values.latitud,
      longitud:values.longitud,
      idpais:values.idpais
    };
    this.ciudadesService.crearCiudad(ciudad).subscribe((respuesta:Ciudad)=>{
      this.cargarDatos();
    });
  }

  
}