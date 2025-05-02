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
		position: sticky;
		top: 0;
		display: grid;
		grid-template-rows: 1rem repeat(var(--hourlength), 1fr);
		& > header {
			text-align: center;
			user-select: none;
		}

		&:not(:first-child) {
			border-left: gray solid 1px;
		}
	}
</style>
