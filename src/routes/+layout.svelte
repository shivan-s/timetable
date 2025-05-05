<script lang="ts">
	let { children } = $props();
	import * as m from '$i18n/messages.js';
	import Footer from '$lib/components/Footer.svelte';
	import { SEED } from '$lib/constants';
</script>

<svelte:head><title>{m.timetable()}</title></svelte:head>

<header style="--hue: {SEED}"></header>
<main style="--hue: {SEED}">
	{@render children()}
</main>
<footer style="--hue: {SEED}"><Footer /></footer>

<style>
	:global(*) {
		box-sizing: border-box;
	}
	:root {
		/* colour */
		--c-primary: hsla(300, 7%, 10%, 1);
		--c-highlight: hsla(300, 85%, 85%, 1);
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
	}

	main {
		display: flex;
		background-color: hsla(var(--hue), 25%, 95%, 1);
		color: hsla(var(--hue), 7%, 10%, 1);
		flex-direction: column;
		gap: var(--gap);
		padding: var(--padding);
	}

	header {
		background-color: hsla(var(--hue), 25%, 95%, 1);
		color: hsla(var(--hue), 7%, 10%, 1);
	}

	footer {
		background-color: hsla(var(--hue), 25%, 95%, 1);
		color: hsla(var(--hue), 8%, 10%, 1);
		padding-block-end: 0.25rem;
	}
</style>
