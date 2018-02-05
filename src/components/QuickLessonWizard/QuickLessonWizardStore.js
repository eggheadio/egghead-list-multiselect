import {observable, action, computed, toJS} from 'mobx'
import {get, isEqual, filter, toString, isFunction, includes} from 'lodash'
import axios from 'axios'

const http = axios.create()

const NEW_LESSON_TEMPLATE = {
  title: '',
  summary: '',
  code: {},
}

export default class QuickLessonWizardStore {
  @observable lesson
  @observable currentUser
  @observable isSaving = false
  @observable selectedStep = 1
  @observable isOpen = false
  @observable notice

  constructor(currentUser, onUpdate, onClose, courses, lesson) {
    this.currentUser = currentUser
    this.courses = courses
    this.lesson = lesson
      ? {...NEW_LESSON_TEMPLATE, ...lesson}
      : NEW_LESSON_TEMPLATE
    this.onUpdate = onUpdate
    this.onClose = onClose
  }

  @computed
  get canUpload() {
    return (
      get(this.lesson, 'signed_s3_upload_url') &&
      get(this.lesson, 'process_lesson_video_url')
    )
  }

  @computed
  get canEdit() {
    return get(this.lesson, 'update_lesson_url')
  }

  @computed
  get dirty() {
    return !isEqual(this.originalLesson, toJS(this.lesson))
  }

  @action
  searchForCourse = (value = '') =>
    new Promise(resolve => {
      if (value === '') {
        resolve(this.courses)
      } else {
        resolve(
          filter(this.courses, course => {
            return includes(course.title.toLowerCase(), value.toLowerCase())
          }),
        )
      }
    })

  @action
  closeWizard = () => {
    if (isFunction(this.onClose)) {
      this.onClose(toJS(this.lesson))
    } else {
      this.isOpen = false
      this.lesson = NEW_LESSON_TEMPLATE
      this.originalLesson = NEW_LESSON_TEMPLATE
      this.selectedStep = 1
    }
  }
  @action
  saveAndClose = () => this.saveLesson(this.lesson).then(this.closeWizard)

  @action
  setLesson = lesson =>
    new Promise(resolve => {
      this.originalLesson = toJS(this.lesson)
      this.lesson = lesson
      this.isSaving = false
      if (this.notice === 'Saving Lesson') {
        this.notice = 'Saved'
        setTimeout(() => (this.notice = ''), 2000)
      }
      if (isFunction(this.onUpdate)) {
        this.onUpdate(toJS(this.lesson))
      }
      resolve(this.lesson)
    })

  @action setSelectedStep = stepIndex => (this.selectedStep = stepIndex)

  @action
  updateLesson = patch =>
    new Promise(resolve => {
      this.lesson = {...toJS(this.lesson), ...patch}
      resolve(this.lesson)
    })

  @action
  saveLesson = () => {
    const updateUrl = get(this.lesson, 'update_lesson_url')
    const newUrl = get(this.currentUser, 'new_lesson_url')
    const {
      title,
      summary,
      code = {},
      framework_list,
      language_list,
      tool_list,
      series,
      library_list,
      platform_list,
      skill_level_list,
      skillset_list,
      is_pro_content,
    } = toJS(this.lesson)
    const {github, plunker_url} = code
    const saveObject = {
      lesson: {
        title,
        summary,
        series_id: get(series, 'id'),
        instructor_id: get(
          this.lesson,
          'instructor.id',
          get(this.currentUser, 'instructor.id'),
        ),
        framework_list: toString(framework_list),
        language_list: toString(language_list),
        platform_list: toString(platform_list),
        tool_list: toString(tool_list),
        library_list: toString(library_list),
        skill_level_list: toString(skill_level_list),
        skillset_list: toString(skillset_list),
        github_repo: get(github, 'repo'),
        github_user: get(github, 'user'),
        git_branch: get(github, 'branch'),
        plunker_url,
        is_pro_content: is_pro_content,
      },
    }

    if (updateUrl && this.dirty) {
      this.isSaving = true
      this.notice = 'Saving Lesson'
      return http
        .put(updateUrl, saveObject)
        .then(({data}) => this.setLesson(data))
    } else if (newUrl && !updateUrl) {
      this.isSaving = true
      this.notice = 'Saving Lesson'
      return http
        .post(newUrl, saveObject)
        .then(({data}) => this.setLesson(data))
    }

    return new Promise(resolve => resolve(this.lesson))
  }
}
