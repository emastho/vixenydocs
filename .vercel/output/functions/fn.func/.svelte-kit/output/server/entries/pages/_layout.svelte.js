import { c as create_ssr_component, b as add_attribute, d as subscribe, v as validate_component, e as escape, f as null_to_empty } from "../../chunks/ssr.js";
import { p as page } from "../../chunks/stores.js";
const app = "";
const theme = "";
const Logo = "/_app/immutable/assets/vixenylogo.496d3fe9.png";
const ProgressBar = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const getIncrement = (number) => {
    if (number >= 0 && number < 0.2)
      return 0.1;
    else if (number >= 0.2 && number < 0.5)
      return 0.04;
    else if (number >= 0.5 && number < 0.8)
      return 0.02;
    else if (number >= 0.8 && number < 0.99)
      return 5e-3;
    return 0;
  };
  let running;
  let updater;
  let completed = false;
  let { color } = $$props;
  let { width } = $$props;
  let { minimum = 0.08 } = $$props;
  let { maximum = 0.994 } = $$props;
  let { settleTime = 700 } = $$props;
  let { intervalTime = 700 } = $$props;
  let { stepSizes = [0, 5e-3, 0.01, 0.02] } = $$props;
  const reset = () => {
    width = minimum;
    running = true;
  };
  const animate = () => {
    if (updater) {
      clearInterval(updater);
    }
    running = true;
    updater = setInterval(
      () => {
        const randomStep = stepSizes[Math.floor(Math.random() * stepSizes.length)];
        const step = getIncrement(width) + randomStep;
        if (width < maximum) {
          width = width + step;
        }
        if (width > maximum) {
          width = maximum;
          stop();
        }
      },
      intervalTime
    );
  };
  const start = () => {
    reset();
    animate();
  };
  const stop = () => {
    if (updater) {
      clearInterval(updater);
    }
  };
  const complete = () => {
    clearInterval(updater);
    width = 1;
    running = false;
    setTimeout(
      () => {
        completed = true;
        setTimeout(
          () => {
            completed = false;
            width = 0;
          },
          settleTime
        );
      },
      settleTime
    );
  };
  const setWidthRatio = (widthRatio) => {
    stop();
    width = widthRatio;
    completed = false;
    running = true;
  };
  const getState = () => {
    return {
      width,
      running,
      completed,
      color,
      minimum,
      maximum,
      settleTime,
      intervalTime,
      stepSizes
    };
  };
  let { barStyle } = $$props;
  let { leaderColorStyle } = $$props;
  if ($$props.color === void 0 && $$bindings.color && color !== void 0)
    $$bindings.color(color);
  if ($$props.width === void 0 && $$bindings.width && width !== void 0)
    $$bindings.width(width);
  if ($$props.minimum === void 0 && $$bindings.minimum && minimum !== void 0)
    $$bindings.minimum(minimum);
  if ($$props.maximum === void 0 && $$bindings.maximum && maximum !== void 0)
    $$bindings.maximum(maximum);
  if ($$props.settleTime === void 0 && $$bindings.settleTime && settleTime !== void 0)
    $$bindings.settleTime(settleTime);
  if ($$props.intervalTime === void 0 && $$bindings.intervalTime && intervalTime !== void 0)
    $$bindings.intervalTime(intervalTime);
  if ($$props.stepSizes === void 0 && $$bindings.stepSizes && stepSizes !== void 0)
    $$bindings.stepSizes(stepSizes);
  if ($$props.reset === void 0 && $$bindings.reset && reset !== void 0)
    $$bindings.reset(reset);
  if ($$props.animate === void 0 && $$bindings.animate && animate !== void 0)
    $$bindings.animate(animate);
  if ($$props.start === void 0 && $$bindings.start && start !== void 0)
    $$bindings.start(start);
  if ($$props.stop === void 0 && $$bindings.stop && stop !== void 0)
    $$bindings.stop(stop);
  if ($$props.complete === void 0 && $$bindings.complete && complete !== void 0)
    $$bindings.complete(complete);
  if ($$props.setWidthRatio === void 0 && $$bindings.setWidthRatio && setWidthRatio !== void 0)
    $$bindings.setWidthRatio(setWidthRatio);
  if ($$props.getState === void 0 && $$bindings.getState && getState !== void 0)
    $$bindings.getState(getState);
  if ($$props.barStyle === void 0 && $$bindings.barStyle && barStyle !== void 0)
    $$bindings.barStyle(barStyle);
  if ($$props.leaderColorStyle === void 0 && $$bindings.leaderColorStyle && leaderColorStyle !== void 0)
    $$bindings.leaderColorStyle(leaderColorStyle);
  barStyle = (color && `background-color: ${color};` || "") + (width && width * 100 && `width: ${width * 100}%;` || "");
  leaderColorStyle = color && `background-color: ${color}; color: ${color};` || "";
  return `${$$result.head += `<!-- HEAD_svelte-muxwlj_START --><style data-svelte-h="svelte-1i0wxl1">.svelte-progress-bar {
			position: fixed;
			top: 0;
			left: 0;
			height: 2px;
			transition: width 0.21s ease-in-out;
			z-index: 1;
		}

		.svelte-progress-bar-hiding {
			transition: top 0.8s ease;
			top: -8px;
		}

		.svelte-progress-bar-leader {
			position: absolute;
			top: 0;
			right: 0;
			height: 3px;
			width: 100px;
			transform: rotate(2.5deg) translate(0px, -4px);
			box-shadow: 0 0 8px;
			z-index: 2;
		}</style><!-- HEAD_svelte-muxwlj_END -->`, ""} ${width ? `<div class="${[
    "svelte-progress-bar",
    (running ? "running" : "") + " " + (completed ? "svelte-progress-bar-hiding" : "")
  ].join(" ").trim()}"${add_attribute("style", barStyle, 0)}>${running ? `<div class="svelte-progress-bar-leader"${add_attribute("style", leaderColorStyle, 0)}></div>` : ``}</div>` : ``}`;
});
function client_method(key) {
  {
    if (key === "before_navigate" || key === "after_navigate") {
      return () => {
      };
    } else {
      const name_lookup = {
        disable_scroll_handling: "disableScrollHandling",
        preload_data: "preloadData",
        preload_code: "preloadCode",
        invalidate_all: "invalidateAll"
      };
      return () => {
        throw new Error(`Cannot call ${name_lookup[key] ?? key}(...) on the server`);
      };
    }
  }
}
const beforeNavigate = /* @__PURE__ */ client_method("before_navigate");
const afterNavigate = /* @__PURE__ */ client_method("after_navigate");
const _layout_svelte_svelte_type_style_lang = "";
const css = {
  code: "aside.svelte-z8q7t7.svelte-z8q7t7{flex-shrink:0;width:270px;height:100vh;background-color:#252525;padding:3rem 1.6rem;display:flex;flex-direction:column}.logoArea.svelte-z8q7t7.svelte-z8q7t7{display:flex;justify-content:center;flex-shrink:0}nav.svelte-z8q7t7.svelte-z8q7t7{margin-top:3rem;align-items:start;flex-grow:1}ul.svelte-z8q7t7.svelte-z8q7t7{width:100%;margin:0}ul.svelte-z8q7t7>.svelte-z8q7t7{margin-bottom:0.4rem}ul.svelte-z8q7t7>.svelte-z8q7t7:last-child{margin-bottom:0}ul.svelte-z8q7t7 li.svelte-z8q7t7{font-size:14px;padding:unset}ul.svelte-z8q7t7 li a.svelte-z8q7t7{display:block;padding:0.7rem 1.2rem;border-radius:8px;border:2px solid #2f2f2f;transition:150ms all}ul.svelte-z8q7t7 li .active.svelte-z8q7t7{border-color:#6f5c9b;background:#6f5c9b}nav.svelte-z8q7t7 .title.svelte-z8q7t7{color:rgb(206, 206, 206);display:block;padding-block:16px;padding-left:0.2rem}.container.svelte-z8q7t7.svelte-z8q7t7{display:flex;flex-wrap:wrap}section.svelte-z8q7t7.svelte-z8q7t7{flex:1;padding:3rem 4rem;color:white;height:100vh;overflow-y:scroll}a.svelte-z8q7t7.svelte-z8q7t7{text-decoration:none;color:white}ul.svelte-z8q7t7.svelte-z8q7t7{list-style:none;padding:0}header.svelte-z8q7t7.svelte-z8q7t7{width:100%;display:none;background:#252525;padding:1.5rem}header.svelte-z8q7t7 div.svelte-z8q7t7:nth-child(2){flex-shrink:0;text-align:center}header.svelte-z8q7t7>.svelte-z8q7t7{flex:1}header.svelte-z8q7t7 div.svelte-z8q7t7:last-child{text-align:right}header.svelte-z8q7t7 button.svelte-z8q7t7{background:#383838;border:none;padding:1rem;border-radius:4px}.menu.svelte-z8q7t7.svelte-z8q7t7{background:#222;position:fixed;width:270px;height:100%;padding:3rem}@media(width < 1100px){aside.svelte-z8q7t7.svelte-z8q7t7{display:none}header.svelte-z8q7t7.svelte-z8q7t7{display:flex}section.svelte-z8q7t7.svelte-z8q7t7{height:auto}}",
  map: null
};
const Layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $page, $$unsubscribe_page;
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  let progress;
  beforeNavigate(() => {
    progress.start();
  });
  afterNavigate(() => {
    progress.complete();
  });
  $$result.css.add(css);
  let $$settled;
  let $$rendered;
  do {
    $$settled = true;
    $$rendered = `${validate_component(ProgressBar, "ProgressBar").$$render(
      $$result,
      {
        color: "#6F5C9B",
        minimum: "0.40",
        intervalTime: "600",
        this: progress
      },
      {
        this: ($$value) => {
          progress = $$value;
          $$settled = false;
        }
      },
      {}
    )} ${$$result.head += `<!-- HEAD_svelte-1n6vyhk_START --><link rel="preload" as="image"${add_attribute("href", Logo, 0)}><!-- HEAD_svelte-1n6vyhk_END -->`, ""} <main>${``} <header class="svelte-z8q7t7"><div class="svelte-z8q7t7"></div> <div class="svelte-z8q7t7" data-svelte-h="svelte-mnm76m"><a href="/" class="svelte-z8q7t7"><img${add_attribute("src", Logo, 0)} alt="Logo" height="45"></a></div> <div class="svelte-z8q7t7"><button class="svelte-z8q7t7" data-svelte-h="svelte-lbncfj">X</button></div></header> <div class="container svelte-z8q7t7"><aside class="svelte-z8q7t7"><div class="logoArea svelte-z8q7t7" data-svelte-h="svelte-19b6duj"><a href="/" class="svelte-z8q7t7"><img${add_attribute("src", Logo, 0)} alt="Logo" height="45"></a></div> <nav class="svelte-z8q7t7"><div class="title svelte-z8q7t7" data-svelte-h="svelte-1dnz8yp">Longer text</div> <ul class="svelte-z8q7t7"><li class="svelte-z8q7t7"><a href="/two" class="${escape(null_to_empty($page.url.pathname === "/two" ? "active" : ""), true) + " svelte-z8q7t7"}">two</a></li> <li class="svelte-z8q7t7"><a href="/other" class="${escape(null_to_empty($page.url.pathname === "/other" ? "active" : ""), true) + " svelte-z8q7t7"}">other</a></li> <li class="svelte-z8q7t7"><a href="/more" class="${escape(null_to_empty($page.url.pathname === "/more" ? "active" : ""), true) + " svelte-z8q7t7"}">more</a></li></ul></nav></aside> <section class="svelte-z8q7t7">${slots.default ? slots.default({}) : ``}</section></div> </main>`;
  } while (!$$settled);
  $$unsubscribe_page();
  return $$rendered;
});
export {
  Layout as default
};
