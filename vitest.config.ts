import { defineConfig } from 'vitest/config';
import react from '@vitejs/react-vite-plugin';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/test/setup.ts',
  },
});
