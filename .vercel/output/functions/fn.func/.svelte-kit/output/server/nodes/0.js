

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_layout.svelte.js')).default;
export const imports = ["_app/immutable/nodes/0.ec6832ec.js","_app/immutable/chunks/scheduler.1ce915d1.js","_app/immutable/chunks/index.eac23eb1.js","_app/immutable/chunks/stores.fc120e5d.js","_app/immutable/chunks/singletons.f0468c5e.js"];
export const stylesheets = ["_app/immutable/assets/0.2edda1bf.css"];
export const fonts = [];
