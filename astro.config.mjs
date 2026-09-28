import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';

export default defineConfig({
  output: 'server', // Garante que as rotas de API funcionem e gere a pasta .cloudflare
  adapter: cloudflare(),
});