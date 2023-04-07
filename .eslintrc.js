module.exports = {
	env: {
		node: true,
		es2021: true,
	},
	globals: {
		NodeJS: true,
	},
	extends: ['eslint:recommended', 'plugin:prettier/recommended', 'prettier'],
	parserOptions: {
		ecmaVersion: 'latest',
		sourceType: 'module',
	},
	plugins: ['prettier'],
	rules: {
		'no-debugger': 'warn',
		'quotes': ['error', 'single'],
	},
};
