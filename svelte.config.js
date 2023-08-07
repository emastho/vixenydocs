import adapter from '@sveltejs/adapter-auto';
import { mdsvex } from "mdsvex"
import { vitePreprocess } from '@sveltejs/kit/vite';

const config = {
	preprocess: [vitePreprocess(), mdsvex({ extensions: [".md"] })],
	extensions: [".svelte", ".md"],

	kit: {
		adapter: adapter()
	}
};

export default config;
