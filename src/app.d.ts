// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces

interface User {
	id: string;
	email: string;
}

interface Session {
	session: object;
	user: User;
}
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			session: Session['session'];
			user: User;
		}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};
