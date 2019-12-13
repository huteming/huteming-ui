module.exports = {
    root: true,
    env: {
        node: true
    },
    globals: {
        wx: true,
        WeixinJSBridge: true,
    },
    'extends': [
      'plugin:vue/essential',
      '@vue/standard',
      '@vue/typescript'
    ],
    rules: {
        // 'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'indent': ['warn', 2],
        'comma-dangle': ['off', {
            'arrays': 'always-multiline',
            'objects': 'always-multiline',
            'imports': 'never',
            'exports': 'never',
            'functions': 'ignore',
        }]
    },
    parserOptions: {
        parser: '@typescript-eslint/parser'
    },
    overrides: [
        {
            files: [
                '**/__tests__/*.{j,t}s?(x)',
                '**/tests/unit/**/*.spec.{j,t}s?(x)'
            ],
            env: {
                jest: true
            }
        }
    ]
}
