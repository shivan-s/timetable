<script lang="ts">
	import Icon from '$lib/components/Icon';
	import shivanLogo from '$lib/assets/img/Shivan-Logo-Black.png';
	const LOVE = '💓';
	const githubLink = 'https://github.com/shivan-s/timetable';
</script>

<nav>
	<span>
		<span>Made with <abbr title="LOVE">{LOVE}</abbr> by</span>
		<a rel="external" target="_blank" href="https://shivan.xyz"
			><img alt="Shivan" title="Shivan" src={shivanLogo} style="width: 2rem; height: 2rem" /></a
		>
	</span>
	<a rel="external" target="_blank" title="Source code on GitHub" href={githubLink}>
		<Icon icon="github" width="2rem" height="2rem" />
		<span>Code</span>
	</a>
</nav>

<style>
	nav {
		display: flex;
		justify-content: space-around;
		align-items: center;
		text-align: center;
		height: 100%;
	}

	nav > * {
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}
</style>
