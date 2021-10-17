const path = require('path')
const fs = require('fs')
const shell = require('shelljs')

const README_PATH = path.resolve(__dirname, '..', '..', 'README.md')
const COMPLETED_SIGN = '✔️'

const lessonName = process.argv[2]

if (!lessonName) {
  throw new Error('Lesson name is not provided')
}

const readmeContent = fs.readFileSync(README_PATH, { encoding: 'UTF-8' })

if (!readmeContent.includes(lessonName)) {
  throw new Error('Lesson name not found in README.md')
}

fs.writeFileSync(README_PATH, readmeContent.replace(lessonName, `${COMPLETED_SIGN} ${lessonName}`))

shell.exec('git add .')
shell.exec(`git commit -m "${lessonName}"`)
