<script lang="ts">
	import Item from '$lib/items';
	import { draggable, UNASSIGNED_ITEMS_CONTAINER } from '$lib/dnd';
	import Icon from '$lib/components/Icon.svelte';
	import { error } from '@sveltejs/kit';
	import { items } from '$lib/stores';
	import { crossfade, fade } from 'svelte/transition';
	import { sineIn } from 'svelte/easing';

	interface Props {
		item: Item;
		send: ReturnType<typeof crossfade>[0];
		receive: ReturnType<typeof crossfade>[1];
	}
	let { send, receive, item }: Props = $props();

	const inputName = 'itemId';
	const inputProps = (itemId: ReturnType<typeof crypto.randomUUID>) => ({
		type: 'hidden',
		name: inputName,
		value: itemId
	});

	function handleSubmit(event: SubmitEvent & { currentTarget: EventTarget & HTMLFormElement }) {
		event.preventDefault();
		const formData = new FormData(event.currentTarget);
		const itemId = formData?.get(inputName)?.toString() || error(500);
		const item = Item.find(itemId, $items);
		if (item.time) {
			item.unassign();
		} else {
			item.delete();
		}
	}

	const container = item.time ? `${item.time.day}-${item.time.hour}` : UNASSIGNED_ITEMS_CONTAINER;
</script>

<div
	style="--colour: {item.colour}"
	in:receive
	out:send
	use:draggable={{ container, dragData: item }}
>
	{item.name}
	<form onsubmit={handleSubmit}>
		<input {...inputProps(item.id)} />
		<button in:fade={{ easing: sineIn }}>
			<Icon icon="delete" width="1rem" />
		</button>
	</form>
</div>

<style>
	div {
		display: grid;
		grid-template-columns: 1fr auto;
		grid-template-rows: 1fr;
		align-items: center;
		grid-gap: 0.25rem;
		cursor: grab;
		border: var(--c-primary) solid 2px;
		background-color: var(--colour);
		padding: 0.25rem 0.5rem;
		overflow: hidden;
		box-shadow: 0.25rem 0.25rem 0 var(--c-shadow);
	}
	div:active {
		cursor: grabbing;
	}
</style>
