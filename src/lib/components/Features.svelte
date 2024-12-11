<div class="container">
	<div class="card">
		<h2>Unmatched</h2>
		<p>Fastest framework in the ecosystem.</p>
	</div>
	<div class="card">
		<h2>No Dependencies</h2>
		<p>Written from scratch, with passion.</p>
	</div>
	<div class="card">
		<h2>Easily Testable</h2>
		<p>Nobody likes unexpected behaviour.</p>
	</div>
</div>
<br />
<div class="container">
	<div class="card">
		<h2>Stable</h2>
		<p>Write it once and forget.</p>
	</div>
	<div class="card">
		<h2>Batteries included</h2>
		<p>Everything in one command.</p>
	</div>
	<div class="card">
		<h2>Frontend support</h2>
		<p>Get accesses to your favorites templates.</p>
	</div>
</div>
<br />
<br />

<style>
	h2,
	p {
		padding: 0;
		margin: 0;
	}

	h2 {
		font-size: 20px; /* Slightly larger for better readability */
		margin-bottom: 10px; /* Increased margin for visual separation */
	}

	p {
		font-size: 16px; /* Increased font size for better readability */
		line-height: 1.6; /* More line spacing for improved readability */
	}

	.container {
		display: flex;
		justify-content: space-between; /* Ensures even spacing between cards */
		gap: 20px; /* Increased gap for better visual separation */
	}

	.card {
		flex: 1;
		padding: 24px; /* Adjusted padding for better content display */

		border: 2px solid var(--closer);
		/* border-bottom: 4px solid var(--main); */
		box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1); /* Soft shadow for 3D effect */
		border-radius: 0px; /* Rounded corners for a smoother look */
		transition: transform 0.3s, box-shadow 0.3s; /* Smooth transitions for interactions */
		position: relative;
	}

	.card::before {
		content: '';
		display: block;
		height: 4px;
		width: 100%;
		position: absolute;
		bottom: 0;
		left: 0;
		background-color: var(--main);
		z-index: 1;
	}

	.card:hover {
		transform: translateY(-5px); /* Lift effect on hover */
		box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2); /* Enhanced shadow on hover for depth */
	}

	@media (max-width: 1200px) {
		.container {
			flex-direction: column;
			gap: 16px; /* More gap between stacked cards */
		}
	}
</style>
