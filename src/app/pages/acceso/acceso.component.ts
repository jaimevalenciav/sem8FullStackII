import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-acceso',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './acceso.component.html',
  styleUrls: ['./acceso.component.css']
})
export class AccesoComponent {
  loginForm: FormGroup;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  iniciarSesion() {
    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value;
      
      if (this.authService.iniciarSesion(username, password)) {
        this.errorMessage = ''; 
        this.router.navigate(['/dashboard']);
      } else {
        this.errorMessage = 'Usuario o contraseña incorrectos';
      }
    } else {
      this.loginForm.markAllAsTouched();
    }
  }

  irARegistro() {
    this.router.navigate(['/registro']);
  }

  limpiarFormulario() {
    this.loginForm.reset();
    this.errorMessage = '';
  }
}