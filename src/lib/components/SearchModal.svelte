<script>
	import { clickOutside } from '$lib/utils/clickOutside';
	import { searchStore, searchModal } from '$lib/stores/main';
	$: if ($searchStore.length > 0) {
		searchModal.set(true);
	} else if ($searchStore.length <= 0) {
		searchModal.set(false);
	}
</script>

{#if $searchModal}
	<div class="searchModal" use:clickOutside on:click_outside={() => searchModal.set(false)}>
		<div class="modalContent">
			{$searchStore}
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
</style>
