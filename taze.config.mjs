import { defineConfig } from 'taze';

export default defineConfig({
	// ignore packages from bumping
	exclude: ['webpack'],
	// fetch latest package info from registry without cache
	force: true,
	// write to package.json (set true for CI workflow when you want to commit)
	write: false,
	// run install after bumping
	install: false,

	// monorepo: ignore patterns
	ignorePaths: ['**/node_modules/**', '**/test/**'],

	// override bump mode per package
	packageMode: {
		typescript: 'major',
		astro: 'major',
	},

	// whether to update peerDependencies by default
	depFields: { overrides: false },
});
