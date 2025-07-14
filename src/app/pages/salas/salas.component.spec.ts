import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { SalasComponent } from './salas.component';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

// Define la interfaz para los datos mockeados, debe coincidir con la estructura de tu JSON
interface MockApiItem {
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

describe('SalasComponent', () => {
  let component: SalasComponent;
  let fixture: ComponentFixture<SalasComponent>;
  let httpTestingController: HttpTestingController; 

  
  const mockApiData: MockApiItem[] = [
    {
      id: 1,
      titulo: 'Sala de Conferencias Principal',
      descripcion: 'Ideal para eventos y grandes reuniones.',
      precio: '$150.000 por Semana',
      imagen: './assets/sala1.jpg',
      alt: 'Sala de Conferencias Principal',
      capacidad: '30 personas',
      equipamiento: ['Proyector 4K', 'Sistema de sonido envolvente'],
      tipo: 'sala'
    },
    {
      id: 2,
      titulo: 'Oficina Ejecutiva', 
      descripcion: 'Oficina privada para directivos.',
      precio: '$200.000 por Semana',
      imagen: './assets/oficina1.jpg',
      alt: 'Oficina Ejecutiva',
      tipo: 'oficina'
    },
    {
      id: 3,
      titulo: 'Sala de Brainstorming',
      descripcion: 'Espacio creativo para sesiones de lluvia de ideas.',
      precio: '$75.000 por Semana',
      imagen: './assets/sala2.jpg',
      alt: 'Sala de Brainstorming',
      capacidad: '8 personas',
      equipamiento: ['Pizarra digital', 'Mobiliario flexible'],
      tipo: 'sala'
    }
  ];

  
  const expectedSalasAfterFilter = mockApiData.filter(item => item.tipo === 'sala');

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        SalasComponent, 
        HttpClientTestingModule 
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(SalasComponent);
    component = fixture.componentInstance;
    httpTestingController = TestBed.inject(HttpTestingController); 
  });

  afterEach(() => {
    
    httpTestingController.verify();
  });

  
  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
