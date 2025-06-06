<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';

	import Button from './Button.svelte';

	const { Story } = defineMeta({
		component: Button
	});
</script>

{#snippet normal()}
	Normal
{/snippet}

{#snippet long()}
	Really Long long long
{/snippet}

<Story
	name="Button"
	args={{
		hue: 1,
		children: normal
	}}
/>

<Story
	name="Button Long Content"
	args={{
		hue: 90,
		children: long
	}}
/>
