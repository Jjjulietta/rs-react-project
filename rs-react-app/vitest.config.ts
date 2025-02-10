import {
  configDefaults,
  coverageConfigDefaults,
  defineConfig,
} from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: 'tests/setup.ts',
    exclude: [...configDefaults.exclude, 'src/App.tsx', 'src/main.tsx'],
    coverage: {
      exclude: [
        'src/App.tsx',
        'src/main.tsx',
        ...coverageConfigDefaults.exclude,
      ],
    },
  },
});
