module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true
    },
    project: './tsconfig.json',
    allowImportExportEverywhere: true
  },
  plugins: ['import', 'promise', 'compat', 'react', '@typescript-eslint'],
  extends: [
    'airbnb',
    'prettier',
    'prettier/react',
    'eslint:recommended',
    'prettier/@typescript-eslint',
    'plugin:@typescript-eslint/recommended'
  ],
  env: {
    browser: true,
    node: true
  },
  rules: {
    'no-unused-expressions': [
      'error',
      {
        allowShortCircuit: true,
        allowTernary: true
      }
    ],
    'no-bitwise': [
      2,
      {
        int32Hint: true,
        allow: ['~']
      }
    ],
    'linebreak-style': 0,
    'arrow-parens': ['off'],
    'compat/compat': 'error',
    'consistent-return': 'off',
    'comma-dangle': 'off',
    'generator-star-spacing': 'off',
    'import/no-unresolved': 'error',
    'import/no-extraneous-dependencies': 'off',
    'jsx-a11y/anchor-is-valid': 'off',
    'no-console': 'off',
    'no-use-before-define': 'off',
    'no-multi-assign': 'off',
    'promise/param-names': 'error',
    'promise/always-return': 'error',
    'promise/catch-or-return': 'error',
    'promise/no-native': 'off',
    'no-script-url': 'off',
    'no-var-requires': false,
    'react/sort-comp': [
      'error',
      {
        order: [
          'type-annotations',
          'static-methods',
          'lifecycle',
          'everything-else',
          'render'
        ]
      }
    ],
    'react/jsx-no-bind': 'off',
    'react/jsx-filename-extension': [
      'error',
      {
        extensions: ['.js', '.jsx', '.tsx', '.ts']
      }
    ],
    'react/prefer-stateless-function': 'off',
    'jsx-a11y/no-static-element-interactions': [0],
    'jsx-a11y/click-events-have-key-events': [0],
    '@typescript-eslint/indent': ['error', 2],
    '@typescript-eslint/explicit-member-accessibility': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    'class-methods-use-this': ['error', { exceptMethods: ['render'] }],
    'import/prefer-default-export': 'off',
    'react/prop-types': 'off',
    'no-else-return': 'off',
    'jsx-quotes': ['error', 'prefer-double']
  },
  settings: {
    'import/resolver': {
      webpack: {
        config: 'webpack.config.eslint.js'
      }
    }
  }
};
