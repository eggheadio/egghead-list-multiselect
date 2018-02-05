import {first, isEmpty, isUndefined, get} from 'lodash'

export default function convertToItem(item) {
  if (isEmpty(item)) return
  const {instructor, technology} = item
  const tag = item.primary_tag || (!isEmpty(item.tags) && first(item.tags))
  const contentIsCourse = !isUndefined(item.square_cover_url)
  return {
    id: item.slug,
    title: item.title,
    slug: item.slug,
    state: item.state,
    instructorAvatarUrl: get(instructor, 'avatar_url'),
    instructorUrl: get(instructor, 'http_url'),
    instructorName: get(instructor, 'full_name'),
    instructorTwitter: get(instructor, 'twitter'),
    smallIconUrl: item.icon_url,
    summary: item.summary,
    duration: item.duration,
    label: contentIsCourse ? 'Course' : 'Lesson',
    labelColor: contentIsCourse ? 'orange' : 'green',
    contentUrl: item.http_url,
    path: item.path,
    illustrationUrl: item.square_cover_url,
    completed: item.completed || false,
    favorited: item.favorited,
    lessons: item.lessons,
    lessons_url: item.lessons_url,
    lessonCount: item.published_lesson_count || false,
    tag: tag.name,
    tagUrl: tag.http_url,
    progress: item.progress,
    new_series_lesson_url: item.new_series_lesson_url,
    edit_series_http_url: item.edit_series_http_url,
    update_lesson_url: item.update_lesson_url,
    isCommunityResource: item.free_forever === true,
    isPro: item.is_pro_content === true,
    item,
  }
}
