module.exports = {
	env: {
		node: true,
		es2021: true,
	},
	globals: {
		NodeJS: true,
	},
	extends: ['eslint:recommended', 'plugin:prettier/recommended', 'prettier'],
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
	},
};
