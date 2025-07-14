import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http'; 
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';


interface Oficina {
  id: number;
  titulo: string;
  descripcion: string;
  precio: string;
  imagen: string;
  alt: string;
  tipo: string;
}

@Component({
  selector: 'app-oficinas',
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule 
  ],
  templateUrl: './oficinas.component.html',
  styleUrls: ['./oficinas.component.css']
})
export class OficinasComponent implements OnInit { 
  
  oficinas: Oficina[] = []; 
  private dataUrl = 'https://jaimevalenciav.github.io/productos/productos.json'; 

  constructor(private http: HttpClient) { } 

  ngOnInit(): void {
    this.obtenerOficinas(); 
  }

  
  obtenerOficinas(): void {
    this.http.get<Oficina[]>(this.dataUrl) 
      .pipe(
        catchError(error => {
          console.error('Error al obtener los datos de las oficinas:', error);
          return of([]); 
        })
      )
      .subscribe(data => {
        
        this.oficinas = data.filter(item => item.tipo === 'oficina');
        console.log('Oficinas cargadas:', this.oficinas);
      });
  }

  
  reservarOficina(oficinaId: number): void {
    console.log(`Reservando oficina ${oficinaId}`);
    
    const oficina = this.oficinas.find(o => o.id === oficinaId);
    if (oficina) {
      
      alert(`Has seleccionado ${oficina.titulo}. Precio: ${oficina.precio}`);
    }
  }
}
