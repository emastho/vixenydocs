<script lang="ts">
	export let which: string;
</script>

{#if which === 'link'}
	<svg class="icon" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 256 256"
		><path
			fill="currentColor"
			d="M136.37 187.53a12 12 0 0 1 0 17l-5.94 5.94a60 60 0 0 1-84.88-84.88l24.12-24.11A60 60 0 0 1 152 99a12 12 0 1 1-16 18a36 36 0 0 0-49.37 1.47l-24.1 24.08a36 36 0 0 0 50.92 50.92l5.94-5.94a12 12 0 0 1 16.98 0Zm74.08-142a60.09 60.09 0 0 0-84.88 0l-5.94 5.94a12 12 0 0 0 17 17l5.94-5.94a36 36 0 0 1 50.92 50.92l-24.11 24.12A36 36 0 0 1 120 139a12 12 0 1 0-16 18a60 60 0 0 0 82.3-2.43l24.12-24.11a60.09 60.09 0 0 0 .03-84.91Z"
		/></svg
	>
{:else if which == 'menu'}
	<svg xmlns="http://www.w3.org/2000/svg" color="#6f5c9b" width="32" height="32" viewBox="0 0 24 24"
		><path fill="currentColor" d="M4 6h16v2H4V6zm0 5h16v2H4v-2zm16 5H4v2h16v-2z" /></svg
	>
{:else if which == 'search'}
	<svg class="search" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"
		><path
			fill="currentColor"
			d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5A6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5S14 7.01 14 9.5S11.99 14 9.5 14"
		/></svg
	>
{/if}

<style>
	.icon {
		width: 24px;
		height: 24px;
	}

	.search {
		color: #363a40;
	}
</style>
