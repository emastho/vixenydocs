import { c as create_ssr_component, v as validate_component } from "../../../chunks/ssr.js";
const Iconie_svelte_svelte_type_style_lang = "";
const css = {
  code: ".icon.svelte-cialgt{width:18px;height:18px}",
  map: null
};
const Iconie = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { which } = $$props;
  if ($$props.which === void 0 && $$bindings.which && which !== void 0)
    $$bindings.which(which);
  $$result.css.add(css);
  return `${which === "link" ? `<svg class="icon svelte-cialgt" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 256 256"><path fill="currentColor" d="M136.37 187.53a12 12 0 0 1 0 17l-5.94 5.94a60 60 0 0 1-84.88-84.88l24.12-24.11A60 60 0 0 1 152 99a12 12 0 1 1-16 18a36 36 0 0 0-49.37 1.47l-24.1 24.08a36 36 0 0 0 50.92 50.92l5.94-5.94a12 12 0 0 1 16.98 0Zm74.08-142a60.09 60.09 0 0 0-84.88 0l-5.94 5.94a12 12 0 0 0 17 17l5.94-5.94a36 36 0 0 1 50.92 50.92l-24.11 24.12A36 36 0 0 1 120 139a12 12 0 1 0-16 18a60 60 0 0 0 82.3-2.43l24.12-24.11a60.09 60.09 0 0 0 .03-84.91Z"></path></svg>` : ``}`;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<h1 data-svelte-h="svelte-1qv6x92">Functional programming video resources:</h1> <h2 data-svelte-h="svelte-j0m7c9">Video:</h2> <div class="link">${validate_component(Iconie, "Iconie").$$render($$result, { which: "link" }, {}, {})}<a href="https://egghead.io/courses/professor-frisby-introduces-composable-functional-javascript" target="_blank" data-svelte-h="svelte-rjf6vo">Professor Frisby course</a></div> <div class="link">${validate_component(Iconie, "Iconie").$$render($$result, { which: "link" }, {}, {})}<a href="https://youtube.com/playlist?list=PL0zVEGEvSaeEd9hlmCXrk5yUyqUag-n84" target="_blank" data-svelte-h="svelte-10vqu2g">Functional programming by Fun Fun Function</a></div> <div class="link">${validate_component(Iconie, "Iconie").$$render($$result, { which: "link" }, {}, {})}<a href="https://www.youtube.com/playlist?list=PLZEZPz6HkCZkkWPVecPvLMmWAMmeDgqwV" target="_blank" data-svelte-h="svelte-d0csgu">Composing functions by Jesse Warden</a></div> <div class="link">${validate_component(Iconie, "Iconie").$$render($$result, { which: "link" }, {}, {})}<a href="https://www.youtube.com/playlist?list=PLZEZPz6HkCZnTQWdSEr3HWI_xVeBF5-ea" target="_blank" data-svelte-h="svelte-jncw0f">Pure vs Impure by Jesse Warden</a></div> <h2 data-svelte-h="svelte-15jd937">Text:</h2> <div class="link">${validate_component(Iconie, "Iconie").$$render($$result, { which: "link" }, {}, {})}<a href="https://mostly-adequate.gitbook.io/mostly-adequate-guide/" target="_blank" data-svelte-h="svelte-5xl35l">Mostly adequate guide to FP</a></div> <br> <br> <br> <br> <br> <p data-svelte-h="svelte-egkn03">Now you may say, that’s a lot, and yes, some tutorials repeat, some are worse than the others, the idea is</p> <p data-svelte-h="svelte-q2l3kf">The more you open yourself to FP content, the more information of it will stay in your head.</p> <p data-svelte-h="svelte-1fj7kkj">By the way, all the above content, I watched/read.</p> <h3 data-svelte-h="svelte-1878nx7">If I could say what exactly you need to know to be able to use this library correctly it would probably be:</h3> <p data-svelte-h="svelte-15if4vg">Anonymous functions</p> <p data-svelte-h="svelte-ol44zn">How primitive and reference values are passed to functions</p> <p data-svelte-h="svelte-1k976iq">Higher order functions</p> <p data-svelte-h="svelte-1f80tdw">Array .map, .filter .reduce, .flatMap</p> <p data-svelte-h="svelte-1xjtl0p">How to make anything immutable</p> <p data-svelte-h="svelte-lsiqsq">Closures</p> <p data-svelte-h="svelte-r8t1k9">What is currying</p> <p data-svelte-h="svelte-65dxvh">What is partial application</p> <p data-svelte-h="svelte-1jogpu0">What is function composition</p> <p data-svelte-h="svelte-16ecfv9">What is a side effect</p> <p data-svelte-h="svelte-1cf9glz">What is a pure function</p> <p data-svelte-h="svelte-1mn3faj">Dependency injection using functions</p> <p data-svelte-h="svelte-1xrk68e">From here on you should read the “Mostly adequate guide to FP” or watch “Professor Frisby course” above, you will know some stuff, so you will be able to just repeat some knowledge and secure it in your mind. From Chapter 08 you’ll start learning about them scary Functors/Monads and other fancy named Boxes, that you’ll need to write functional code using the way, I’ll teach you in the following page.</p> <br> <p data-svelte-h="svelte-xeo5dl">Don’t be scared, the more you learn, the easier it will be to connect how it all works.</p> <br> <br> <br> <br>`;
});
export {
  Page as default
};
