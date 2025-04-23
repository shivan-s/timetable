<script lang="ts">
	import { items } from '$lib/stores';
	import { droppable, UNASSIGNED_ITEMS_CONTAINER, handleDrop } from '$lib/dnd';
	import Item from './Item.svelte';
	import { flip } from 'svelte/animate';
	import { sineIn } from 'svelte/easing';

	const { send, receive } = $props();
</script>

<div use:droppable={{ container: UNASSIGNED_ITEMS_CONTAINER, callbacks: { onDrop: handleDrop } }}>
	{#each $items.filter((i) => !i.time) as item (item.id)}
		<span animate:flip={{ easing: sineIn }}>
			<Item {send} {receive} {item} />
		</span>
	{/each}
</div>

<style>
	div {
		display: flex;
		gap: 0.25rem;
		flex-wrap: nowrap;
		overflow-x: scroll;
		overflow-y: hidden;
	}
</style>
