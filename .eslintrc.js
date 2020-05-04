module.exports = {
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaVersion: 2020, // Allows for the parsing of modern ECMAScript features
		sourceType: "module", // Allows for the use of imports
		ecmaFeatures: {
			jsx: true // Allows for the parsing of JSX
		}
	},
	settings: {
		react: {
			version: "detect" // Tells eslint-plugin-react to automatically detect the version of React to use
		}
	},
	extends: [
		"plugin:react/recommended", // Uses the recommended rules from @eslint-plugin-react
		"plugin:@typescript-eslint/recommended", // Uses the recommended rules from the @typescript-eslint/eslint-plugin
	],
	rules: {
		"@typescript-eslint/explicit-function-return-type": "off",
		"@typescript-eslint/semi": 2,
		"@typescript-eslint/interface-name-prefix": "off",
		"@typescript-eslint/no-unused-vars": 2,
		"@typescript-eslint/camelcase": "off",
		"@typescript-eslint/no-explicit-any": "off",
		"react/prop-types": "off"
	}
};
