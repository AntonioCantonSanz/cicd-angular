import { Component, inject } from '@angular/core';
import { TareasService } from '../tareas/tareas.service';

@Component({
  selector: 'app-lista-tareas',
  templateUrl: './lista-tareas.html',
})
export class ListaTareas {
  protected readonly servicio = inject(TareasService);
}
