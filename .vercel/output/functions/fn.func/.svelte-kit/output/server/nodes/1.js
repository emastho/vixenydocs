

export const index = 1;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/fallbacks/error.svelte.js')).default;
export const imports = ["_app/immutable/nodes/1.c08c1e97.js","_app/immutable/chunks/scheduler.1ce915d1.js","_app/immutable/chunks/index.eac23eb1.js","_app/immutable/chunks/stores.fc120e5d.js","_app/immutable/chunks/singletons.f0468c5e.js"];
export const stylesheets = [];
export const fonts = [];
