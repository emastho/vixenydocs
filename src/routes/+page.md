<script>
  import PreviousNext from "$lib/components/PreviousNext.svelte"
  import FancyLink from "$lib/components/FancyLink.svelte"
  import {version} from "$app/environment"
  import Features from "$lib/components/Features.svelte"

</script>
<svelte:head>
    <title>Vixeny - Unleash the Power of Multi-Paradigm Programming</title>
    <meta name="description" content="Vixeny is a multi-paradigm web development framework, optimizing developer experience, application speed, and functional programming capabilities. Start your journey with Vixeny to create robust, maintainable, and efficient web applications.">
</svelte:head>


<div class="warning" style="margin-bottom: 8px">
  Vixeny is currently in Beta stage. We appreciate your <a href="https://github.com/mimiMonads/vixeny/issues" target="_blank">feedback</a>!
</div>

<div class="warning warning-2">
  <strong>Docs are under development</strong>: This website is stitched together by a bunch of lazy raccoons, it's gonna be finished, have patience.
</div>

<div style="margin-top: 64px; margin-bottom: 16px">
<h1 style="margin-bottom: 8px; padding: 0; font-size: 48px; color: var(--main)">Welcome to Vixeny.</h1>
<div style="padding-bottom: 32px; margin-top: -8px; color: gray;">
Docs {version}
</div>
</div>

<Features />

<h2 style="margin-top: 48px;">
Quick start
</h2>

<FancyLink href="/framework/init">Let's begin</FancyLink>


<style>
div > :global(*:not(:last-child)) {
margin-bottom: 8px;
}
a { display: inline-block;margin: 0; }
</style>
