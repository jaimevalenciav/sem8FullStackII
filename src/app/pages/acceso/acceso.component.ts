import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import moment from 'moment';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-acceso',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './acceso.component.html',
  styleUrls: ['./acceso.component.css']
})
export class AccesoComponent {
  accesoForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.accesoForm = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      fechaNacimiento: ['', [Validators.required, this.edadMinimaValidator(13)]],
      direccionDespacho: [''],
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

  enviarFormulario() {
    if (this.accesoForm.valid) {
      console.log('Datos enviados:', this.accesoForm.value);
      alert('Formulario válido y enviado con éxito');
    } else {
      this.accesoForm.markAllAsTouched();
    }
  }

  limpiarFormulario() {
    this.accesoForm.reset();
  }
}
