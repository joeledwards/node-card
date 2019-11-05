const c = require('@buzuli/color')
const fs = require('fs')
const path = require('path')
const boxen = require('boxen')

const boxOptions = {
  padding: 1,
  margin: 1,
  bordStyle: 'round'
}

const card = color => {
  const spacer = { label: '', value: '' }
  const red = t => color ? c.red(t) : t
  const blue = t => color ? c.blue(t) : t
  const grey = t => color ? c.grey(t) : t
  const white = t => color ? c.white(t) : t
  const orange = t => color ? c.orange(t) : t
  const boldWhite = t => color ? c.white.bold(t) : t

  const data = {
    name: {
      label: '',
      value: grey(`${boldWhite('Joel Edwards')} | ${orange('@buzuli')}`)
    },
    work: {
      label: '',
      value: white(`Sr Systems Engineer @ ${blue('Simon Data')}`)
    },
    npm: {
      label: 'npm 📦',
      value: blue(`https://npmjs.com/~${orange('buzuli')}`)
    },
    github: {
      label: 'Github 🐙',
      value: blue(`https://github.com/${orange('joeledwards')}`)
    },
    twitter: {
      label: 'Twitter 🐦',
      value: blue(`https://twitter.com/${orange('buzuli')}`)
    },
    linkedin: {
      label: 'Linkedin 🔗',
      value: blue(`https://linkedin.com/in/${orange('buzuli')}`)
    },
    keybase: {
      label: 'Keybase 🔐',
      value: blue(`https://keybase.io/${orange('buzuli')}`)
    },
    npx: {
      label: '$',
      value: red(`npx ${white('buzuli')}`)
    },
  }

  const cardLines = [
    data.name,
    data.work,
    spacer,
    data.npm,
    data.github,
    data.twitter,
    data.linkedin,
    data.keybase,
    spacer,
    data.npx
  ]

  const maxLabelLen = Object.values(data).reduce((m, d) => Math.max(m, d.label.length), 0)
  const text = cardLines
    .map(({ label, value }) => {
      const pad = ' '.repeat(maxLabelLen - label.length)
      return grey(`${pad}${label}  ${value}`)
    })
    .join('\n')

  const buffer = Buffer.from(orange(boxen(text, boxOptions)))

  return buffer
}

const binDir = require.resolve('./bin/card.js')
const colorFile = path.resolve(path.dirname(binDir), 'card.color')
const plainFile = path.resolve(path.dirname(binDir), 'card.plain')

const writeCard = (file, data, callback) => {
  fs.writeFile(file, data, error => {
    if (error) {
      console.error(`Error writing card to file ${file}:`, error)
      process.exit(1)
    } else if (callback) {
      callback()
    }
  })
}

writeCard(colorFile, card(true), () => writeCard(plainFile, card()))
