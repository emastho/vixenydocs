<script lang="ts">
	import { page } from '$app/stores';

	export let href: string;
	export let name: string;
	export let target: boolean | undefined;

	let targetBlank: { target?: string } = {};
	if (target) targetBlank.target = '_blank';
</script>

<li>
	<a {href} class:active={$page.url.pathname == href} {...targetBlank}>{name}</a>
</li>

<style>
	li {
		font-size: 12px;
		padding: unset;
	}

	li a {
		display: block;
		/* background: #2f2f2f; */
		padding: 10px 32px;
		 /* border-radius: 8px;  */
		/* border: 2px solid #2f2f2f; */
		transition: 150ms all;
	}

	li a:hover {
		text-decoration: underline;
	}

	li .active {
		border-color: #6f5c9b; 
		background: #6f5c9b; 
		
	}
</style>
