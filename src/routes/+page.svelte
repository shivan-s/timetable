<script lang="ts">
	import { crossfade, scale } from 'svelte/transition';
	import { sineIn } from 'svelte/easing';
	import { type Snapshot } from './$types';
	import type Item from '$lib/items';
	import { items } from '$lib/stores';
	import Timetable from '$lib/components/Timetable.svelte';

	export const snapshot: Snapshot<Item[]> = {
		capture: () => $items,
		restore: (value) => items.set(value)
	};

	const [send, receive] = crossfade({ easing: sineIn, fallback: scale });
</script>

<Timetable {send} {receive} />
