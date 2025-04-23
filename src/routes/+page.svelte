<script lang="ts">
	import { crossfade, scale } from 'svelte/transition';
	import { sineIn } from 'svelte/easing';
	import { DAYS, HOURS } from '$lib/constants';
	import Day from './Day.svelte';
	import Item from './Item.svelte';
	import Hour from './Hour.svelte';
	import { type Snapshot } from './$types';
	import CreateItem from './CreateItem.svelte';
	import type { Items } from '$lib/items';
	import { items } from '$lib/stores';
	import * as m from '$i18n/messages.js';
	import UnassignedItems from './UnassignedItems.svelte';
	import { flip } from 'svelte/animate';

	export const snapshot: Snapshot<Items> = {
		capture: () => $items,
		restore: (value) => items.set(value)
	};

	const [send, receive] = crossfade({ easing: sineIn, fallback: scale });
</script>

<header>
	<h1>{m.timetable()}</h1>
	<UnassignedItems {send} {receive} />
	<CreateItem />
</header>

<section style="--daylength: {DAYS.length}">
	{#each DAYS as day (day)}
		<Day {day}>
			{#each HOURS as hour (hour)}
				<Hour {day} {hour}>
					{#each $items.filter((i) => i.time?.day === day && i.time?.hour === hour) as item (item.id)}
						<span animate:flip={{ easing: sineIn }}>
							<Item {send} {receive} {item} />
						</span>
					{/each}
				</Hour>
			{/each}
		</Day>
	{/each}
</section>

<footer></footer>

<style>
	section {
		display: grid;
		grid-template-columns: repeat(var(--daylength), 1fr);
		border: darkslategray solid 1px;
		border-radius: 0.25rem;
		overflow: scroll;
	}

	footer {
		height: 1rem;
	}
</style>
