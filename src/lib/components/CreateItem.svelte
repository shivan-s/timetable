<script lang="ts">
	import Item from '$lib/items';
	import type { HTMLInputAttributes } from 'svelte/elements';
	import { z } from 'zod';
	import * as m from '$i18n/messages.js';
	import Icon from '$lib/components/Icon.svelte';
	import type { DAY, HOUR } from '$lib/constants';

	interface Props {
		day?: DAY;
		hour?: HOUR;
		popoverId?: HTMLDialogElement['id'];
	}

	const { day, hour, popoverId }: Props = $props();

	const inputProps: HTMLInputAttributes & { name: string; minlength: number; maxlength: number } = {
		id: 'create',
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
			if (day && hour) {
				new Item({ name, time: { day, hour } });
			} else {
				new Item({ name });
			}
			if (popoverId) {
				document.getElementById(popoverId)?.hidePopover();
			}
			event.currentTarget.reset();
		}
	}
</script>

<form onsubmit={handleSubmit}>
	<label for={inputProps.id}>{m.name()}</label>
	<input {...inputProps} />
	<button><Icon icon="create" /></button>
</form>

<style>
	form {
		display: grid;
		grid-template-areas:
			'label label'
			'input button';
		grid-template-rows: auto auto;
		grid-template-columns: 22ch 2rem auto;
		column-gap: var(--gap);

		& > label {
			grid-area: label;
		}
		& > input {
			grid-area: input;
		}
		& > button {
			grid-area: button;
		}
	}
</style>
