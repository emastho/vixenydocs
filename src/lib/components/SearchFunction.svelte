<script>
	import list from '$lib/data.json';
	import { create, insert, search } from '@orama/orama';
	import { onMount } from 'svelte';
	import { searchModal } from '$lib/stores/main';
	import { fade } from 'svelte/transition';

	let input;
	let db;
	let searchResult = [];

	async function initializeDatabase() {
		db = await create({
			schema: { content: 'string', route: 'string' }
		});

		list.map(async (item) => {
			await insert(db, {
				content: item.content,
				route: item.route
			});
		});
	}

	async function performSearch(term) {
		searchResult = await search(db, {
			term
		});
	}

	initializeDatabase();

	onMount(() => {
		input.focus();
	});
</script>

<div>
	<strong>Search</strong>
	<button on:click|preventDefault={() => searchModal.set(false)}>Close</button>
</div>
<input
	type="text"
	placeholder="Search..."
	bind:this={input}
	on:input={(e) => performSearch(e.target.value)}
	in:fade={{ duration: 200 }}
/>

<ul>
	{#each searchResult.hits ?? [] as item}
		<li>
			<a href={item.document.route} on:click={() => searchModal.set(false)}>
				{item.document.route}
			</a>
		</li>
	{/each}
</ul>

<style>
	input {
		width: 100%;
		padding: 1rem;
		margin-bottom: 16px;
		border-radius: 4px;
		outline: none;
		border: none;
		background: #222222;
		color: white;
	}

	ul {
		height: 100%;
		overflow-y: scroll;
		border-radius: 4px;
	}

	li {
		padding-block: 1rem;
		padding-inline: 16px;
	}

	li:nth-child(even) {
		background: #2b2b2b;
	}

	div {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding-bottom: 32px;
	}

	div button {
		border: none;
		outline: none;
		background: none;
		color: gray;
		cursor: pointer;
	}
</style>
