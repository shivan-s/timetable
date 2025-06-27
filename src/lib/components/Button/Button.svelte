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

<!--
@component

Button
-->

<button style="--hue: {hue}" {...restProps}>{@render children()}</button>

<style>
	button {
		--sat: 75%;
		color: hsla(var(--hue), var(--sat), 15%, 1);
		background-color: hsla(var(--hue), var(--sat), 75%, 1);
		border: solid 2px hsla(var(--hue), var(--sat), 15%, 1);
		box-shadow: 0.125rem 0.125rem 0rem hsla(var(--hue), var(--sat), 15%, 1);
		min-width: 2rem;
		min-height: 2rem;
		transition-property: background-color, outline;
		transition-timing-function: ease-in-out;
		transition-duration: 0.3s;
		pointer-events: auto !important;
		&:hover {
			background-color: hsla(var(--hue), 75%, 90%, 1);
		}
		&:focus {
			outline-offset: 1px;
			outline: 2px hsla(var(--hue), 7%, 10%, 1) solid;
		}
		&:active {
			box-shadow: none;
		}
	}
</style>
