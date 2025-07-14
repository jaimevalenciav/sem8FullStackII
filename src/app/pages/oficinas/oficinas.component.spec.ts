import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser'; // Corregido: de '=>' a 'from'
import { OficinasComponent } from './oficinas.component';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';


interface MockApiItem {
  id: number;
  titulo: string;
  descripcion: string;
  precio: string;
  imagen: string;
  alt: string;
  tipo: string; 
}

describe('OficinasComponent', () => {
  let component: OficinasComponent;
  let fixture: ComponentFixture<OficinasComponent>;
  let httpTestingController: HttpTestingController; 

  
  const mockApiData: MockApiItem[] = [
    {
      id: 1,
      titulo: 'Oficina Ejecutiva',
      descripcion: 'Espacio premium para reuniones directivas.',
      precio: '$150.000 por Semana',
      imagen: './assets/oficina1.jpg',
      alt: 'Oficina Ejecutiva',
      tipo: 'oficina'
    },
    {
      id: 2,
      titulo: 'Sala de Conferencias', // Este es de tipo 'sala' y no debería aparecer
      descripcion: 'Sala grande para eventos.',
      precio: '$80.000 por Día',
      imagen: './assets/sala1.jpg',
      alt: 'Sala de Conferencias',
      tipo: 'sala'
    },
    {
      id: 3,
      titulo: 'Oficina Colaborativa',
      descripcion: 'Área abierta para equipos de trabajo.',
      precio: '$100.000 por Semana',
      imagen: './assets/oficina2.jpeg',
      alt: 'Oficina Colaborativa',
      tipo: 'oficina'
    }
  ];

  
  const expectedOficinasAfterFilter = mockApiData.filter(item => item.tipo === 'oficina');

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        OficinasComponent, 
        HttpClientTestingModule 
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(OficinasComponent);
    component = fixture.componentInstance;
    httpTestingController = TestBed.inject(HttpTestingController); 
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  
  it('should display an alert when "Reservar Ahora" button is clicked (without JSON loading)', () => {
    
    component.oficinas = [
      {
        id: 10,
        titulo: 'Oficina Test',
        descripcion: 'Una oficina de prueba.',
        precio: '$99 por Semana',
        imagen: 'test.jpg',
        tipo : 'oficinas',
        alt : 'Oficina'
      }
    ];
    fixture.detectChanges(); 

    spyOn(window, 'alert'); 

    
    const reservaButton = fixture.debugElement.query(By.css('.reserva-btn'));
    expect(reservaButton).toBeTruthy('El botón de reserva debería existir en el DOM.');

    reservaButton.triggerEventHandler('click', null); 

    
    expect(window.alert).toHaveBeenCalledWith(
      `Has seleccionado Oficina Test. Precio: $99 por Semana`
    );
  });
});
