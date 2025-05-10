<script lang="ts">
	import Item from '$lib/items';
	import { draggable } from '$lib/dnd';
	import Icon from '$lib/components/Icon.svelte';
	import { error } from '@sveltejs/kit';
	import { dragging, items } from '$lib/stores';
	import { crossfade } from 'svelte/transition';
	import Button from '$lib/components/Button.svelte';

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
		item.delete();
	}

	const container = item.time ? `${item.time.day}-${item.time.hour}` : '';
</script>

<div
	title={item.name}
	class:dragging={$dragging === item.id}
	style="--hue: {item.hue}"
	in:receive
	out:send
	use:draggable={{
		container,
		dragData: item,
		callbacks: {
			onDragStart: () => dragging.set(item.id),
			onDragEnd: () => dragging.set(null)
		}
	}}
>
	<span>
		{item.name}
	</span>
	<form onsubmit={handleSubmit}>
		<input {...inputProps(item.id)} />
		<Button hue={item.hue}>
			<Icon icon="delete" width="1rem" />
		</Button>
	</form>
</div>

<style>
	@keyframes pulse {
		0% {
			transform: translateY(0);
		}
		80% {
			transform: translateY(-0.25rem);
		}
		100% {
			transform: translateY(0);
		}
	}
	div {
		--sat: 75%;
		display: grid;
		grid-template-columns: 1fr auto;
		grid-template-rows: 1fr;
		align-items: center;
		grid-gap: 0.25rem;
		cursor: grab;
		color: hsla(var(--hue), var(--sat), 10%, 1);
		border: 2px solid hsla(var(--hue), var(--sat), 15%, 1);
		padding: 0.25rem 0.5rem;
		background-color: hsla(var(--hue), var(--sat), 80%, 1);
		box-shadow: 0.125rem 0.125rem 0 hsla(var(--hue), var(--sat), 15%, 0.8);
		z-index: 1;
		transition: box-shadow 0.5s ease-in-out;
		& span {
			white-space: nowrap;
		}
	}
	div:active {
		cursor: grabbing;
		user-select: none;
		z-index: 1;
		animation: pulse 1s infinite;
		box-shadow: 0.5rem 0.5rem 0.125rem hsla(var(--hue), var(--sat), 20%, 0.6);
	}
</style>
