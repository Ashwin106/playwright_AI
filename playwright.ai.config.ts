import { defineConfig } from '@playwright/test';
import baseConfig from './playwright.config';

export default defineConfig({
  ...baseConfig,
  testDir: './tests/ai',
  testIgnore: [],
  projects: [{ name: 'ollama-smoke' }],
  reporter: 'list',
  timeout: 120_000,
});
