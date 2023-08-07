<script>
	import '../app.css';
	import '../theme.css';
	import { fly } from 'svelte/transition';
	import Logo from '$lib/assets/vixenylogo.png';
	import ProgressBar from 'svelte-progress-bar';
	import { page } from '$app/stores';
	import { beforeNavigate, afterNavigate } from '$app/navigation';
	let progress;

	beforeNavigate(() => {
		progress.start();
	});

	afterNavigate(() => {
		progress.complete();
	});

	let sidebar = false;

	const showSidebar = () => {
		sidebar = !sidebar;
	};
</script>

<ProgressBar bind:this={progress} color="#6F5C9B" minimum="0.40" intervalTime="600" />

<svelte:head>
	<link rel="preload" as="image" href={Logo} />
</svelte:head>
<main>
	{#if sidebar}
		<div transition:fly={{ x: -300, duration: 150, opacity: 1 }} class="menu">
			oh no I didnt expect you here
		</div>
	{/if}
	<header>
		<div />
		<div>
			<a href="/">
				<img src={Logo} alt="Logo" height="45" />
			</a>
		</div>
		<div>
			<button on:click={showSidebar}>X</button>
		</div>
	</header>
	<div class="container">
		<aside>
			<div class="logoArea">
				<a href="/">
					<img src={Logo} alt="Logo" height="45" />
				</a>
			</div>
			<nav>
				<div class="title">Unleash the functional beast~</div>
				<ul>
					<li>
						<a href="/basics" class={$page.url.pathname === '/basics' ? 'active' : ''}>Basics</a>
					</li>
					<li>
						<a href="/two" class={$page.url.pathname === '/two' ? 'active' : ''}>two</a>
					</li>
					<li>
						<a href="/other" class={$page.url.pathname === '/other' ? 'active' : ''}>other</a>
					</li>
					<li>
						<a href="/more" class={$page.url.pathname === '/more' ? 'active' : ''}>more</a>
					</li>
				</ul>
			</nav>
		</aside>
		<section>
			<slot />
		</section>
	</div>
</main>

<style>
	aside {
		flex-shrink: 0;
		width: 270px;
		height: 100vh;
		background-color: #252525;
		padding: 3rem 1.6rem;
		display: flex;
		flex-direction: column;
	}

	.logoArea {
		display: flex;
		justify-content: center;
		flex-shrink: 0;
	}

	nav {
		margin-top: 3rem;
		align-items: start;
		flex-grow: 1;
	}

	ul {
		width: 100%;
		margin: 0;
	}

	ul > * {
		margin-bottom: 0.4rem;
	}

	ul > *:last-child {
		margin-bottom: 0;
	}

	ul li {
		font-size: 14px;
		padding: unset;
	}

	ul li a {
		display: block;
		/* background: #2f2f2f; */
		padding: 0.7rem 1.2rem;
		border-radius: 8px;
		border: 2px solid #2f2f2f;
		transition: 150ms all;
	}

	ul li .active {
		border-color: #6f5c9b;
		background: #6f5c9b;
	}

	nav .title {
		color: rgb(206, 206, 206);
		display: block;
		font-size: small;
		padding-block: 16px;
		padding-left: 0.2rem;
	}

	.container {
		display: flex;
		flex-wrap: wrap;
	}

	section {
		flex: 1;
		padding: 3rem 4rem;
		color: white;
		height: 100vh;
		overflow-y: scroll;
	}

	a {
		text-decoration: none;
		color: white;
	}

	ul {
		list-style: none;
		padding: 0;
	}

	header {
		width: 100%;
		display: none;
		background: #252525;
		padding: 1.5rem;
	}

	header div:nth-child(2) {
		flex-shrink: 0;
		text-align: center;
	}

	header > * {
		flex: 1;
	}

	header div:last-child {
		text-align: right;
	}

	header button {
		background: #383838;
		border: none;
		padding: 1rem;
		border-radius: 4px;
	}

	.menu {
		background: #222;
		position: fixed;
		width: 270px;
		height: 100%;
		padding: 3rem;
	}

	@media (width < 1100px) {
		aside {
			display: none;
		}

		header {
			display: flex;
		}

		section {
			height: auto;
		}
	}
</style>
