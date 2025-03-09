import {
  configDefaults,
  coverageConfigDefaults,
  defineConfig,
} from 'vitest/config';
import react from '@vitejs/plugin-react';
import tsconfigPath from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [react(), tsconfigPath()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: 'tests/setup.ts',
    exclude: [
      ...configDefaults.exclude,
      'src/pages/_app.tsx',
      'src/main.tsx',
      'src/models/types/api.ts',
      'next.config.mjs',
    ],
    coverage: {
      provider: 'v8',
      exclude: [
        'src/pages/_app.tsx',
        'src/main.tsx',
        'src/models/types/api.ts',
        'next.config.mjs',
        ...coverageConfigDefaults.exclude,
      ],
    },
  },
});
