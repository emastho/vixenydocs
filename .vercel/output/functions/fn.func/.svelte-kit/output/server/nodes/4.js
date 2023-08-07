

export const index = 4;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/other/_page.md.js')).default;
export const imports = ["_app/immutable/nodes/4.0ddb512f.js","_app/immutable/chunks/scheduler.1ce915d1.js","_app/immutable/chunks/index.eac23eb1.js"];
export const stylesheets = [];
export const fonts = [];
