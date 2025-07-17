import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AccesoComponent } from './acceso.component';
import { AuthService } from '../../services/auth.service';

describe('AccesoComponent', () => {
  let component: AccesoComponent;
  let fixture: ComponentFixture<AccesoComponent>;
  let mockRouter: jasmine.SpyObj<Router>;
  let mockAuthService: jasmine.SpyObj<AuthService>;

  beforeEach(async () => {
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    const authServiceSpy = jasmine.createSpyObj('AuthService', ['iniciarSesion']);

    await TestBed.configureTestingModule({
      imports: [AccesoComponent, ReactiveFormsModule],
      providers: [
        { provide: Router, useValue: routerSpy },
        { provide: AuthService, useValue: authServiceSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AccesoComponent);
    component = fixture.componentInstance;
    mockRouter = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    mockAuthService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('formulario inválido si los campos están vacíos', () => {
    expect(component.loginForm.valid).toBeFalsy();
  });

  it('debe validar username con mínimo 3 caracteres', () => {
    const usernameControl = component.loginForm.get('username');
    
    usernameControl?.setValue('ab');
    expect(usernameControl?.errors?.['minlength']).toBeTruthy();
    
    usernameControl?.setValue('abc');
    expect(usernameControl?.errors?.['minlength']).toBeFalsy();
  });

  it('debe validar password con mínimo 6 caracteres', () => {
    const passwordControl = component.loginForm.get('password');
    
    passwordControl?.setValue('12345');
    expect(passwordControl?.errors?.['minlength']).toBeTruthy();
    
    passwordControl?.setValue('123456');
    expect(passwordControl?.errors?.['minlength']).toBeFalsy();
  });

  it('debe iniciar sesión con credenciales válidas', () => {
    mockAuthService.iniciarSesion.and.returnValue(true);
    
    component.loginForm.patchValue({
      username: 'usuario123',
      password: 'password123'
    });
    
    component.iniciarSesion();
    
    expect(mockAuthService.iniciarSesion).toHaveBeenCalledWith('usuario123', 'password123');
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/dashboard']);
    expect(component.errorMessage).toBe('');
  });

  it('debe mostrar error con credenciales inválidas', () => {
    mockAuthService.iniciarSesion.and.returnValue(false);
    
    component.loginForm.patchValue({
      username: 'usuario123',
      password: 'wrongpassword'
    });
    
    component.iniciarSesion();
    
    expect(mockAuthService.iniciarSesion).toHaveBeenCalledWith('usuario123', 'wrongpassword');
    expect(mockRouter.navigate).not.toHaveBeenCalled();
    expect(component.errorMessage).toBe('Usuario o contraseña incorrectos');
  });

  it('no debe enviar formulario si es inválido', () => {
    component.loginForm.patchValue({
      username: 'ab', // Muy corto
      password: '123'  // Muy corto
    });
    
    component.iniciarSesion();
    
    expect(mockAuthService.iniciarSesion).not.toHaveBeenCalled();
    expect(mockRouter.navigate).not.toHaveBeenCalled();
    expect(component.loginForm.get('username')?.touched).toBeTruthy();
    expect(component.loginForm.get('password')?.touched).toBeTruthy();
  });

  it('debe limpiar formulario y mensajes de error', () => {
    component.loginForm.patchValue({
      username: 'usuario123',
      password: 'password123'
    });
    component.errorMessage = 'Error de prueba';
    
    component.limpiarFormulario();
    
    expect(component.loginForm.get('username')?.value).toBeNull();
    expect(component.loginForm.get('password')?.value).toBeNull();
    expect(component.errorMessage).toBe('');
  });

  it('debe navegar a registro', () => {
    component.irARegistro();
    
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/registro']);
  });

  it('debe marcar todos los campos como touched si el formulario es inválido', () => {
    // Dejar formulario vacío (inválido)
    component.iniciarSesion();
    
    expect(component.loginForm.get('username')?.touched).toBeTruthy();
    expect(component.loginForm.get('password')?.touched).toBeTruthy();
    expect(mockAuthService.iniciarSesion).not.toHaveBeenCalled();
  });

  it('debe validar campos requeridos', () => {
    const usernameControl = component.loginForm.get('username');
    const passwordControl = component.loginForm.get('password');
    
    expect(usernameControl?.errors?.['required']).toBeTruthy();
    expect(passwordControl?.errors?.['required']).toBeTruthy();
    
    usernameControl?.setValue('usuario');
    passwordControl?.setValue('password');
    
    expect(usernameControl?.errors?.['required']).toBeFalsy();
    expect(passwordControl?.errors?.['required']).toBeFalsy();
  });

  it('debe limpiar mensaje de error cuando se inicia sesión exitosamente', () => {
    mockAuthService.iniciarSesion.and.returnValue(true);
    component.errorMessage = 'Error anterior';
    
    component.loginForm.patchValue({
      username: 'usuario123',
      password: 'password123'
    });
    
    component.iniciarSesion();
    
    expect(component.errorMessage).toBe('');
  });
});