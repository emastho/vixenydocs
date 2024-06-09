<div class="container">
	<div class="card">
		<h2>Unmatched speed</h2>
		<p>Fastest framework in the ecosystem.</p>
	</div>
	<div class="card">
		<h2>No dependencies</h2>
		<p>Written from scratch, with passion.</p>
	</div>
	<div class="card">
		<h2>Easily testable</h2>
		<p>Nobody likes unexpected behaviour.</p>
	</div>
</div>

<style>
	h2,
	p {
		padding: 0;
		margin: 0;
	}

	h2 {
		font-size: 18px;
		margin-bottom: 8px;
	}
	p {
		font-size: 14px;
		line-height: 1.4;
	}
	.container {
		display: flex;
		column-gap: 8px;
	}

	.card {
		flex: 1;
		padding: 32px;
		background-color: var(--closest);
		border-radius: 4px;
	}

	.card:hover {
		background-color: var(--main);
	}

	@media (width < 1200px) {
		.container {
			flex-direction: column;
			row-gap: 8px;
		}
	}
</style>
