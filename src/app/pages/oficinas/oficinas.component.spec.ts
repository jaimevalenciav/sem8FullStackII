import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser'; // Corregido: de '=>' a 'from'
import { OficinasComponent } from './oficinas.component';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

// Define la interfaz para los datos mockeados, debe coincidir con la estructura de tu JSON
interface MockApiItem {
  id: number;
  titulo: string;
  descripcion: string;
  precio: string;
  imagen: string;
  alt: string;
  tipo: string; // Crucial para el filtrado
}

describe('OficinasComponent', () => {
  let component: OficinasComponent;
  let fixture: ComponentFixture<OficinasComponent>;
  let httpTestingController: HttpTestingController; // Para mockear las peticiones HTTP

  // Datos mockeados que simulan la respuesta completa de la API
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

  // Datos esperados en el componente después de que se aplique el filtro 'tipo: oficina'
  const expectedOficinasAfterFilter = mockApiData.filter(item => item.tipo === 'oficina');

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        OficinasComponent, // Importa el componente standalone
        HttpClientTestingModule // Importa el módulo para mockear HttpClient
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(OficinasComponent);
    component = fixture.componentInstance;
    httpTestingController = TestBed.inject(HttpTestingController); // Inyecta el controlador de test
  });

  afterEach(() => {
    // Verifica que no haya peticiones HTTP pendientes después de cada prueba
    httpTestingController.verify();
  });

  // Prueba 1: Verifica que el componente se cree correctamente
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Nueva Prueba 3: Verifica que al presionar el botón "Reservar Ahora" se muestra una alerta
  // Esta prueba no considera la carga de datos del JSON, sino que simula el estado del componente
  it('should display an alert when "Reservar Ahora" button is clicked (without JSON loading)', () => {
    // Simula directamente el array de oficinas en el componente
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
    fixture.detectChanges(); // Actualiza el DOM para que el botón se renderice

    spyOn(window, 'alert'); // Espía el método 'window.alert'

    // Busca el botón de reserva en el DOM
    const reservaButton = fixture.debugElement.query(By.css('.reserva-btn'));
    expect(reservaButton).toBeTruthy('El botón de reserva debería existir en el DOM.');

    reservaButton.triggerEventHandler('click', null); // Simula un clic en el botón

    // Verifica que window.alert haya sido llamado con el mensaje esperado
    expect(window.alert).toHaveBeenCalledWith(
      `Has seleccionado Oficina Test. Precio: $99 por Semana`
    );
  });
});
