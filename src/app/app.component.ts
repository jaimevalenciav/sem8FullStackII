import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { FooterComponent } from './components/footer/footer.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    HeaderComponent,
    NavigationComponent,
    FooterComponent
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent implements OnInit {
  title = 'jvv-oficinas';

  ngOnInit() {
    this.crearUsuarioPorDefecto();
  }

  private crearUsuarioPorDefecto() {
    // Verificar si ya existe el usuario por defecto
    const usuariosExistentes = JSON.parse(localStorage.getItem('usuarios') || '[]');
    
    const usuarioExiste = usuariosExistentes.find((user: any) => user.username === 'jvalencia');
    
    if (!usuarioExiste) {
      const usuarioPorDefecto = {
        nombre: 'Juan',
        apellido: 'Valencia',
        username: 'jvalencia',
        correo: 'jvalencia@email.com',
        fechaNacimiento: '1990-01-01',
        direccionDespacho: 'Dirección por defecto',
        perfil: 'usuario',
        password: 'jvalencia123'
      };

      const usuarioAdministrador = {
        nombre: 'Jaime2',
        apellido: 'Valencia2',
        username: 'admin',
        correo: 'jvalencia@email.com',
        fechaNacimiento: '1990-01-01',
        direccionDespacho: 'Dirección por defecto',
        perfil: 'administrador',
        password: 'admin123'
      };
      
      usuariosExistentes.push(usuarioPorDefecto);
      usuariosExistentes.push(usuarioAdministrador);
      localStorage.setItem('usuarios', JSON.stringify(usuariosExistentes));
      
      console.log('Usuario por defecto creado: jvalencia / jvalencia123');
    }
  }
}