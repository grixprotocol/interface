const excludeFolders = ['node_modules', 'build', 'dist', ''];
const excludedFiles = `**/(${excludeFolders.join('|')})/**`;

module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  parserOptions: {
    project: ['tsconfig.json'],
  },
  root: true,
  ignorePatterns: excludeFolders.map((folder) => `**/${folder}/**`),
  extends: [
    'eslint:recommended',
    'plugin:import/recommended',
    'plugin:json/recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'prettier',
  ],
  rules: {
    '@typescript-eslint/no-misused-promises': 'off',
    'object-shorthand': 'error',
    'simple-import-sort/imports': 'error',
    'simple-import-sort/exports': 'error',
    'import/no-cycle': [
      2,
      {
        ignoreExternal: false,
        maxDepth: 3,
      },
    ],
    'import/no-absolute-path': 'error',
    'import/no-dynamic-require': 'error',
    'import/no-self-import': 'error',
    'import/no-useless-path-segments': 'error',
    'import/no-named-as-default': 'error',
    'import/no-named-as-default-member': 'error',
    'import/no-deprecated': 'off',
    'import/no-default-export': 'error',
    'react/prop-types': 'off',
    'react/react-in-jsx-scope': 'off',
    'react/jsx-curly-brace-presence': ['error', 'never'],
    'react/display-name': 'off',
    'one-var': ['error', 'never'],
    'no-console': 'error',
    'no-alert': 'error',
    'arrow-body-style': 'error',
    'object-curly-newline': [
      'error',
      {
        ObjectExpression: {
          multiline: true,
          consistent: true,
        },
        ObjectPattern: {
          multiline: true,
          consistent: true,
        },
        ImportDeclaration: {
          multiline: true,
          consistent: true,
        },
        ExportDeclaration: {
          multiline: true,
          consistent: true,
        },
      },
    ],
    'max-len': [
      'error',
      {
        code: 120,
        ignoreUrls: true,
        ignoreStrings: true,
        ignoreRegExpLiterals: true,
        ignoreComments: true,
        ignoreTemplateLiterals: true,
      },
    ],
    'max-lines': 'error',
    radix: 'error',
    'react-hooks/exhaustive-deps': 'error',
    'react/jsx-boolean-value': 'error',
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        vars: 'all',
        args: 'after-used',
        ignoreRestSiblings: true,
        varsIgnorePattern: '^_',
        argsIgnorePattern: '^_'
      }
    ],
  },
  overrides: [
    {
      files: ['**/*.spec.*'],
      plugins: ['jest', 'jest-dom', 'no-only-tests'],
      extends: ['plugin:jest/recommended', 'plugin:jest/style', 'plugin:jest-dom/recommended'],
      rules: {
        'jest/consistent-test-it': [
          'error',
          {
            fn: 'it',
          },
        ],
        'jest/no-focused-tests': 'off',
        'jest/no-disabled-tests': 'off',
        'jest/expect-expect': 'off',
        'no-only-tests/no-only-tests': [
          'error',
          {
            block: ['it', 'specify', 'describe'],
            focus: ['only', 'skip'],
          },
        ],
      },
      excludedFiles,
      env: {
        jest: true,
      },
    },
    {
      files: ['**/*.ts', '**/*.tsx'],
      excludedFiles,
      parser: '@typescript-eslint/parser',
      plugins: ['@typescript-eslint', 'simple-import-sort'],
      extends: [
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/recommended-requiring-type-checking',
        'plugin:import/typescript',
      ],
      rules: {
        '@typescript-eslint/no-redundant-type-constituents': 'off',
        '@typescript-eslint/naming-convention': [
          'error',
          {
            selector: 'typeLike',
            format: ['PascalCase'],
          },
        ],
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        '@typescript-eslint/no-explicit-any': 'error',
        '@typescript-eslint/prefer-optional-chain': 'error',
        '@typescript-eslint/consistent-type-definitions': ['error', 'type'],
        '@typescript-eslint/no-non-null-assertion': 'error',
      },
    },
  ],
  settings: {
    react: {
      version: 'detect',
    },
    'import/resolver': {
      typescript: {},
    },
  },
};
