<script lang="ts">
	import type { DAY, HOUR } from '$lib/constants';
	import type { Snippet } from 'svelte';
	import { droppable, handleDrop } from '$lib/dnd';
	import type { HTMLAttributes, HTMLButtonAttributes } from 'svelte/elements';
	import Icon from './Icon.svelte';
	import CreateItem from './CreateItem.svelte';

	interface Props {
		day: DAY;
		hour: HOUR;
		children: Snippet;
	}
	let { day, hour, children }: Props = $props();

	const dialogProps: HTMLAttributes<HTMLDialogElement> = {
		id: `popover-${day}-${hour}`,
		popover: ''
	};

	const buttonProps: HTMLButtonAttributes = {
		class: 'hour',
		popovertargetaction: 'toggle',
		'aria-label': `${day} ${hour}`,
		title: `${day} ${hour}`,
		popovertarget: dialogProps.id
	};
</script>

<button
	{...buttonProps}
	use:droppable={{ container: `${day}-${hour}`, callbacks: { onDrop: handleDrop } }}
>
	<span class="icon">
		{day}
		{hour}
		<Icon icon="create" width="1rem" />
	</span>
	<span class="items">
		{@render children?.()}
	</span>
</button>

<dialog {...dialogProps}>
	<span>{day} {hour}</span>
	<CreateItem {day} {hour} popoverId={dialogProps.id!} />
</dialog>

<style>
	button.hour {
		display: grid;
		grid-template-areas: 'stack';
		border: none;
		background: inherit;
		border-top: lightgray solid 1px;

		& > span {
			grid-area: stack;
			&.icon {
				display: flex;
				flex-wrap: nowrap;
				gap: var(--gap);
				transition: all 0.3s ease-in-out;
				transition-behavior: allow-discrete;
				visibility: hidden;
				opacity: 0;
				align-self: end;
				justify-self: end;
			}
			&.items {
				display: flex;
				align-items: center;
				overflow-x: scroll;
			}
		}

		&:hover > span.icon {
			visibility: visible;
			opacity: 1;
		}
	}

	dialog {
		&:popover-open {
			display: flex;
			flex-direction: column;

			&::backdrop {
				filter: blur(1px);
			}
		}
	}
</style>
