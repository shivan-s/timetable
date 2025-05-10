<script lang="ts">
	import { type DAY, HOURS } from '$lib/constants';
	import type { Snippet } from 'svelte';
	interface Props {
		day: DAY;
		children: Snippet;
	}
	let { day, children }: Props = $props();
</script>

<div title={day} style="--hourlength: {HOURS.length}">
	<header>{day}</header>
	{@render children?.()}
</div>

<style>
	div {
		display: grid;
		grid-template-rows: auto repeat(var(--hourlength), 1fr);
		& > header {
			position: sticky;
			top: 0;
			text-align: center;
			user-select: none;
			backdrop-filter: blur(3px);
			padding-block: 0.125rem;
			backdrop-filter: blur(3px);
			z-index: 1;
		}

		&:not(:first-child) {
			border-inline-end: gray solid 1px;
		}
	}
</style>
