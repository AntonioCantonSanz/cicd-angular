import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListaTareas } from './lista-tareas';
import { TareasService } from '../tareas/tareas.service';

describe('ListaTareas', () => {
  let fixture: ComponentFixture<ListaTareas>;
  let html: HTMLElement;

  beforeEach(async () => {
    fixture = TestBed.createComponent(ListaTareas);
    html = fixture.nativeElement;
    await fixture.whenStable();
  });

  it('pinta las tareas del servicio y el número de pendientes', () => {
    const textos = [...html.querySelectorAll('li span')].map((s) => s.textContent);
    expect(textos).toEqual([
      'Crear el workflow de CI',
      'Proteger la rama main',
      'Desplegar en GitHub Pages',
    ]);
    expect(html.querySelector('.resumen')?.textContent).toContain('Pendientes: 3');
  });

  it('marca la tarea como hecha al pulsar su casilla', async () => {
    html.querySelector<HTMLInputElement>('input[type=checkbox]')!.click();
    await fixture.whenStable();
    expect(html.querySelector('li')!.classList).toContain('hecha');
    expect(html.querySelector('.resumen')?.textContent).toContain('Pendientes: 2');
  });

  it('borra la tarea al pulsar su botón', async () => {
    html.querySelector<HTMLButtonElement>('.borrar')!.click();
    await fixture.whenStable();
    expect(html.querySelectorAll('li').length).toBe(2);
    expect(html.textContent).not.toContain('Crear el workflow de CI');
  });

  it('muestra un aviso cuando no quedan tareas', async () => {
    const servicio = TestBed.inject(TareasService);
    servicio.tareas().forEach((t) => servicio.borrar(t.id));
    await fixture.whenStable();
    expect(html.querySelector('.vacia')?.textContent).toContain('No hay tareas');
  });
});
