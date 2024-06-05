<script>
  import PreviousNext from "$lib/components/PreviousNext.svelte"
  import FancyLink from "$lib/components/FancyLink.svelte"
  import {version} from "$app/environment"

</script>
<svelte:head>
    <title>Vixeny - Unleash the Power of Multi-Paradigm Programming</title>
    <meta name="description" content="Vixeny is a multi-paradigm web development framework, optimizing developer experience, application speed, and functional programming capabilities. Start your journey with Vixeny to create robust, maintainable, and efficient web applications.">
</svelte:head>


<div class="warning">
  Vixeny is currently in Beta stage. We appreciate your <a href="https://github.com/mimiMonads/vixeny/issues" target="_blank">feedback</a>!
</div>

<div class="warning warning-2">
  <strong>Docs are under development</strong>: This website is stitched together by a bunch of lazy raccoons, it's gonna be finished, have patience.
</div>


<h1 style="padding-bottom: 8px">Welcome to Vixeny!</h1>
<div style="padding-bottom: 32px; color: gray;">
Docs {version}
</div>

**Introducing Vixeny: A New Era in Web Development**

*   **Unmatched Speed**: Experience the fastest framework in the Deno ecosystem.
*   **DRY and Functional**: Designed with the principles of DRY (Don't Repeat Yourself) and advanced functional programming, including naitve mocking and code isolation.
*   **Zero-Dependency Architecture**: Lean and efficient, with a focus on simplicity and performance.
*   **Native Plugin Support**: Enhance functionality with ease using native plugins.
*   **Robust Security**: Predictable and deterministc.
*   **Versatile Paradigms**: Supports functional programming and other paradigms in a cohesive manner.
*   **Object-Oriented**: Facilitates easy code manipulation and maintenance.
*   **Test-Friendly**: Framework designed to be easily testable, end to end.
*   **Future-Proof**: Stay ahead in web development with Vixeny's innovative features.

**Start your journey with Vixeny – redefine efficiency and innovation in web development.**
<h2 style="margin-top: 48px;">
Quick start
</h2>

<div>
<FancyLink href="/framework/init">Let's begin</FancyLink>
</div>



<style>
div > :global(*:not(:last-child)) {
margin-bottom: 8px;
}
a { display: inline-block;margin: 0; }
</style>
