<script>
	import FancyLink from '$lib/components/FancyLink.svelte';
	import { version } from '$app/environment';
	import Features from '$lib/components/Features.svelte';
</script>

<svelte:head>
	<title>Vixeny - Unleash the Power of Multi-Paradigm Programming</title>
	<meta
		name="description"
		content="Vixeny is a multi-paradigm web development framework, optimizing developer experience, application speed, and functional programming capabilities. Start your journey with Vixeny to create robust, maintainable, and efficient web applications."
	/>
</svelte:head>



<div>
	<h2 style="margin-bottom: 0px; padding: 0; color: var(--text)">Welcome to</h2>
	<h1 style="margin-bottom: 8px; padding: 0; color: var(--main)">Vixeny</h1>
	<div style="padding-bottom: 32px; margin-top: -8px; color: gray;">
		Docs {version}
	</div>
</div>

<br>
<Features />

<h2 style="margin-top: 48px;">Quick start</h2>

<FancyLink href="/framework/init">Let's begin</FancyLink>

<style>
	div > :global(*:not(:last-child)) {
		margin-bottom: 8px;
	}
	a {
		display: inline-block;
		margin: 0;
	}
	h2 {
		font-size: clamp(20px, 2vw, 32px);
	}
	h1 {
		font-size: clamp(56px, 8vw, 128px);
	}
</style>
