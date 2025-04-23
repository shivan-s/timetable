<script lang="ts">
	import type { HTMLInputAttributes } from 'svelte/elements';
	import { createItem } from '$lib/items';
	import { z } from 'zod';

	const inputProps: HTMLInputAttributes & { name: string; minlength: number; maxlength: number } = {
		type: 'text',
		autocomplete: 'off',
		name: 'name',
		required: true,
		minlength: 1,
		maxlength: 20
	};

	function handleSubmit(event: SubmitEvent & { currentTarget: EventTarget & HTMLFormElement }) {
		event.preventDefault();
		const formData = new FormData(event.currentTarget);
		const result = z
			.string()
			.trim()
			.min(inputProps.minlength)
			.max(inputProps.maxlength)
			.safeParse(formData.get(inputProps.name));
		if (result.success) {
			const name = result.data;
			createItem({ name });
			event.currentTarget.reset();
		}
	}
</script>

<form onsubmit={handleSubmit}>
	<input {...inputProps} /><button>Create</button>
</form>
