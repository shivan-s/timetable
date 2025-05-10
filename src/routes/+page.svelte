<script lang="ts">
	import { crossfade, scale } from 'svelte/transition';
	import { sineIn } from 'svelte/easing';
	import { items } from '$lib/stores';
	import Timetable from '$lib/components/Timetable.svelte';
	import { page } from '$app/state';
	import { goto } from '$app/navigation';
	import { browser } from '$app/environment';

	// Saves state into URL
	if (browser) {
		items.subscribe((value) => {
			const data = btoa(JSON.stringify(value));
			goto(`?data=${encodeURIComponent(data)}`);
		});
		const dataFromURL = page.url.searchParams.get('data');
		if (dataFromURL) {
			try {
				const data = JSON.parse(atob(dataFromURL));
				if (data) {
					items.set(data);
				}
			} catch {
				goto('/');
			}
		}
	}

	$inspect($items);

	const [send, receive] = crossfade({ easing: sineIn, fallback: scale });
</script>

<Timetable {send} {receive} />
