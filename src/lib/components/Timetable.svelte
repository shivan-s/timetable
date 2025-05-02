<script lang="ts">
	import { DAYS, HOURS } from '$lib/constants';
	import Day from '$lib/components/Day.svelte';
	import Item from '$lib/components/Item.svelte';
	import Hour from '$lib/components/Hour.svelte';
	import { flip } from 'svelte/animate';
	import { items } from '$lib/stores';
	import { sineIn } from 'svelte/easing';

	const { send, receive } = $props();
</script>

<section style="--daylength: {DAYS.length}">
	<div class="hour-column">
		<span></span>
		{#each HOURS as hour (hour)}<span>{hour}</span>{/each}
	</div>
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

<style>
	section {
		height: 100%;
		display: grid;
		grid-template-columns: auto repeat(var(--daylength), 1fr);
		border: darkslategray solid 1px;
		border-radius: var(--border-radius);
		overflow: scroll;
	}

	div.hour-column {
		position: sticky;
		left: 0;
		display: grid;
		grid-template-rows: 1rem repeat(var(--hourlength), 1fr);
	}
</style>
