import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import moment from 'moment';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent {
  registroForm: FormGroup;
  errorMessage: string = '';
  successMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {
    this.registroForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(2)]],
      apellido: ['', [Validators.required, Validators.minLength(2)]],
      username: ['', [Validators.required, Validators.minLength(3)]],
      correo: ['', [Validators.required, Validators.email]],
      fechaNacimiento: ['', [Validators.required, this.edadMinimaValidator(13)]],
      direccionDespacho: [''],
      perfil: ['usuario', Validators.required],
      password: ['', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(18),
        Validators.pattern(/^(?=.*[A-Z])(?=.*\d).+$/)
      ]],
      repetirPassword: ['', Validators.required]
    }, { validators: this.passwordsIguales });
  }

  edadMinimaValidator(minEdad: number) {
    return (control: any) => {
      if (!control.value) return null;
      const birthDate = moment(control.value);
      const hoy = moment();
      return hoy.diff(birthDate, 'years') >= minEdad ? null : { edadInvalida: true };
    };
  }

  passwordsIguales(form: FormGroup) {
    const pass = form.get('password')?.value;
    const repeatPass = form.get('repetirPassword')?.value;
    return pass === repeatPass ? null : { passwordsNoCoinciden: true };
  }

  registrarUsuario() {
    if (this.registroForm.valid) {
      const datosUsuario = { ...this.registroForm.value };
      delete datosUsuario.repetirPassword; // Eliminar la confirmación de contraseña
      
      if (this.authService.registrarUsuario(datosUsuario)) {
        this.successMessage = 'Usuario registrado exitosamente. Redirigiendo al login...';
        this.errorMessage = '';
        
        // Redirigir al login después de 2 segundos
        setTimeout(() => {
          this.router.navigate(['/acceso']);
        }, 2000);
      } else {
        this.errorMessage = 'Error al registrar usuario. El nombre de usuario o correo ya existen.';
        this.successMessage = '';
      }
    } else {
      this.registroForm.markAllAsTouched();
    }
  }

  limpiarFormulario() {
    this.registroForm.reset();
    this.registroForm.patchValue({ perfil: 'usuario' }); // Resetear perfil a usuario
    this.errorMessage = '';
    this.successMessage = '';
  }

  irALogin() {
    this.router.navigate(['/acceso']);
  }
}