import { publishDir } from 'quickexport'

publishDir({

  projectRoot: import.meta.dirname,

  srcDir: 'src',

  dev: process.argv[2] === 'dev' && {
    port: 8181,
    generateFiles: true,
  },

  importMap: {
    'react/jsx-runtime': '/_jsx.js'
  }

})
