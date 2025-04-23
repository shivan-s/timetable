<script lang="ts">
	import { type Item, deleteItem } from '$lib/items';
	import DeleteIcon from '$lib/components/icons/DeleteIcon.svelte';
	import type { HTMLInputAttributes } from 'svelte/elements';
	import { z } from 'zod';
	import { draggable, UNASSIGNED_ITEMS_CONTAINER } from '$lib/dnd';

	interface Props {
		item: Item;
	}
	let { send, receive, item }: Props = $props();

	const container = item.time ? `${item.time.day}-${item.time.hour}` : UNASSIGNED_ITEMS_CONTAINER;

	const inputName = 'item-id';
	const inputProps: (itemId: string) => HTMLInputAttributes = (itemId) => ({
		type: 'hidden',
		name: inputName,
		value: itemId
	});
	function handleSubmit(event: SubmitEvent & { currentTarget: EventTarget & HTMLFormElement }) {
		event.preventDefault();
		const formData = new FormData(event.currentTarget);
		const result = z
			.string()
			.uuid()
			.pipe(z.custom<ReturnType<typeof crypto.randomUUID>>((data) => data))
			.safeParse(formData.get(inputName));
		if (result.success) {
			const itemId = result.data;
			deleteItem(itemId);
			event.currentTarget.reset();
		}
		console.log(result.error);
	}
</script>

<div in:receive out:send use:draggable={{ container, dragData: item }}>
	{item.name}
	<form onsubmit={handleSubmit}>
		<input {...inputProps(item.id)} />
		<button><DeleteIcon /></button>
	</form>
</div>

<style>
	div {
		display: grid;
		grid-template-columns: 1fr auto;
		grid-gap: 0.25rem;
		cursor: grab;
		border: black solid 1px;
		border-radius: 0.25rem;
		padding: 0.25rem 0.5rem;
	}
	div:active {
		cursor: grabbing;
	}
</style>
