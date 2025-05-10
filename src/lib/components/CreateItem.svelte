<script lang="ts">
	import Item from '$lib/items';
	import type { HTMLButtonAttributes, HTMLInputAttributes } from 'svelte/elements';
	import { z } from 'zod';
	import * as m from '$i18n/messages.js';
	import { SEED, type DAY, type HOUR } from '$lib/constants';
	import Input from '$lib/components/Input.svelte';
	import Button from '$lib/components/Button.svelte';
	import type { HTMLAttributes } from 'svelte/elements';
	import Icon from '$lib/components/Icon.svelte';

	interface Props {
		day?: DAY;
		hour?: HOUR;
		popoverId: HTMLButtonAttributes['popovertarget'];
	}

	const { day, hour, popoverId }: Props = $props();

	const inputProps: HTMLInputAttributes & { name: string; minlength: number; maxlength: number } = {
		id: `create-${day}-${hour}`,
		type: 'text',
		autofocus: true,
		autocomplete: 'off',
		name: 'name',
		required: true,
		minlength: 1,
		maxlength: 20
	};

	const dialogProps: HTMLAttributes<HTMLDialogElement> & { id: string } = {
		id: popoverId!,
		popover: ''
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
			document.getElementById(dialogProps.id)?.hidePopover();
			event.currentTarget.reset();
		}
	}
</script>

<dialog style="--hue: {SEED}" {...dialogProps}>
	<header>
		<h2 class="time">
			{day}
			{hour}
		</h2>
		<Button
			aria-label={m.close()}
			title={m.close()}
			popovertarget={dialogProps.id}
			popovertargetaction="hide">&#x2715</Button
		>
	</header>
	<form onsubmit={handleSubmit}>
		<label for={inputProps.id}>{m.name()}</label>
		<span class="input">
			<Input {...inputProps} />
		</span>
		<span class="button">
			<Button><Icon icon="create" /></Button>
		</span>
	</form>
</dialog>

<style>
	dialog {
		border: solid 2px hsla(var(--hue), 7%, 10%, 1);
		background-color: hsla(var(--hue), 25%, 95%, 1);
		color: hsla(var(--hue), 7%, 10%, 1);
		padding: var(--padding);
		box-shadow: 0.5rem 0.5rem 0 hsla(0, 100%, 0%, 0.7);
		transition:
			display 0.5s ease-in-out allow-discrete,
			opacity 0.5s ease-in-out allow-discrete;
		opacity: 0;

		& header {
			display: flex;
			flex-wrap: nowrap;
			align-items: center;
			justify-content: space-between;
			& h2 {
				line-height: 1;
				font-size: 1rem;
				margin: 0;
				padding: 0;
			}
		}
		& form {
			display: grid;
			grid-template-areas: 'label input button';
			grid-template-rows: auto;
			grid-template-columns: auto auto auto;
			gap: var(--gap);
			justify-content: center;
			align-items: center;

			& > label {
				grid-area: label;
			}
			& > .input {
				grid-area: input;
			}
			& > .button {
				min-width: 2rem;
				grid-area: button;
			}
		}
		&:popover-open {
			display: flex;
			flex-direction: column;
			gap: 1rem;
			opacity: 1;

			@starting-style {
				opacity: 0;
			}
		}
		&::backdrop {
			backdrop-filter: blur(5px);
			opacity: 1;
		}
	}
</style>
