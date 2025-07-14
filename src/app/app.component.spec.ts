import { TestBed, ComponentFixture } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';
import { Component, Input } from '@angular/core';

// Mock para HeaderComponent
// Simula que HeaderComponent renderiza un h1 con el título.
@Component({
  selector: 'app-header',
  template: '<h1>{{ title }}</h1>', // Se mantiene el h1 en el mock para simular un caso común
  standalone: true
})
class MockHeaderComponent {
  @Input() title: string | undefined;
}

// Mocks para otros componentes hijos que AppComponent utiliza
@Component({ selector: 'app-navigation', template: '', standalone: true })
class MockNavigationComponent {}

@Component({ selector: 'app-footer', template: '', standalone: true })
class MockFooterComponent {}


describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AppComponent,
        RouterTestingModule,
        // Importa los mocks en lugar de los componentes reales
        MockHeaderComponent,
        MockNavigationComponent,
        MockFooterComponent
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); // Dispara la detección de cambios inicial
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  // Nueva prueba: Verifica que el componente FooterComponent se carga
  it('should load the app-footer component', () => {
    const footerElement = fixture.debugElement.query(By.css('app-footer'));
    expect(footerElement).toBeTruthy('El componente <app-footer> debería existir en el DOM.');
  });
});
