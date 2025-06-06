<script lang="ts">
	import { DAYS, HOURS, SEED, type DAY, type HOUR } from '$lib/constants';
	import { droppable, handleDrop } from '$lib/dnd';
	import CreateItem from './CreateItem.svelte';
	import Item from '$lib/components/Item.svelte';
	import { flip } from 'svelte/animate';
	import { items } from '$lib/stores';
	import { sineIn } from 'svelte/easing';
	import type { crossfade } from 'svelte/transition';
	import Icon from '$lib/components/Icon';
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
	let filteredItems = $derived($items.filter((i) => i.time?.day === day && i.time?.hour === hour));
</script>

<div
	class="wrapper"
	style="--hue: {hue}"
	use:droppable={{ container: `${day}-${hour}`, callbacks: { onDrop: handleDrop } }}
>
	<div class="contents">
		{#each filteredItems as item (item.id)}
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
	<span class:show={filteredItems.length > 1} class="circle"> </span>
</div>
<CreateItem {hue} {day} {hour} popoverId={buttonProps.popovertarget} />

<style>
	div.wrapper {
		display: grid;
		grid-template-areas: 'stack';
		border: none;
		background-color: hsla(var(--hue), 25%, 95%, 1);
		border-top: lightgray solid 1px;
		overflow-x: scroll;
		scrollbar-width: none;
		min-height: 3rem;
		min-width: 10ch;
		& > * {
			grid-area: stack;
		}
		& span.circle {
			position: sticky;
			bottom: 0.5rem;
			right: 0.5rem;
			z-index: 2;
			place-self: end;
			width: 0.75rem;
			height: 0.75rem;
			box-shadow: 0px 0px 3px hsla(var(--hue), 45%, 65%, 0.8);
			border-radius: 0.5rem;
			background-color: hsla(var(--hue), 45%, 65%, 0.8);
			transition:
				display 0.5s ease-in-out allow-discrete,
				opacity 0.5s ease-in-out allow-discrete;
			visibility: hidden;
			opacity: 0;
			&.show {
				visibility: visible;
				opacity: 1;
			}
		}
		& div.contents {
			display: flex;
			flex-wrap: nowrap;
			gap: var(--gap);
			align-items: center;
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
	}
</style>
