import { defineConfig } from 'vitest/config';

// Umbrales mínimos de cobertura: si no se alcanzan, ng test termina con error.
export default defineConfig({
  test: {
    coverage: {
      thresholds: {
        statements: 80,
        functions: 80,
        lines: 80,
        branches: 70,
      },
    },
  },
});
