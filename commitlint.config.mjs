import { defineConfig } from 'cz-git';

const types = [
	'🎉 init',
	'✨ feat',
	'🐛 fix',
	'🚑️ hotfix',
	'📝 docs',
	'💄 style',
	'♻️ refactor',
	'⚡️ perf',
	'✅ test',
	'⬆️ update-deps',
	'🔧 configs',
	'🔨 chore',
	'💥 breaking',
	'🚀 deploy',
];

export default defineConfig({
	parserPreset: {
		parserOpts: {
			headerPattern: /^(?<type>.+?)(?:\((?<scope>.*)\))?!?:\s(?<subject>.+)$/,
			headerCorrespondence: ['type', 'scope', 'subject'],
		},
	},
	rules: {
		'body-leading-blank': [1, 'always'],
		'body-max-line-length': [2, 'always', 100],
		'footer-leading-blank': [1, 'always'],
		'footer-max-line-length': [2, 'always', 100],
		'header-max-length': [2, 'always', 100],
		'header-trim': [2, 'always'],
		'subject-case': [
			2,
			'never',
			['sentence-case', 'start-case', 'pascal-case', 'upper-case'],
		],
		'subject-empty': [2, 'never'],
		'subject-full-stop': [2, 'never', '.'],
		'type-case': [2, 'always', 'lower-case'],
		'type-empty': [2, 'never'],
		'type-enum': [2, 'always', types],
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
				emoji: '🎉',
			},
			{
				value: 'feat',
				name: 'feat:            ✨  A new feature',
				emoji: '✨',
			},
			{
				value: 'fix',
				name: 'fix:             🐛  A bug fix',
				emoji: '🐛',
			},
			{
				value: 'hotfix',
				name: 'hotfix:          🚑️  Critical hotfix.',
				emoji: '🚑️',
			},
			{
				value: 'docs',
				name: 'docs:            📝  Documentation only changes',
				emoji: '📝',
			},
			{
				value: 'style',
				name: 'style:           💄  Changes that do not affect the meaning of the code',
				emoji: '💄',
			},
			{
				value: 'refactor',
				name: 'refactor:        ♻️   A code change that neither fixes a bug nor adds a feature',
				emoji: '♻️',
			},
			{
				value: 'perf',
				name: 'perf:            ⚡️  A code change that improves performance',
				emoji: '⚡️',
			},
			{
				value: 'test',
				name: 'test:            ✅  Adding missing tests or correcting existing tests',
				emoji: '✅',
			},
			{
				value: 'update-deps',
				name: 'update-deps:     ⬆️  Upgrade dependencies.',
				emoji: '⬆️',
			},
			{
				value: 'configs',
				name: 'configs:         🔧  Add or update configuration files.',
				emoji: '🔧',
			},
			{
				value: 'chore',
				name: "chore:           🔨  Other changes that don't modify src or test files",
				emoji: '🔨',
			},
			{
				value: 'breaking',
				name: 'breaking-change: 💥  Introduce breaking changes.',
				emoji: '💥',
			},
			{
				value: 'deploy',
				name: 'deploy:          🚀  Deploy stuff.',
				emoji: '🚀',
			},
		],
		useEmoji: true,
		emojiAlign: 'left',
	},
});
