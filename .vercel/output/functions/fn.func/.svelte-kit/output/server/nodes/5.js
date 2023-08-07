

export const index = 5;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/two/_page.md.js')).default;
export const imports = ["_app/immutable/nodes/5.95429984.js","_app/immutable/chunks/scheduler.1ce915d1.js","_app/immutable/chunks/index.eac23eb1.js"];
export const stylesheets = ["_app/immutable/assets/5.e11a7bcb.css"];
export const fonts = [];
