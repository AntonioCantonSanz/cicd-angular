import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormularioTarea } from './formulario-tarea/formulario-tarea';
import { ListaTareas } from './lista-tareas/lista-tareas';

@Component({
  imports: [RouterOutlet, FormularioTarea, ListaTareas],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  protected readonly titulo = signal(tituloSinDeclarar);
}
