import fs from 'fs';
import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import globals from 'rollup-plugin-node-globals';
import builtins from 'rollup-plugin-node-builtins';

const packageJson = JSON.parse(fs.readFileSync('./package.json', 'utf8'));

export default [
  {
    input: 'lib/index.js',
    output: {
      file: 'dist/vfs.js',
      format: 'es',
      name: 'virtualfs'
    },
    plugins: [
      babel({
        babelrc: false,
        exclude: 'node_modules/**',
        runtimeHelpers: true,
        plugins: [
          'transform-object-rest-spread',
          'transform-runtime',
          'transform-class-properties'
        ],
        presets: [
          'flow',
          ['env', {
            modules: false,
            targets: {
              browsers: ['last 2 versions']
            }
          }]
        ]
      }),
      resolve({
        preferBuiltins: true,
        browser: true
      }),
      commonjs(),
      globals(),
      builtins()
    ]
  }
];
