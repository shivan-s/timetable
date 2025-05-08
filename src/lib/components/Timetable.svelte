<script lang="ts">
	import { DAYS, HOURS } from '$lib/constants';
	import Day from '$lib/components/Day.svelte';
	import Hour from '$lib/components/Hour.svelte';

	const { send, receive } = $props();
</script>

<section style="--daylength: {DAYS.length}">
	<div class="hour-column" style="--hourlength: {HOURS.length}">
		<span>&nbsp;</span>
		{#each HOURS as hour (hour)}<span>{hour}</span>{/each}
	</div>
	{#each DAYS as day (day)}
		<Day {day}>
			{#each HOURS as hour (hour)}
				<Hour {day} {hour} {send} {receive}></Hour>
			{/each}
		</Day>
	{/each}
</section>

<style>
	section {
		z-index: 0;
		height: 100%;
		width: 100dwh;
		display: grid;
		grid-template-columns: auto repeat(var(--daylength), 1fr);
		border: 3px solid var(--c-primary);
		overflow: scroll;
		scrollbar-width: none;
	}

	div.hour-column {
		position: sticky;
		left: 0;
		display: grid;
		align-items: center;
		grid-template-rows: auto repeat(var(--hourlength), 1fr);
		padding-inline: 0.125rem;
		border-inline-end: 1px solid grey;
		backdrop-filter: blur(3px);
		z-index: 1;
		& > * {
			text-align: center;
		}
	}
</style>
