import App from './App.svelte';

const app = new App({
	target: document.body,
	props: {
		strapiApiUrl: 'https://quickstagram-backend.herokuapp.com'
	}
});

export default app;