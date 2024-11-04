<script>
	import { sidebar } from '$lib/stores/main';
	import Iconie from './Iconie.svelte';

	import Logo from '$lib/assets/vixenylogo-2.png';
</script>

<header>
	<div class="header-container">
		<div>
			<a href="/">
				<img class="logo" src={Logo} alt="Logo" height="50" />
			</a>
		</div>
		<div>
			<button on:click={() => sidebar.set(true)}>
				<Iconie which="menu" />
			</button>
		</div>
	</div>
</header>

<style>
	header {
		width: 100%;
		display: none;
		/* background: var(--side); */
		border-bottom: 2px solid var(--side);
		padding-block: 16px;
		align-items: center;
	}

	.header-container {
		width: 80%;
		margin: 0 auto;
		display: flex;
	}

	.header-container div:nth-child(2) {
		flex-shrink: 0;
		text-align: center;
		display: flex;
		align-items: center;
		justify-content: end;
	}

	.header-container > * {
		flex: 1;
	}

	.header-container div:last-child {
		text-align: right;
	}

	header button {
		background: var(--bg);
		border: none;
		padding: 0.4rem;
		aspect-ratio: 1/1;
		border-radius: 4px;
	}

	header button:focus-visible {
		outline: 2px solid #6f5c9b;
	}
</style>
