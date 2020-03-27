module.exports = {
  env: {
    test: {
      plugins: ['rewire'],
    },
    lib: {
      presets: [
        [
          '@vue/cli-plugin-babel/preset',
          {
            useBuiltIns: false,
            // modules: false,
          },
        ]
      ],
    },
  },

  presets: [
    [
      '@vue/cli-plugin-babel/preset',
      {
        useBuiltIns: 'usage',
      },
    ]
  ],
  plugins: [
    'macros',
    'babel-plugin-idx',
  ],
  // sourceType: 'unambiguous',
}
