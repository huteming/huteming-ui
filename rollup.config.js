import path from 'path'
import alias from 'rollup-plugin-alias'
import cjs from 'rollup-plugin-commonjs'
import node from 'rollup-plugin-node-resolve'
import typescript from 'rollup-plugin-typescript'
import babel from 'rollup-plugin-babel'
import vuePlugin from 'rollup-plugin-vue'
import visualizer from 'rollup-plugin-visualizer'

const resolve = p => path.resolve(__dirname, './', p)

// --name ${moduleName} --dest packages/ui/lib/${moduleName} packages/ui-${moduleName}/src/main.ts

export default {
  input: resolve(`packages/ui-`),
  output: {
    file: './rollupDist/bundle.js',
    format: 'cjs',
  },
  plugins: [
    alias({
      '@': resolve('src'),
      'src': resolve('src'),
      // 组件共用模块
      'decorators': resolve('packages/ui/src/decorators'),
      'mixins': resolve('packages/ui/src/mixins'),
      'utils': resolve('packages/ui/src/utils'),
      // 常用目录
      'packages': resolve('./packages'),
      'tests': resolve('./tests'),
    }),
    cjs({
      namedExports: {
        'vue-tsx-support': [ 'ofType' ]
      }
    }),
    typescript(),
    vuePlugin(),
    babel({
      runtimeHelpers: true,
      // https://github.com/rollup/rollup-plugin-babel/issues/260
      extensions: [ '.js', '.ts', '.tsx', '.jsx', '.es6', '.es', '.mjs', '.vue' ],
      exclude: 'node_modules/**',
    }),
    node(),
    visualizer({
      filename: './rollupDist/stat.html',
    }),
  ],
  external: [
    'vue',
    'qs',
  ],
}
