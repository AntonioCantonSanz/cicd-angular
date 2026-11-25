import { Component, inject, signal } from '@angular/core';
import { TareasService } from '../tareas/tareas.service';

@Component({
  selector: 'app-formulario-tarea',
  templateUrl: './formulario-tarea.html',
})
export class FormularioTarea {
  private readonly servicio = inject(TareasService);

  protected readonly texto = signal('');
  protected readonly error = signal('');

  protected escribir(evento: Event): void {
    this.texto.set((evento.target as HTMLInputElement).value);
    this.error.set('');
  }

  protected enviar(evento: Event): void {
    evento.preventDefault();
    if (this.servicio.anadir(this.texto())) {
      this.texto.set('');
    } else {
      this.error.set('Escribe algo antes de añadir la tarea.');
    }
  }
}
