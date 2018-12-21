#!/usr/bin/env node

const fs = require('fs')
const path = require('path')

const binDir = require.resolve('./card.js')
const datFile = path.resolve(path.dirname(binDir), 'card.dat')

fs.readFile(datFile, (error, buffer) => {
  if (error) {
    console.error(`Error reading card data: ${error}`)
    process.exit(1)
  } else {
    console.info(buffer.toString())
  }
})
