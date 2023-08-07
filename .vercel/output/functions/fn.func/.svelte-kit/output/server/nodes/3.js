

export const index = 3;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/more/_page.md.js')).default;
export const imports = ["_app/immutable/nodes/3.8516cf52.js","_app/immutable/chunks/scheduler.1ce915d1.js","_app/immutable/chunks/index.eac23eb1.js"];
export const stylesheets = [];
export const fonts = [];
