const path = require('path')
const fs = require('fs')

const PROJECT_ROOT_PATH = path.resolve(__dirname, '..', '..')
const DOCS_PATH = path.resolve(PROJECT_ROOT_PATH, 'docs')
const README_PATH = path.resolve(PROJECT_ROOT_PATH, 'README.md')
const VIDEOS_PATH = path.resolve(PROJECT_ROOT_PATH, '..', 'Videos', 'python-learn')
const WATCHED_EXTENSIONS = ['.mp4', '.html']

fs.appendFileSync(README_PATH, `# Python learn \n\n`)

const videosDirectories = getDirectories(VIDEOS_PATH)
const lessons = videosDirectories.map((dir) => {
  const videos = fs
    .readdirSync(path.join(VIDEOS_PATH, dir))
    .filter((filename) => WATCHED_EXTENSIONS.some((ext) => filename.endsWith(ext)))
    .map((filename) => filename.replace(/\.[^/.]+$/, ""))

  return {
    name: dir,
    videos: [...new Set(videos)]
  }
})

lessons.forEach(async (lesson) => {
  const lessonDirPath = path.join(DOCS_PATH, lesson.name)
  const encodedLessonDirRelativePath = `./docs/${encodeURIComponent(lesson.name)}`
  fs.mkdirSync(lessonDirPath)
  fs.appendFileSync(README_PATH, `- [${lesson.name}](${encodedLessonDirRelativePath})\n`)

  lesson.videos.forEach((lessonName) => {
    const lessonFileName = `${lessonName}.md`
    const encodedLessonFileName = encodeURIComponent(lessonFileName)
    fs.writeFileSync(path.resolve(lessonDirPath, `${lessonName}.md`), `# ${lessonName}\n\n`, function (err) {
      if (err) throw err;
    });
    fs.appendFileSync(README_PATH, `  - [${lessonName}](${encodedLessonDirRelativePath}/${encodedLessonFileName})\n`)
  })
})

function getDirectories (source) {
  return fs.readdirSync(source, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name)
}
