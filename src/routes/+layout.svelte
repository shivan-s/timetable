<script lang="ts">
	import '$lib/assets/css/app.css';
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
</style>
