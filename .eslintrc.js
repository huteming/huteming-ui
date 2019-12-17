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
        'indent': ['error', 2],
        'comma-dangle': ['error', {
            'arrays': 'always-multiline',
            'objects': 'always-multiline',
            'imports': 'always-multiline',
            'exports': 'always-multiline',
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
