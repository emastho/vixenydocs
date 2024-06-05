import adapter from '@sveltejs/adapter-cloudflare';
import { mdsvex } from 'mdsvex';
import rehypeAuto from 'rehype-autolink-headings';
import rehypeSlug from 'rehype-slug';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';

const file = fileURLToPath(new URL('package.json', import.meta.url));
const json = readFileSync(file, 'utf8');
const pkg = JSON.parse(json);

/**
 * @type {import('@sveltejs/kit').Config}
 */
const config = {
	preprocess: [
		vitePreprocess(),
		mdsvex({
			extensions: ['.md'],
			rehypePlugins: [rehypeSlug, [rehypeAuto, { behavior: 'append' }]]
		})
	],
	extensions: ['.svelte', '.md'],
	kit: {
		csp: {
			mode: 'nonce',
			directives: {
				'base-uri': ['none'],
				'script-src': ['self', 'strict-dynamic', 'unsafe-inline'],
				'object-src': ['none']
			}
		},
		adapter: adapter(),
		prerender: {
			handleMissingId: 'warn'
		},
		version: {
			name: pkg.version
		}
	}
};

export default config;
