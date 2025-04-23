<script lang="ts">
	let { children } = $props();
</script>

<main>
	{@render children()}
</main>

<style>
	:global(body) {
		margin: 0rem;
		padding: 0rem;
	}

	main {
		display: grid;
		grid-template-rows: auto 1fr auto;
		min-height: 100dvh;
		padding: 0 1rem;
	}
</style>
