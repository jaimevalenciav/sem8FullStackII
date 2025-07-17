import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface Usuario {
  id: string;
  nombre: string;
  apellido: string;
  correo: string;
  username: string;
  fechaNacimiento: string;
  direccionDespacho?: string;
  password: string;
  perfil: 'usuario' | 'administrador';
}

export interface SesionUsuario {
  id: string;
  nombre: string;
  apellido: string;
  username: string;
  perfil: 'usuario' | 'administrador';
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private usuarioActualSubject = new BehaviorSubject<SesionUsuario | null>(null);
  public usuarioActual$ = this.usuarioActualSubject.asObservable();

  constructor() {
    // Verificar si hay una sesión guardada al inicializar
    const sesionGuardada = localStorage.getItem('sesionUsuario');
    if (sesionGuardada) {
      this.usuarioActualSubject.next(JSON.parse(sesionGuardada));
    }
  }

  registrarUsuario(usuario: Omit<Usuario, 'id'>): boolean {
    try {
      // Verificar si ya existe el username o correo
      if (this.existeUsuario(usuario.username, usuario.correo)) {
        return false;
      }

      // Obtener usuarios existentes
      const usuarios = this.obtenerUsuarios();
      
      // Crear nuevo usuario con ID único
      const nuevoUsuario: Usuario = {
        ...usuario,
        id: this.generarId()
      };

      // Agregar a la lista y guardar
      usuarios.push(nuevoUsuario);
      localStorage.setItem('usuarios', JSON.stringify(usuarios));
      
      return true;
    } catch (error) {
      console.error('Error al registrar usuario:', error);
      return false;
    }
  }

  iniciarSesion(username: string, password: string): boolean {
    try {
      const usuarios = this.obtenerUsuarios();
      const usuario = usuarios.find(u => u.username === username && u.password === password);
      
      if (usuario) {
        const sesionUsuario: SesionUsuario = {
          id: usuario.id,
          nombre: usuario.nombre,
          apellido: usuario.apellido,
          username: usuario.username,
          perfil: usuario.perfil
        };
        
        // Guardar sesión
        localStorage.setItem('sesionUsuario', JSON.stringify(sesionUsuario));
        this.usuarioActualSubject.next(sesionUsuario);
        
        return true;
      }
      
      return false;
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      return false;
    }
  }

  cerrarSesion(): void {
    localStorage.removeItem('sesionUsuario');
    this.usuarioActualSubject.next(null);
  }

  estaLogueado(): boolean {
    return this.usuarioActualSubject.value !== null;
  }

  obtenerUsuarioActual(): SesionUsuario | null {
    return this.usuarioActualSubject.value;
  }

  private obtenerUsuarios(): Usuario[] {
    try {
      const usuariosJson = localStorage.getItem('usuarios');
      return usuariosJson ? JSON.parse(usuariosJson) : [];
    } catch (error) {
      console.error('Error al obtener usuarios:', error);
      return [];
    }
  }

  private existeUsuario(username: string, correo: string): boolean {
    const usuarios = this.obtenerUsuarios();
    return usuarios.some(u => u.username === username || u.correo === correo);
  }

  private generarId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }
}