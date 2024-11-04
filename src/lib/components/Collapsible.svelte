<script>
	import { slide } from 'svelte/transition';
	import { quadInOut } from 'svelte/easing';

	export let title;
	let collapsed = true;

	const uncollapse = () => {
		collapsed = !collapsed;
	};
</script>

<button class="navCollapsible" on:click={uncollapse}>{title}</button><br />
{#if !collapsed}
	<div class="navContent" transition:slide={{ duration: 100, easing: quadInOut }}>
		<slot />
	</div>
{/if}
