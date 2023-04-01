module.exports = {
	env: {
		node: true,
		es2021: true,
	},
	globals: {
		NodeJS: true,
	},
	extends: [
		'eslint:recommended',
		'plugin:prettier/recommended',
		'prettier',
		'plugin:import/recommended',
	],
	settings: {
		'import/extensions': ['.js'],
	},
	parserOptions: {
		ecmaVersion: 'latest',
		sourceType: 'module',
	},
	plugins: ['prettier', 'import', 'simple-import-sort'],
	rules: {
		'import/no-named-as-default': 'off',
		'no-debugger': 'warn',
		'quotes': ['error', 'single'],
		'simple-import-sort/imports': [
			'error',
			{
				groups: [
					//Absolute imports (path from 'path')
					['^\\w+$'],
					// Packages. react related packages come first.
					['^@?\\w'],
					// Internal packages.
					['(components|modules|widgets|utils)(/.*|$)'],
					// Side effect imports.
					['^\\u0000'],
					// Parent imports. Put .. last.
					['^\\.\\.(?!/?$)', '^\\.\\./?$', '^\\.(?!/?$)'],
					// Assets
					['^shared\\/assets.+'],
				],
			},
		],
		'import/first': 'warn',
		'import/newline-after-import': 'warn',
		'import/no-duplicates': 'warn',
	},
};
