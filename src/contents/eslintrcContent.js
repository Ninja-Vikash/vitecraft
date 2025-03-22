export function eslintrcContent(hasFramework, hasTypeScript) {
    return `export default {
  'env': {
    'browser': true,
    'es2021': true,
    'node': true
  },
  'extends': [
    'eslint:recommended',
    ${hasFramework ? "'plugin:react/recommended'," : ""}
    ${hasTypeScript ? "'plugin:@typescript-eslint/recommended'" : ""}
  ],
  'parserOptions': {
    'ecmaVersion': 'latest',
    'sourceType': 'module'
  },
  'rules': {
    'indent': ['error', 2],
    'linebreak-style': ['error', 'unix'],
    'quotes': ['error', 'single'],
    'semi': ['error', 'always']
  }
};`;
}
