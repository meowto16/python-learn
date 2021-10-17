const path = require('path')
const fs = require('fs')

const PROJECT_ROOT_PATH = path.resolve(__dirname, '..', '..')
const DOCS_PATH = path.resolve(PROJECT_ROOT_PATH, 'docs')
const VIDEOS_PATH = path.resolve(PROJECT_ROOT_PATH, '..', 'Videos', 'python-learn')
const WATCHED_EXTENSIONS = ['.mp4', '.html']

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

lessons.forEach((lesson) => {
  const lessonDirPath = path.join(DOCS_PATH, lesson.name)
  fs.mkdirSync(lessonDirPath)

  lesson.videos.forEach((lessonName) => {
    fs.writeFile(path.resolve(lessonDirPath, `${lessonName}.md`), '', function (err) {
      if (err) throw err;
    });
  })
})


function getDirectories (source) {
  return fs.readdirSync(source, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name)
}
