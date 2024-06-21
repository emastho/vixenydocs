import adapter from '@sveltejs/adapter-static';
import { mdsvex } from 'mdsvex';
import rehypeAuto from 'rehype-autolink-headings';
import rehypeSlug from 'rehype-slug';
import rehypeToc from "@jsdevtools/rehype-toc"
import { vitePreprocess } from '@sveltejs/kit/vite';

import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';

const file = fileURLToPath(new URL('package.json', import.meta.url));
const json = readFileSync(file, 'utf8');
const pkg = JSON.parse(json);

const config = {
  preprocess: [
    vitePreprocess(),
    mdsvex({
      extensions: ['.md'],
      rehypePlugins: [rehypeSlug, [rehypeAuto, { behavior: 'append' }], [rehypeToc]]
    })
  ],
  extensions: ['.svelte', '.md'],

  kit: {
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
