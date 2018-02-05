import React from 'react'
import axios from 'axios'
import {isEmpty, flatten, forEach} from 'lodash'
import Button from 'components/Button'
import Error from 'components/Error'
import Tagger from './components/Tagger'

const http = axios.create()

class ItemTagging extends React.Component {
  inCourseContext = () => {
    return !this.props.item.lesson_url
  }

  lessonsUntagged = () => {
    const lessons = this.props.item.lessons

    let result = false

    forEach(lessons, lesson => {
      const {
        language_list,
        framework_list,
        skillset_list,
        library_list,
        tool_list,
        platform_list,
      } = lesson
      result = isEmpty(
        flatten(
          language_list,
          framework_list,
          skillset_list,
          library_list,
          tool_list,
          platform_list,
        ),
      )
    })

    return result
  }

  renderIfLessonsUntagged = () => {
    if (this.inCourseContext()) {
      if (this.lessonsUntagged()) {
        return (
          <div className="mv3">
            <Error>Lessons Untagged!</Error>
          </div>
        )
      }
    }
  }

  tagAllLessons = () => {
    if (this.inCourseContext()) {
      return (
        <Button
          size="small"
          onClick={() => {
            this.props.item.lessons.forEach(lesson => {
              const {item} = this.props

              http({
                method: 'put',
                url: lesson.url,
                data: {
                  lesson: {
                    language_list: item.language_list.join(', '),
                    framework_list: item.framework_list.join(', '),
                    skillset_list: item.skillset_list.join(', '),
                    library_list: item.library_list.join(', '),
                    tool_list: item.tool_list.join(', '),
                    platform_list: item.platform_list.join(', '),
                  },
                },
              })
            })
          }}
          color="orange"
          outline
        >
          Apply tags to all Series Lessons
        </Button>
      )
    }
  }

  render() {
    const {item, onUpdate} = this.props

    return (
      <div>
        {this.renderIfLessonsUntagged()}

        <article className="flex flex-wrap">
          <Tagger
            label="Languages"
            item={item}
            onUpdate={onUpdate}
            field="language_list"
            description="Programming language the lesson is written for. eg `javascript`"
            className="pr2"
          />
          <Tagger
            label="Frameworks"
            item={item}
            onUpdate={onUpdate}
            field="framework_list"
            description="'Built-on', these are a foundational shortcut to a final product. Generally not combined with each other."
            className="pl2"
          />
          <Tagger
            label="Skillsets"
            item={item}
            tags={item.skillset_list}
            onUpdate={onUpdate}
            field="skillset_list"
            description="Broad grouping to help people narrow down the kinds of lessons they’re looking for. This list should be added to very sparingly, otherwise it can get overcrowded and turn into a generic tag-cloud pretty quickly."
            className="pr2"
          />
          <Tagger
            label="Libraries"
            item={item}
            onUpdate={onUpdate}
            field="library_list"
            description="'Built-with', these are extensions to core languages. A single project can use lots of libraries together."
            className="pl2"
          />
          <Tagger
            label="Tools"
            item={item}
            onUpdate={onUpdate}
            field="tool_list"
            description="Things that make development life easier, these tend to be useful across languages and frameworks."
            className="pr2"
          />
          <Tagger
            label="Platforms"
            item={item}
            onUpdate={onUpdate}
            field="platform_list"
            description="Development or runtime platform (is that still a real word, 'runtime'????) featured in the lesson. This isn’t for 'I recorded this screencast on a Mac', but rather 'Here’s how you handle swipe animations on Android.'"
            className="pl2"
          />

          <div>{this.tagAllLessons()}</div>
        </article>
      </div>
    )
  }
}

export default ItemTagging
