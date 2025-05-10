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
		font-family: 'Nunito', sans-serif;
		line-height: 1;
	}
	:root {
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
	:global(body:has(:popover-open) :is(button, a)) {
		pointer-events: none;
	}
	main {
		display: flex;
		background-color: hsla(var(--hue), 25%, 95%, 1);
		color: hsla(var(--hue), 7%, 10%, 1);
		flex-direction: column;
		gap: var(--gap);
		padding: var(--padding);
		max-height: 100dvh;
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

	@font-face {
		font-family: 'Nunito';
		src: url('$lib/assets/fonts/Nunito-VariableFont_wght.ttf') format('truetype');
	}
</style>
