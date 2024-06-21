<script lang="ts">
	import { clickOutside } from '$lib/utils/clickOutside';
	import {
		create,
		insertMultiple,
		search,
		type TypedDocument,
		type Orama,
		type Results
	} from '@orama/orama';
	import { searchStore, searchModal, inputTarget } from '$lib/stores/main';

	$: if ($searchStore.length > 0) {
		searchModal.set(true);
	} else if ($searchStore.length <= 0) {
		searchModal.set(false);
	}

	let repeat = 0;

	let searchData: {
		url: string;
		content: string;
	}[];

	let db: any;

	type SearchDocument = TypedDocument<Orama<typeof documentSchema>>;

	const documentSchema = {
		url: 'string',
		content: 'string'
	} as const;

	async function loadData() {
		let data = await import('$lib/data.json');
		searchData = data.default;
	}

	async function createSchema() {
		db = await create({ schema: documentSchema });
	}

	async function insertData() {
		await insertMultiple(db, searchData, 500);
	}

	async function searchStuff() {
		results = await search(db, {
			term: $searchStore
		});
	}

	let results: null | Results<SearchDocument>;
	$: if ($searchStore.length > 0) {
		if (repeat == 0) {
			loadData().then(createSchema).then(insertData);
			repeat = 1;
		}
		if (db) {
			searchStuff();
		}
	}

	const clickOnLink = () => {
		searchModal.set(false);
		searchStore.set('');
	};
</script>

{#if $searchModal}
	<div class="searchModal" use:clickOutside on:click_outside={() => searchModal.set(false)}>
		<div class="modalContent">
			{#if results}
				{#if results.hits.length < 1}
					No results
				{/if}
				{#each results.hits as item, i}
					<a tabindex={5 + i} on:click={clickOnLink} href={item.document.url}>
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

	a:focus {
		outline: 4px solid var(--main);
	}

	@media (width < 1100px) {
		.searchModal {
			width: calc(100% - 24px);
		}
	}
</style>
