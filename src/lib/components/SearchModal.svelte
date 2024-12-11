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
		content: 'string',
		topic: 'string',
		from: 'string'
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
		}).then((x) => console.log(x) ?? x);
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
					Not found
					<br />
					<br />
					<table>
						<thead>
							<tr>
								<th>Shortcut</th>
								<th>Action</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td>Shift + S</td>
								<td>Focus search bar</td>
							</tr>
							<tr>
								<td>Shift + A</td>
								<td>Focus first element</td>
							</tr>
							<tr>
								<td>Shift + Z</td>
								<td>Zen mode</td>
							</tr>
							<tr>
								<td>Shift + L</td>
								<td>Light / Dark mode</td>
							</tr>
							<tr>
								<td>Tab</td>
								<td>Jump faster!</td>
							</tr>
						</tbody>
					</table>
				{/if}
				{#each results.hits as item, i}
					<a
						class={item.document.from}
						tabindex={5 + i}
						on:click={clickOnLink}
						href={item.document.url}
					>
						{item.document.topic}</a
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
		margin: 0.5em 0;
		padding-left: 16px;
		border-left: 5px;
	}

	a.info {
		margin: 0.5em 0;
		padding-left: 16px;
		border-left: 5px solid var(--info);
	}

	a.essential {
		margin: 0.5em 0;
		padding-left: 16px;
		border-left: 5px solid var(--main);
	}

	a.basics {
		margin: 0.5em 0;
		padding-left: 16px;
		border-left: 5px solid var(--second);
	}

	a.advance {
		margin: 0.5em 0;
		padding-left: 16px;
		border-left: 5px solid var(--third);
	}

	a.expert {
		margin: 0.5em 0;
		padding-left: 16px;
		border-left: 5px solid var(--fourth);
	}

	a.fp {
		margin: 0.5em 0;
		padding-left: 16px;
		border-left: 5px solid white;
	}

	a:nth-child(even) {
		background-color: var(--border);
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
