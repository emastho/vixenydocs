

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_layout.svelte.js')).default;
export const imports = ["_app/immutable/nodes/0.4ac3f42b.js","_app/immutable/chunks/scheduler.1ce915d1.js","_app/immutable/chunks/index.eac23eb1.js","_app/immutable/chunks/stores.e48790a2.js","_app/immutable/chunks/singletons.915565e1.js"];
export const stylesheets = ["_app/immutable/assets/0.2edda1bf.css"];
export const fonts = [];
