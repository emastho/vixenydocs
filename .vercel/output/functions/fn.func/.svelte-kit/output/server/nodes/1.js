

export const index = 1;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/fallbacks/error.svelte.js')).default;
export const imports = ["_app/immutable/nodes/1.06da67a8.js","_app/immutable/chunks/scheduler.1ce915d1.js","_app/immutable/chunks/index.eac23eb1.js","_app/immutable/chunks/stores.e48790a2.js","_app/immutable/chunks/singletons.915565e1.js"];
export const stylesheets = [];
export const fonts = [];
