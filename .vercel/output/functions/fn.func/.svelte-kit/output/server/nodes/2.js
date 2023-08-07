

export const index = 2;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/2.1ca31b1f.js","_app/immutable/chunks/scheduler.1ce915d1.js","_app/immutable/chunks/index.eac23eb1.js"];
export const stylesheets = [];
export const fonts = [];
