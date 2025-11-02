import panda from "@pandacss/eslint-plugin";

import typescriptParser from "@typescript-eslint/parser";
import globals from "globals";

export default [
	{
		ignores: [
			"**/*.d.ts",
			"node_modules/**",
			"dist/**",
			".astro/**",
			".wrangler/**",
			"styled-system/**",
			"server/**",
			"tmp/**",
			"panda.config.ts",
			"commitlint.config.mjs",
			"lefthook.yml",
			"src/content.config.ts",
			"*.yml",
			"*.yaml",
			"*.toml",
			"*.md",
		],
	},

	// 🧠 Shared language settings
	{
		files: ["**/*.{js,jsx,ts,tsx}"],
		languageOptions: {
			parser: typescriptParser,
			parserOptions: {
				ecmaVersion: "latest",
				sourceType: "module",
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
			"@pandacss": panda,
		},
		rules: {
			// ✅ PandaCSS rules
			...panda.configs.recommended.rules,
			// 🛠️ Custom PandaCSS rules
			"@pandacss/no-debug": "error",
			"@pandacss/prefer-shorthand-properties": "warn",
			"@pandacss/no-important": "error",
			"@pandacss/no-dynamic-styling": "off",
			"@pandacss/prefer-unified-property-style": "off",
			"@pandacss/no-unsafe-token-fn-usage": "off",
		},
	},
];
