import { TestBed } from '@angular/core/testing';
import { TareasService } from './tareas.service';

describe('TareasService', () => {
  let servicio: TareasService;

  beforeEach(() => {
    servicio = TestBed.inject(TareasService);
  });

  it('empieza con tres tareas pendientes', () => {
    expect(servicio.tareas().length).toBe(3);
    expect(servicio.pendientes()).toBe(3);
  });

  it('añade una tarea sin espacios sobrantes y con id propio', () => {
    expect(servicio.anadir('  Escribir tests  ')).toBe(true);
    const tareas = servicio.tareas();
    expect(tareas.at(-1)).toMatchObject({ texto: 'Escribir tests', hecha: false });
    expect(new Set(tareas.map((t) => t.id)).size).toBe(4);
  });

  it('rechaza un texto vacío o solo con espacios', () => {
    expect(servicio.anadir('   ')).toBe(false);
    expect(servicio.tareas().length).toBe(3);
  });

  it('alterna solo la tarea indicada y actualiza las pendientes', () => {
    const { id } = servicio.tareas()[1];
    servicio.alternar(id);
    expect(servicio.tareas().map((t) => t.hecha)).toEqual([false, true, false]);
    expect(servicio.pendientes()).toBe(2);
    servicio.alternar(id);
    expect(servicio.pendientes()).toBe(3);
  });

  it('borra solo la tarea indicada', () => {
    const [primera, segunda, tercera] = servicio.tareas();
    servicio.borrar(segunda.id);
    expect(servicio.tareas()).toEqual([primera, tercera]);
  });
});
