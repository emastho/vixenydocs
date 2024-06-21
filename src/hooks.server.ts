import { minify } from 'html-minifier-terser';
import { sequence } from '@sveltejs/kit/hooks';
import { building, dev } from '$app/environment';
import type { Handle } from '@sveltejs/kit';

const options = {
	collapseBooleanAttributes: true,
	collapseWhitespace: true,
	conservativeCollapse: true,
	decodeEntities: true,
	html5: true,
	ignoreCustomComments: [/^#/],
	minifyCSS: true,
	minifyJS: true,
	removeAttributeQuotes: true,
	removeComments: false, // some hydration code needs comments, so leave them in
	removeOptionalTags: true,
	removeRedundantAttributes: true,
	removeScriptTypeAttributes: true,
	removeStyleLinkTypeAttributes: true,
	sortAttributes: true,
	sortClassName: true
};

const first: Handle = async ({ event, resolve }) => {
	const home = dev ? `http://localhost:5173/` : `https://vixeny.dev/`;
	const result = await resolve(event, {
		transformPageChunk: ({ html }) => html.replace(/%home%/g, home)
	});

	return result;
};

const second: Handle = async ({ event, resolve }) => {
	let page = '';
	const result = await resolve(event, {
		transformPageChunk: ({ html, done }) => {
			page += html;
			if (done) {
				return building ? minify(page, options) : page;
			}
		}
	});

	return result;
};

export const handle = sequence(first, second);
