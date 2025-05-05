<script lang="ts">
	import type { HTMLInputAttributes } from 'svelte/elements';
	type Props = HTMLInputAttributes;
	let { ...restProps }: Props = $props();
</script>

<input {...restProps} />

<style>
	input {
		border: 2px solid var(--c-primary);
		background-color: var(--c-background);
		padding: 0.25rem 0.5rem;
		transition: all 0.3s ease-in-out;
		&:focus {
			outline-offset: 2px;
			outline: 2px var(--c-primary) solid;
		}
	}
</style>
