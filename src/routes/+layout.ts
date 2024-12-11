import { browser } from '$app/environment';
export const prerender = true;

export function load() {
	let light = false;
	if (browser) {
		//@ts-ignore
		light = isLightTheme();
	}
	return {
		light
	};
}
