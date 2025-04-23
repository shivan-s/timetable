<script lang="ts">
	import type { DAY, HOUR } from '$lib/constants';
	import type { Snippet } from 'svelte';
	import { droppable, handleDrop } from '$lib/dnd';

	interface Props {
		day: DAY;
		hour: HOUR;
		children: Snippet;
	}
	let { day, hour, children }: Props = $props();
</script>

<div use:droppable={{ container: `${day}-${hour}`, callbacks: { onDrop: handleDrop } }}>
	<span class="hour">{hour}</span>
	<span class="items">{@render children?.()}</span>
</div>

<style>
	div {
		display: grid;
		border-top: lightgray solid 1px;

		& > * {
			display: grid;
			grid-template-rows: auto 1fr;
		}

		& span.hour {
			font-size: 0.75rem;
			user-select: none;
		}

		& span.items {
			display: flex;
		}
	}
</style>
