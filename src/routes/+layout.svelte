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
	@font-face {
		font-family: 'Nunito';
		font-optical-sizing: auto;
		font-weight: 400;
		font-style: normal;
		src: url('/fonts/Nunito.ttf') format('ttf');
	}
	:global(*) {
		box-sizing: border-box;
		font-family: 'Nunito', sans-serif;
		line-height: 1;
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
		width: 100dvw;
	}

	header {
		background-color: hsla(var(--hue), 25%, 95%, 1);
		color: hsla(var(--hue), 7%, 10%, 1);
	}

	footer {
		background-color: hsla(var(--hue), 25%, 95%, 1);
		color: hsla(var(--hue), 8%, 10%, 1);
		padding-block-end: 0.25rem;
		width: 100dvw;
	}
</style>
