<script lang="ts">
	// import list from '$lib/data.json';
	import { create, insert, search } from '@orama/orama';
	import { onMount } from 'svelte';
	import { searchModal } from '$lib/stores/main';

	let input: HTMLInputElement;
	// i know, input.value just didnt work and im tired of trying to find out why
	let inputValue = '';
	let db;
	let searchResult = [];
	let loading = true;

	async function fetchData() {
		const res = await fetch('/src/lib/data.json');
		const data = await res.json();
		loading = false;
		console.log(data);
	}

	// async function initializeDatabase() {
	// 	db = await create({
	// 		schema: { content: 'string', route: 'string' }
	// 	});

	// 	list.map(async (item) => {
	// 		await insert(db, {
	// 			content: item.content,
	// 			route: item.route
	// 		});
	// 	});

	// 	loading = false;
	// }

	// async function performSearch(term) {
	// 	searchResult = await search(db, {
	// 		term
	// 	});
	// }

	// initializeDatabase();

	onMount(() => {
		input.focus();
		fetchData();
	});
</script>

<div>
	<strong>Search</strong>
	<button on:click|preventDefault={() => searchModal.set(false)}>Close</button>
</div>
<div class="inputDiv">
	<input type="text" placeholder="Keyword..." bind:this={input} bind:value={inputValue} />
	{#if inputValue.length > 0}
		<button class="clear" on:click={() => (inputValue = '')}>Clear</button>
	{/if}
</div>
{#if loading}
	loading
{/if}
<ul>
	<!-- {#each searchResult.hits ?? [] as item}
		<li>
			<a href={item.document.route} on:click={() => searchModal.set(false)}>
				{item.document.route}
			</a>
		</li>
	{/each} -->
</ul>

<style>
	input {
		outline: none;
		border: none;
		color: white;
		background: transparent;
	}

	ul {
		height: 100%;
		overflow-y: scroll;
		border-radius: 4px;
	}
	.inputDiv {
		position: relative;
		width: 100%;
		padding: 1rem;
		background: #222222;
		border-radius: 4px;

		margin-bottom: 16px;
	}

	.inputDiv input {
		position: relative;
		width: 100%;
		height: 100%;
	}

	.clear {
		position: absolute;
		top: 0;
		right: 0;
		height: 100%;
		padding-inline: 16px;
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
		padding-bottom: 16px;
	}

	div button {
		border: none;
		outline: none;
		background: none;
		color: gray;
		cursor: pointer;
	}

	div button:hover {
		text-decoration: underline;
	}
</style>
