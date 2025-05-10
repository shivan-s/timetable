<script lang="ts">
	import { DAYS, HOURS, SEED, type DAY, type HOUR } from '$lib/constants';
	import { droppable, handleDrop } from '$lib/dnd';
	import CreateItem from './CreateItem.svelte';
	import Item from '$lib/components/Item.svelte';
	import { flip } from 'svelte/animate';
	import { items } from '$lib/stores';
	import { sineIn } from 'svelte/easing';
	import type { crossfade } from 'svelte/transition';
	import Icon from '$lib/components/Icon.svelte';
	import type { HTMLButtonAttributes } from 'svelte/elements';

	interface Props {
		day: DAY;
		hour: HOUR;
		send: ReturnType<typeof crossfade>[0];
		receive: ReturnType<typeof crossfade>[1];
	}
	let { day, hour, send, receive }: Props = $props();

	const buttonProps: HTMLButtonAttributes = {
		popovertargetaction: 'toggle',
		'aria-label': `${day} ${hour}`,
		title: `${day} ${hour}`,
		popovertarget: `popover-${day}-${hour}`
	};

	const hue =
		SEED + (DAYS.findIndex((d) => d === day) + HOURS.findIndex((h) => h === hour)) * (30 + 60);
</script>

<div
	style="--hue: {hue}"
	use:droppable={{ container: `${day}-${hour}`, callbacks: { onDrop: handleDrop } }}
>
	{#each $items.filter((i) => i.time?.day === day && i.time?.hour === hour) as item (item.id)}
		<span animate:flip={{ easing: sineIn }}>
			<Item {send} {receive} {item} />
		</span>
	{/each}
	<button {...buttonProps}>
		<span class="icon">
			<Icon icon="create" />
		</span>
	</button>
</div>
<CreateItem {hue} {day} {hour} popoverId={buttonProps.popovertarget} />

<style>
	div {
		display: flex;
		flex-wrap: nowrap;
		gap: var(--gap);
		align-items: center;
		border: none;
		background-color: hsla(var(--hue), 25%, 95%, 1);
		border-top: lightgray solid 1px;
		min-height: 3rem;
		min-width: 10ch;
		transition: background-color 0.3s ease-in-out;
		overflow-x: scroll;
		scrollbar-width: none;
		& > button {
			background: none;
			width: 100%;
			height: 100%;
			border: 2px dashed transparent;
			display: grid;
			grid-template-areas: 'stack';
			justify-content: center;
			align-items: center;
			transition: border 0.5s ease-in-out;
			& > * {
				grid-area: stack;
			}
			& > span.icon {
				width: 2rem;
				transition:
					display 0.5s ease-in-out allow-discrete,
					opacity 0.5s ease-in-out allow-discrete;
				visibility: hidden;
				opacity: 0;
			}
			&:focus {
				border: 2px dashed grey;
			}
		}
		&:hover {
			& > button {
				border: 2px dashed darkslategrey;
				& > span.icon {
					visibility: visible;
					opacity: 0.3;
				}
			}
		}
	}
</style>
