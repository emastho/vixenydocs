<section>
	<div class="image">1</div>
	<div class="image">1</div>
	<div class="image">1</div>
	<div class="image">1</div>
	<div class="image">1</div>
	<div class="image">1</div>
	<div class="image">1</div>
	<div class="image">1</div>
	<div class="image">1</div>
</section>

<style>
	section {
		display: flex;
		flex-wrap: wrap;
		gap: 8px;
	}

	section .image {
		width: calc((100% / 3) - 16px);
		aspect-ratio: 1 / 1;
		border: 2px solid black;
		border-radius: 8px;
	}
</style>
