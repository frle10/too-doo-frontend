/// <reference types="vitest/config" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.ts',
    css: true,
    coverage: {
      provider: 'v8',
      reporter: ['text', 'lcov'],
      include: ['src/**/*.{ts,tsx}'],
      // Entry points and pure style/type modules carry no branches worth
      // measuring; counting them only dilutes the number.
      exclude: [
        'src/main.tsx',
        'src/setupTests.ts',
        'src/util/types.ts',
        'src/util/styles.ts',
      ],
    },
  },
});
