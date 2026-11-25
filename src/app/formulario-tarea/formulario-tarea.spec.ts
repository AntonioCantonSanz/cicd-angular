import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormularioTarea } from './formulario-tarea';
import { TareasService } from '../tareas/tareas.service';

describe('FormularioTarea', () => {
  let fixture: ComponentFixture<FormularioTarea>;
  let html: HTMLElement;
  let input: HTMLInputElement;
  let servicio: TareasService;

  async function escribir(texto: string) {
    input.value = texto;
    input.dispatchEvent(new Event('input'));
    await fixture.whenStable();
  }

  async function enviar() {
    html.querySelector<HTMLButtonElement>('button')!.click();
    await fixture.whenStable();
  }

  beforeEach(async () => {
    fixture = TestBed.createComponent(FormularioTarea);
    html = fixture.nativeElement;
    await fixture.whenStable();
    input = html.querySelector('input')!;
    servicio = TestBed.inject(TareasService);
  });

  it('añade la tarea escrita y vacía el campo', async () => {
    await escribir('Estudiar Docker');
    await enviar();
    expect(servicio.tareas().at(-1)?.texto).toBe('Estudiar Docker');
    expect(input.value).toBe('');
  });

  it('muestra un error y no añade nada si el campo está vacío', async () => {
    await enviar();
    expect(html.querySelector('.error')?.textContent).toContain('Escribe algo');
    expect(servicio.tareas().length).toBe(3);
  });

  it('quita el error al volver a escribir', async () => {
    await enviar();
    await escribir('a');
    expect(html.querySelector('.error')).toBeNull();
  });
});
