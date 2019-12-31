const plugins = [
  'macros',
  'babel-plugin-idx',
]
const isProduction = process.env.NODE_ENV === 'production'
const isDocs = process.env.BUILD_TYPE === 'docs'

// if (process.env.NODE_ENV === 'test') {
//   plugins.push('rewire')
// }

module.exports = {
  env: {
    test: {
      plugins: ['rewire'],
    },
  },
  presets: [
    [
      '@vue/cli-plugin-babel/preset',
      {
        useBuiltIns: isProduction && !isDocs ? false : 'usage',
      },
    ]
  ],
  plugins,
  // sourceType: 'unambiguous',
}
