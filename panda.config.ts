import { defineConfig } from '@pandacss/dev';
import { breakpoints } from './src/theme/breakpoints';
import { conditions } from './src/theme/conditions';
import { globalCSS } from './src/theme/global-css';
import { globalVariables } from './src/theme/global-variables';
import { keyframes } from './src/theme/keyframes';
import { recipes } from './src/theme/recipes';
import { semanticTokens } from './src/theme/semantic-tokens';
import { slotRecipes } from './src/theme/slot-recipes';
import { textStyles } from './src/theme/text-styles';
import { tokens } from './src/theme/tokens';
import { borderColor } from './src/theme/utilities';

export default defineConfig({
	//==== Output css options ====

	// The set of reusable and shareable configuration presets.
	presets: ['@pandacss/preset-panda'],

	// Whether to enable css reset styles.
	preflight: true,

	// The namespace prefix for the generated css classes and css variables.
	prefix: 'mk',

	// The separator for the generated css classes.
	separator: '_',

	// Whether to minify the generated css. This can be set
	// to `true` to reduce the size of the generated css.
	minify: true,

	// Whether to hash the generated class names / css variables.
	// This is useful if want to shorten the class names or css variables.
	// hash: process.env.NODE_ENV === 'production' ? true : false,

	//==== File system options ====
	// Whether to update the .gitignore file.
	gitignore: true,

	// The current working directory.
	cwd: process.cwd(),

	// Whether to clean the output directory before generating the css.
	clean: true,

	// The output directory for the generated css.
	outdir: 'styled-system',

	// Allows you to customize the import paths for the generated outdir.
	// importMap: {
	// 	css: '@nk96/styled-system',
	// 	recipes: '@nk96/styled-system',
	// 	patterns: '@nk96/styled-system',
	// 	jsx: '@nk96/styled-system',
	// },

	// List of files glob to watch for changes.
	include: [
		'./src/**/*.{js,jsx,ts,tsx,mdx,astro}',
		'./pages/**/*.{js,jsx,ts,tsx,mdx,astro}',
	],

	// List of files glob to ignore.
	exclude: [],

	// Whether to watch for changes and regenerate the css.
	watch: true,

	// File extension for generated javascript files.
	outExtension: 'mjs',

	// Decides which syntax to use when writing CSS.
	syntax: 'object-literal',

	// // Whether to use lightningcss instead of postcss for css optimization.
	// lightningcss: true,

	// // Browserslist query to target specific browsers.
	// // Only used when lightningcss is set to `true`.
	// browserslist: ['last 2 versions', 'not dead', 'not < 2%'],

	//==== Design token options ====

	// Whether to allow shorthand properties
	shorthands: true,

	// The root selector for the css variables.
	cssVarRoot: ':where(:host, :root)',

	// The css selectors or media queries shortcuts.
	conditions: {
		extend: conditions,
	},

	// The css variables for your project.
	globalVars: globalVariables,

	// The global styles for your project.
	globalCss: globalCSS,

	// Useful for theme customization
	theme: {
		extend: {
			tokens,
			semanticTokens,
			textStyles,
			keyframes,
			recipes,
			slotRecipes,
			breakpoints,
		},
	},

	// The css utility definitions.
	utilities: {
		extend: {
			borderColor,
		},
	},

	// ==== JSX options ====
	// JS Framework for generated JSX elements.
	jsxFramework: 'qwik',

	// The factory name of the element
	jsxFactory: 'styled',

	// The style props allowed on generated JSX components
	jsxStyleProps: 'all',
});
