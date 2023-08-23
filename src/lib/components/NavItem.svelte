<script lang="ts">
	import { page } from '$app/stores';

	export let href: string;
	export let name: string;
</script>

<li>
	<a {href} class:active={$page.url.pathname.includes(href)}>{name}</a>
</li>

<style>
	li {
		font-size: 14px;
		padding: unset;
	}

	li a {
		display: block;
		/* background: #2f2f2f; */
		padding: 0.5rem 1.2rem;
		/* border-radius: 8px; */
		/* border: 2px solid #2f2f2f; */
		transition: 150ms all;
	}

	li a:hover {
		text-decoration: underline;
	}

	li .active {
		/* border-color: #6f5c9b; */
		/* background: #6f5c9b; */
		text-decoration: underline;
	}
</style>
