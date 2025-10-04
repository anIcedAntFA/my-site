import { defineConfig } from 'cz-git';

const types = [
	'init',
	'feat',
	'fix',
	'hotfix',
	'docs',
	'style',
	'refactor',
	'perf',
	'test',
	'update-deps',
	'configs',
	'chore',
	'breaking',
	'deploy',
];

export default defineConfig({
	extends: ['gitmoji'],
	rules: {
		'header-case': [2, 'always', 'lower-case'],
		'type-empty': [2, 'never'],
		'type-case': [2, 'always', 'lower-case'],
		'type-enum': [2, 'always', types],
		'subject-min-length': [2, 'always', 2],
		'subject-empty': [2, 'never'],
	},
	prompt: {
		alias: {
			b: 'chore: bump dependencies',
			c: 'chore: update config files',
			f: 'docs: fix typos',
			':': 'docs: update README',
		},
		themeColorCode: '38;5;046',
		types: [
			{
				value: 'init',
				name: 'init:            🎉  Begin a project.',
				emoji: ':tada:',
			},
			{
				value: 'feat',
				name: 'feat:            ✨  A new feature',
				emoji: ':sparkles:',
			},
			{
				value: 'fix',
				name: 'fix:             🐛  A bug fix',
				emoji: ':bug:',
			},
			{
				value: 'hotfix',
				name: 'hotfix:          🚑️  Critical hotfix.',
				emoji: ':bug:',
			},
			{
				value: 'docs',
				name: 'docs:            📝  Documentation only changes',
				emoji: ':memo:',
			},
			{
				value: 'style',
				name: 'style:           💄  Changes that do not affect the meaning of the code',
				emoji: ':lipstick:',
			},
			{
				value: 'refactor',
				name: 'refactor:        ♻️   A code change that neither fixes a bug nor adds a feature',
				emoji: ':recycle:',
			},
			{
				value: 'perf',
				name: 'perf:            ⚡️  A code change that improves performance',
				emoji: ':mag:',
			},
			{
				value: 'test',
				name: 'test:            ✅  Adding missing tests or correcting existing tests',
				emoji: ':white_check_mark:',
			},
			{
				value: 'update-deps',
				name: 'update-deps:     ⬆️  Upgrade dependencies.',
				emoji: ':arrow_up:',
			},
			{
				value: 'configs',
				name: 'configs:         🔧  Add or update configuration files.',
				emoji: ':wrench:',
			},
			{
				value: 'chore',
				name: "chore:           🔨  Other changes that don't modify src or test files",
				emoji: ':hammer:',
			},
			{
				value: 'breaking',
				name: 'breaking-change: 💥  Introduce breaking changes.',
				emoji: ':boom:',
			},
			{
				value: 'deploy',
				name: 'deploy:          🚀  Deploy stuff.',
				emoji: ':rocket:',
			},
		],
		useEmoji: true,
		emojiAlign: 'left',
	},
});
