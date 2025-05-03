<script lang="ts">
	import { items } from '$lib/stores';
	import { droppable, UNASSIGNED_ITEMS_CONTAINER, handleDrop } from '$lib/dnd';
	import Item from './Item.svelte';
	import { flip } from 'svelte/animate';
	import { sineIn } from 'svelte/easing';
	import * as m from '$i18n/messages.js';

	const { send, receive } = $props();

	const unassignedItems = $derived($items.filter((i) => !i.time));
</script>

<section>
	<div
		class="empty"
		style:visibility={unassignedItems.length ? 'hidden' : 'visible'}
		style:opacity={unassignedItems.length ? 0 : 1}
	>
		<em>{m.empty()}</em>
	</div>
	<div
		class="content"
		use:droppable={{ container: UNASSIGNED_ITEMS_CONTAINER, callbacks: { onDrop: handleDrop } }}
	>
		{#each unassignedItems as item (item.id)}
			<span animate:flip={{ easing: sineIn }}>
				<Item {send} {receive} {item} />
			</span>
		{:else}{/each}
	</div>
</section>

<style>
	section {
		display: grid;
		grid-template-areas: 'stack';

		& div {
			grid-area: stack;

			& em {
				user-select: none;
			}
		}

		& div.content {
			display: flex;
			gap: 0.25rem;
			padding: 0.25rem;
			flex-wrap: nowrap;
			align-items: center;
			min-height: 2.5rem;
			overflow-x: scroll;
			overflow-y: hidden;
			border: lightgrey dotted 2px;
		}

		& div.empty {
			padding-inline-start: 2rem;
			align-self: center;
			color: grey;
			transition: all 0.3s ease-in-out;
			transition-delay: allow-discrete;
		}
	}
</style>
