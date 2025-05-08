<script lang="ts">
	import { SEED } from '$lib/constants';
	import type { HTMLInputAttributes } from 'svelte/elements';
	type Props = HTMLInputAttributes;
	let { ...restProps }: Props = $props();
</script>

<input style="--hue: {SEED}" {...restProps} />

<style>
	input {
		border: solid 2px hsla(var(--hue), 7%, 10%, 1);
		background-color: hsla(var(--hue), 25%, 95%, 1);
		padding: 0.25rem 0.5rem;
		transition: all 0.3s ease-in-out;
		&:focus {
			outline-offset: 2px;
			outline: 2px hsla(var(--hue), 7%, 10%, 1) solid;
		}
	}
</style>
