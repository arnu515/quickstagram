import App from './App.svelte';

const app = new App({
	target: document.body,
	props: {
		strapiApiUrl: 'http://localhost:1337'
	}
});

export default app;