<script lang="ts">
	let { children } = $props();
	import * as m from '$i18n/messages.js';
	import Footer from '$lib/components/Footer.svelte';
</script>

<svelte:head><title>{m.timetable()}</title></svelte:head>

<header></header>
<main>
	{@render children()}
</main>
<footer><Footer /></footer>

<style>
	:root {
		/* colour */
		--c-primary: hsla(300, 7%, 10%, 1);
		--c-background: hsla(300, 85%, 95%, 1);
		--c-shadow: hsla(300, 7%, 10%, 0.6);
		/* spacing */
		--border-radius: 0.25rem;
		--gap: 0.5rem;
		--padding-inline: 0.5rem;
		--padding: 0.5rem;
	}

	:global(body) {
		display: grid;
		grid-template-rows: auto 1fr auto;
		margin: 0rem;
		padding: 0rem;
		min-height: 100dvh;
		background-color: var(--c-background);
		color: var(--c-primary);
	}

	main {
		display: flex;
		flex-direction: column;
		padding-inline: var(--padding-inline);
		gap: var(--gap);
	}

	header {
		margin-block-end: 0.5rem;
	}

	footer {
		margin-block-start: 0.5rem;
	}
</style>
