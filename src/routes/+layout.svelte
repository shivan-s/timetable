<script lang="ts">
	let { children } = $props();
	import * as m from '$i18n/messages.js';
</script>

<svelte:head><title>{m.timetable()}</title></svelte:head>

<header>
	<h1>{m.timetable()}</h1>
</header>
<main>
	{@render children()}
</main>
<footer></footer>

<style>
	:root {
		--border-radius: 0.25rem;
		--gap: 0.5rem;
		--padding-inline: 0.5rem;
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
		flex-direction: column;
		padding-inline: var(--padding-inline);
		gap: var(--gap);
	}

	header {
		margin-inline: 0.5rem;
	}

	footer {
		height: 1rem;
	}
</style>
