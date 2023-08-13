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
	<svg xmlns="http://www.w3.org/2000/svg" color="#6f5c9b" width="24" height="24" viewBox="0 0 24 24"
		><path fill="currentColor" d="M4 6h16v2H4V6zm0 5h16v2H4v-2zm16 5H4v2h16v-2z" /></svg
	>
{/if}

<style>
	.icon {
		width: 18px;
		height: 18px;
	}
</style>
