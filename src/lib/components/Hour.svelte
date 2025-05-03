<script lang="ts">
	import type { DAY, HOUR } from '$lib/constants';
	import { droppable, handleDrop } from '$lib/dnd';
	import type { HTMLAttributes, HTMLButtonAttributes } from 'svelte/elements';
	import Icon from './Icon.svelte';
	import CreateItem from './CreateItem.svelte';
	import Item from '$lib/components/Item.svelte';
	import { flip } from 'svelte/animate';
	import { items } from '$lib/stores';
	import { sineIn } from 'svelte/easing';
	import type { crossfade } from 'svelte/transition';

	interface Props {
		day: DAY;
		hour: HOUR;
		send: ReturnType<typeof crossfade>[0];
		receive: ReturnType<typeof crossfade>[1];
	}
	let { day, hour, send, receive }: Props = $props();

	const dialogProps: HTMLAttributes<HTMLDialogElement> = {
		id: `popover-${day}-${hour}`,
		popover: ''
	};

	const buttonProps: HTMLButtonAttributes = {
		class: 'hour',
		popovertargetaction: 'toggle',
		'aria-label': `${day} ${hour}`,
		title: `${day} ${hour}`,
		popovertarget: dialogProps.id
	};
</script>

<button
	{...buttonProps}
	use:droppable={{ container: `${day}-${hour}`, callbacks: { onDrop: handleDrop } }}
>
	<span class="items">
		{#each $items.filter((i) => i.time?.day === day && i.time?.hour === hour) as item (item.id)}
			<span animate:flip={{ easing: sineIn }}>
				<Item {send} {receive} {item} />
			</span>
		{/each}
		<span class="icon">
			<Icon icon="create" />
		</span>
	</span>
</button>

<dialog {...dialogProps}>
	<span class="header"
		><span class="time"
			>{day}
			{hour}</span
		>
		<button class="close" popovertarget={dialogProps.id} popovertargetaction="hide">&#x2715</button>
	</span>
	<CreateItem {day} {hour} popoverId={dialogProps.id!} />
</dialog>

<style>
	button.hour {
		display: grid;
		grid-template-areas: 'stack';
		border: none;
		background: inherit;
		border-top: lightgray solid 1px;
		& > span {
			grid-area: stack;
			&.items {
				display: flex;
				gap: var(--gap);
				align-items: center;
				overflow-x: scroll;
				& > .icon {
					display: flex;
					min-width: 2rem;
					max-width: 2rem;
					transition:
						display 0.5s 0.2s ease-in-out,
						opacity 0.5s 0.2s ease-in-out;
					transition-behavior: allow-discrete;
					visibility: hidden;
					opacity: 0;
				}
			}
		}
		&:hover > span.items > span.icon {
			visibility: visible;
			opacity: 0.3;
		}
	}

	dialog {
		border: solid 2px var(--c-primary);
		border-radius: 0;
		padding: var(--padding);
		box-shadow: 0.5rem 0.5rem 0 hsla(0, 100%, 0%, 0.7);
		transition:
			display 0.5s ease-in-out,
			opacity 0.5s ease-in-out;
		transition-behavior: allow-discrete;
		opacity: 0;
		&:popover-open {
			display: flex;
			flex-direction: column;
			opacity: 1;

			@starting-style {
				opacity: 0;
			}
		}
	}
</style>
