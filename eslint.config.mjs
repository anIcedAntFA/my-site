import js from '@eslint/js';
import panda from '@pandacss/eslint-plugin';
import typescriptPlugin from '@typescript-eslint/eslint-plugin';
import typescriptParser from '@typescript-eslint/parser';
import astroPlugin from 'eslint-plugin-astro';
import importPlugin from 'eslint-plugin-import';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import { qwikEslint9Plugin } from 'eslint-plugin-qwik';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import globals from 'globals';

export default [
	{
		ignores: [
			'**/*.d.ts',
			'node_modules/**',
			'dist/**',
			'.astro/**',
			'.wrangler/**',
			'styled-system/**',
			'server/**',
			'tmp/**',
			'panda.config.ts',
			'commitlint.config.mjs',
			'lefthook.yml',
			'*.yml',
			'*.yaml',
			'*.toml',
			'*.md',
		],
	},

	// Base JS config (optional)
	js.configs.recommended,

	// ✅ Astro rules
	...astroPlugin.configs.recommended,

	// 🧠 Shared language settings
	{
		files: ['**/*.{js,jsx,ts,tsx}'],
		languageOptions: {
			parser: typescriptParser,
			parserOptions: {
				ecmaVersion: 'latest',
				sourceType: 'module',
				ecmaFeatures: {
					jsx: true,
				},
				projectService: true, // enable for @typescript-eslint
				tsconfigRootDir: import.meta.dirname,
			},
			globals: {
				...globals.browser,
				...globals.node,
				...globals.serviceworker,
			},
		},
		plugins: {
			'@typescript-eslint': typescriptPlugin,
			'jsx-a11y': jsxA11y,
			'simple-import-sort': simpleImportSort,
			import: importPlugin,
			'@pandacss': panda,
			qwik: qwikEslint9Plugin,
		},
		rules: {
			// ✅ TypeScript rules
			...typescriptPlugin.configs.recommended.rules,
			...typescriptPlugin.configs['recommended-type-checked']?.rules,

			// ✅ JSX A11Y rules
			...jsxA11y.configs.recommended.rules,

			// ✅ Qwik rules (recommended)
			...qwikEslint9Plugin.configs.recommended.rules,

			// ✅ PandaCSS rules
			...panda.configs.recommended.rules,

			'@typescript-eslint/unbound-method': 'off',

			// 🛠️ Custom import sorting and export rules
			'simple-import-sort/imports': [
				'error',
				{
					groups: [
						// 0) Side effect imports (import 'x';)
						['^\\u0000'],

						// 1) Very specific core external packages that should appear first
						// @builder.io should always appear on top among externals
						['^@builder\\.io(/.*|$)'],

						// 2) Other external packages (normal node_modules, not starting with @ or .)
						['^[^@./]'],

						// 3) Scoped external packages (other @scoped packages not listed above)
						['^@[^/]+(/.*|$)'],

						// 4) Styled-system explicitly as its own group (so it appears after externals)
						['^@styled-system(/.*|$)'],

						// 5) Node / Bun builtins (put after externals per your requested order)
						// Common node builtins listed; adjust if you use others
						[
							'^(node:|fs$|path$|os$|http$|https$|url$|stream$|crypto$|util$|events$|assert$|buffer$|child_process$)',
						],

						// 6) Internal aliases (your app code like @/..., treat as internal)
						[
							'^@/ui(/.*|$)',
							'^@/pages(/.*|$)',
							'^@/layout(/.*|$)',
							'^@/lib(/.*|$)',
							'^@/',
						],

						// 7) Parent imports (..)
						['^\\.\\./'],

						// 8) Sibling imports (./)
						['^\\./'],

						// 9) Style imports (css, scss, etc.)
						['\\.s?css$'],
					],
				},
			],
			// also sort exports (optional but recommended)
			'simple-import-sort/exports': 'error',

			// ✅ Import plugin rules (less strict for certain files)
			'import/no-unresolved': 'off', // TypeScript handles this
			'import/order': 'off', // Use simple-import-sort instead

			'no-restricted-syntax': [
				'error',
				{
					selector: 'ExportAllDeclaration',
					message:
						"Avoid 'export * from \"module\"'. Re-export named exports explicitly: export { foo } from 'module'.",
				},
				{
					selector: 'ExportDefaultDeclaration',
					message:
						'Default exports are disallowed. Use named exports instead: export const foo = ...; export { foo };',
				},
			],

			// 🛠️ Custom PandaCSS rules
			'@pandacss/no-debug': 'error',
			'@pandacss/prefer-shorthand-properties': 'warn',
			'@pandacss/no-important': 'error',
			'@pandacss/no-dynamic-styling': 'off',
			'@pandacss/prefer-unified-property-style': 'off',
			'@pandacss/no-unsafe-token-fn-usage': 'off',

			// 🛠️ Qwik optional tweaks (if needed)
			// 'qwik/no-use-visible-task': 'off',
		},
	},

	// ✅ Special rules for specific file types
	{
		files: ['**/*.astro'],
		rules: {
			// Allow default exports in Astro files
			'import/no-default-export': 'off',
		},
	},

	// ✅ PandaCSS theme folder exceptions
	{
		files: ['src/theme/**/*.{js,ts,jsx,tsx}'],
		rules: {
			// Allow Panda config functions in theme folder
			'@pandacss/no-config-function-in-source': 'off',
			// Allow any types in theme definitions (Panda utilities often use generic types)
			'@typescript-eslint/no-unsafe-assignment': 'off',
			'@typescript-eslint/no-explicit-any': 'off',
		},
	},

	// ✅ Config files exceptions
	{
		files: [
			'*.config.*',
			'**/*.config.*',
			'astro.config.*',
			'panda.config.*',
			'wrangler.config.*',
			'lefthook.yml',
		],
		rules: {
			'import/no-default-export': 'off',
		},
	},
];
