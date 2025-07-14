import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';


interface Sala {
  id: number;
  titulo: string;
  descripcion: string;
  precio: string;
  imagen: string;
  alt: string;
  capacidad?: string;
  equipamiento?: string[];
  tipo: string; 
}

@Component({
  selector: 'app-salas',
  templateUrl: './salas.component.html',
  styleUrls: ['./salas.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule
  ]
})
export class SalasComponent implements OnInit { 
  
  salas: Sala[] = [];
  private dataUrl = 'https://jaimevalenciav.github.io/productos/productos.json';

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.obtenerSalas();
  }

  
  obtenerSalas(): void {
    this.http.get<Sala[]>(this.dataUrl)
      .pipe(
        catchError(error => {
          console.error('Error al obtener los datos de las salas:', error);
          return of([]);
        })
      )
      .subscribe(data => {
        this.salas = data.filter(item => item.tipo === 'sala');
        console.log('Salas cargadas:', this.salas);
      });
  }

  reservarSala(salaId: number): void {
    console.log(`Reservando sala ${salaId}`);
    
    const sala = this.salas.find(s => s.id === salaId);
    if (sala) {
      alert(`Has seleccionado ${sala.titulo}. Capacidad: ${sala.capacidad}. Precio: ${sala.precio}`);
    }
  }

  
  verEquipamiento(salaId: number): void {
    const sala = this.salas.find(s => s.id === salaId);
    if (sala && sala.equipamiento) {
      const equipos = sala.equipamiento.join('\n• ');
      alert(`Equipamiento de ${sala.titulo}:\n\n• ${equipos}`);
    } else if (sala) {
      alert(`No hay equipamiento listado para ${sala.titulo}.`);
    }
  }
}
