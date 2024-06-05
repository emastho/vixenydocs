import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [sveltekit()],
	build: { reportCompressedSize: false, target: 'modules' },
	esbuild: { legalComments: 'none' }
});
