<script lang="ts">
	import type Item from '$lib/items';
	import type { Snippet } from 'svelte';
	import type { HTMLButtonAttributes } from 'svelte/elements';

	interface Props extends HTMLButtonAttributes {
		hue?: Item['hue'];
		children: Snippet;
	}

	let { children, hue, ...restProps }: Props = $props();
</script>

<button style="--hue: {hue}" {...restProps}>{@render children()}</button>

<style>
	button {
		--sat: 75%;
		color: hsla(var(--hue), var(--sat), 15%, 1);
		background-color: hsla(var(--hue), var(--sat), 75%, 1);
		background-color: hsla(var(--hue), var(--sat), 75%, 1);
		border: solid 2px hsla(var(--hue), var(--sat), 15%, 1);
		box-shadow: 0.125rem 0.125rem 0rem hsla(var(--hue), var(--sat), 15%, 1);
		min-width: 2rem;
		transition-property: background-color, outline;
		transition-timing-function: ease-in-out;
		transition-duration: 0.3s;
		&:hover {
			background-color: hsla(var(--hue), 75%, 95%, 1);
		}
		&:focus {
			outline: none;
		}
		&:active {
			box-shadow: none;
		}
	}
</style>
