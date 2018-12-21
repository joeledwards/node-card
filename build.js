const c = require('@buzuli/color')
const fs = require('fs')
const path = require('path')
const boxen = require('boxen')

const boxOptions = {
  padding: 1,
  margin: 1,
  bordStyle: 'round'
}

const lc = c.white.bold

const spacer = { label: '', value: '' }
const data = {
  name: {
    label: '',
    value: c.grey(`${c.white.bold('Joel Edwards')} | ${c.orange('@buzuli')}`)
  },
  work: {
    label: '',
    value: c.white(`Senior Data Engineer @ ${c.red('npm')}`)
  },
  npm: {
    label: 'npm 📦',
    value: c.blue(`https://npmjs.com/~${c.orange('buzuli')}`)
  },
  github: {
    label: 'Github 🐙',
    value: c.blue(`https://github.com/${c.orange('joeledwards')}`)
  },
  twitter: {
    label: 'Twitter 🐦',
    value: c.blue(`https://twitter.com/${c.orange('buzuli')}`)
  },
  linkedin: {
    label: 'Linkedin 🔗',
    value: c.blue(`https://linkedin.com/in/${c.orange('buzuli')}`)
  },
  npx: {
    label: '$',
    value: c.red(`npx ${c.white('buzuli')}`)
    },
}

const card = [
  data.name,
  data.work,
  spacer,
  data.npm,
  data.github,
  data.twitter,
  data.linkedin,
  spacer,
  data.npx
]

const maxLabelLen = Object.values(data).reduce((m, d) => Math.max(m, d.label.length), 0)
const text = card
  .map(({ label, value }) => {
    const pad = ' '.repeat(maxLabelLen - label.length)
    return c.grey(`${pad}${label}  ${value}`)
  })
  .join('\n')

const buffer = Buffer.from(c.orange(boxen(text, boxOptions)))

const binDir = require.resolve('./bin/card.js')
const datFile = path.resolve(path.dirname(binDir), 'card.dat')

fs.writeFile(datFile, buffer, error => {
  if (error) {
    console.error('Error assembling the card:', error)
    process.exit(1)
  }
})
