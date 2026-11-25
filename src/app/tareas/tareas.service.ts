import { Injectable, computed, signal } from '@angular/core';

export interface Tarea {
  id: number;
  texto: string;
  hecha: boolean;
}

@Injectable({ providedIn: 'root' })
export class TareasService {
  private siguienteId = 1;
  private readonly lista = signal<Tarea[]>([]);

  readonly tareas = this.lista.asReadonly();
  readonly pendientes = computed(() => this.lista().filter((t) => !t.hecha).length);

  constructor() {
    this.anadir('Crear el workflow de CI');
    this.anadir('Proteger la rama main');
    this.anadir('Desplegar en GitHub Pages');
  }

  /** Añade una tarea. Devuelve false si el texto está vacío. */
  anadir(texto: string): boolean {
    const limpio = texto.trim();
    if (!limpio) {
      return false;
    }
    this.lista.update((ts) => [...ts, { id: this.siguienteId++, texto: limpio, hecha: false }]);
    return true;
  }

  alternar(id: number): void {
    this.lista.update((ts) => ts.map((t) => (t.id === id ? { ...t, hecha: !t.hecha } : t)));
  }

  borrar(id: number): void {
    this.lista.update((ts) => ts.filter((t) => t.id !== id));
  }

  /** Resume el estado de la lista en una frase. */
  resumen(): string {
    const total = this.lista().length;
    const pendientes = this.pendientes();
    if (total === 0) {
      return 'No hay tareas';
    }
    if (pendientes === 0) {
      return 'Todo hecho';
    }
    if (pendientes === total) {
      return 'Todo por hacer';
    }
    const hechas = total - pendientes;
    const porcentaje = Math.round((hechas / total) * 100);
    return `${hechas} de ${total} (${porcentaje} %)`;
  }
}
