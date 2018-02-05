/* eslint-disable */

export function convertTime(seconds) {
  function pad(s) {
    return s.length > 1 ? s : s.length == 0 ? '00' : `0${s}`
  }
  const mins = ~~(seconds / 60)
  const secs = seconds % 60
  return `${pad(mins.toString())}:${pad(secs.toString())}`
}

export function percentComplete(course, completed_lessons) {
  const totalDuration = course.lessons.reduce((p, l) => p + l.duration, 0)
  const completedDuration = course.lessons.reduce(
    (p, l) => p + (isLessonComplete(l, completed_lessons) ? l.duration : 0),
    0,
  )

  return completedDuration / totalDuration
}

export function isLessonComplete(lesson, completed_lessons) {
  return _.some(completed_lessons, {slug: lesson.slug})
}
