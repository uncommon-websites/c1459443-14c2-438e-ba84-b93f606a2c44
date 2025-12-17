// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

// Type declarations for unplugin-icons
declare module '~icons/*' {
	import { SvelteComponent } from 'svelte';
	export default class extends SvelteComponent<{
		class?: string;
	}> {}
}

export {};
