<script>
	import { clickOutside } from '$lib/utils/clickOutside';
	import { create, insertMultiple, search } from '@orama/orama';
	import { searchStore, searchModal } from '$lib/stores/main';
	$: if ($searchStore.length > 0) {
		searchModal.set(true);
	} else if ($searchStore.length <= 0) {
		searchModal.set(false);
	}

	let repeat = 0;

	let searchData;

	let db;

	async function loadData() {
		console.log('loading data');
		let data = await import('$lib/data.json');
		searchData = data.default;
	}

	async function createSchema() {
		console.log('creating schema');
		db = await create({
			schema: {
				url: 'string',
				content: 'string'
			}
		});
	}

	async function insertData() {
		console.log(`meow`);
		console.log(db);
		await insertMultiple(db, searchData, 500);
	}

	async function searchStuff() {
		results = await search(db, {
			term: $searchStore
		});
	}

	let results;

	$: if ($searchStore.length > 0) {
		if (repeat == 0) {
			loadData().then(createSchema).then(insertData);
			repeat = 1;
		}
		if (db) {
			searchStuff();
		}
	}
</script>

{#if $searchModal}
	<div class="searchModal" use:clickOutside on:click_outside={() => searchModal.set(false)}>
		<div class="modalContent">
			{#if results}
				{#if results.hits.length < 1}
					No results
				{/if}
				{#each results.hits as item}
					<a on:click={() => searchModal.set(false)} href={item.document.url}>
						{item.document.url}</a
					>
				{/each}
			{/if}
		</div>
	</div>
{/if}

<style>
	.searchModal {
		width: 40%;
		height: 250px;
		position: absolute;
		bottom: 0;
		transform: translateY(100%);
	}

	.modalContent {
		background-color: var(--closest);
		backdrop-filter: blur(7px);
		width: 100%;
		height: 100%;
		padding: 20px;
		overflow-y: scroll;
	}

	a {
		padding-block: 16px;
		padding-inline: 8px;
		margin: 0;
	}
	a:nth-child(even) {
		background-color: var(--side);
	}
</style>
