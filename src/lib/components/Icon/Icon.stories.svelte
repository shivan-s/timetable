<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';

	import Icon from './Icon.svelte';

	const { Story } = defineMeta({
		component: Icon
	});
</script>

<Story
	name="Icon"
	args={{
		width: '3rem',
		height: '3rem',
		icon: 'create'
	}}
/>
