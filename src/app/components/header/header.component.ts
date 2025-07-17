
import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService, SesionUsuario } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit, OnDestroy {
  usuarioActual: SesionUsuario | null = null;
  private subscription: Subscription = new Subscription();

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.subscription = this.authService.usuarioActual$.subscribe(
      usuario => {
        this.usuarioActual = usuario;
      }
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  cerrarSesion() {
    this.authService.cerrarSesion();
    this.router.navigate(['/acceso']);
  }

  get colorCinta(): string {
    return this.usuarioActual?.perfil === 'administrador' ? 'bg-danger' : 'bg-success';
  }

  get textoCompleto(): string {
    if (!this.usuarioActual) return '';
    return `${this.usuarioActual.nombre} ${this.usuarioActual.apellido} (@${this.usuarioActual.username}) - ${this.usuarioActual.perfil.toUpperCase()}`;
  }
}


