import React from 'react'
import {set, get, isEmpty} from 'lodash'
import {observer, inject} from 'mobx-react'
import {observable} from 'mobx'
import ReversibleToggle from '../ReversibleToggle'
import sharedCss from 'components/form/formStyles.scss'
import CodeInput from '../CodeInput'
import Hint from 'components/Hint'

const hint = (
  <div className="bg-white pa2 w5 f5">
    <h2>{'LESSON CODE'}</h2>
    <div>
      <span className="b">{'Choose 1.'}</span>
      {
        " Github and Plunker are the most common locations. For Github, it is the instructor's username, the repo name, and any branch (default: master). For Plunker, make sure you've used the "
      }
      <span className="b">{'egghead account.'}</span>
      {
        ' If not, then the plunk should be cloned to the egghead account. Please '
      }
      <a href="#">{'talk to an admin'}</a>
      {' if you need help!'}
    </div>
  </div>
)

const toggleOptions = ['Github', 'Embed']

const PLUNKER = 1
const GITHUB = 0

@observer
class Code extends React.Component {
  constructor(props) {
    super(props)
    this.state.selected = isEmpty(get(props, 'lesson.code.github'))
      ? PLUNKER
      : GITHUB
  }

  state = {
    selected: PLUNKER,
  }

  toggleClick = () => this.setState({selected: 1 - this.state.selected})

  createGithubObject = (lesson, key, value) => ({
    ...lesson.code.github,
    [key]: value,
  })

  render() {
    const {lesson} = this.props

    return (
      <div className={`bg-white br2 flex-grow-1 ${sharedCss.box}`}>
        <label
          className={`flex flex-row justify-between f4 db bb black-90 b--black-20 pa2 h3 ${
            sharedCss.label
          }`}
        >
          <div className="flex mr3 items-center">
            <div className="mr2">{'Lesson Code'}</div>
            <ReversibleToggle
              options={toggleOptions}
              selected={this.state.selected}
              onClick={this.toggleClick}
            />
          </div>
          <Hint payload={hint} />
        </label>
        {this.state.selected === PLUNKER ? (
          <CodeInput
            value={get(lesson, 'code.plunker_url')}
            placeholder="Enter your Embed URL. Example: https://embed.plnkr.co/8XHq7g/"
            onChange={value => {
              lesson.code = {...lesson.code, plunker_url: value}
            }}
            type="url"
            hint="This hint can be modified in the LessonEdits/components/forms/Code render function"
          />
        ) : (
          <div>
            <CodeInput
              label="GITHUB USER NAME"
              value={get(lesson, 'code.github.user')}
              onChange={value => {
                const github = this.createGithubObject(lesson, 'user', value)
                lesson.code = {...lesson.code, github}
              }}
              hint="The account owner of the github repository (Likely eggheadio-projects)"
            />
            <CodeInput
              label="GITHUB REPOSITORY NAME"
              value={get(lesson, 'code.github.repo')}
              onChange={value => {
                const github = this.createGithubObject(lesson, 'repo', value)
                lesson.code = {...lesson.code, github}
              }}
              hint="The name of the repository."
            />
            <CodeInput
              label="GITHUB BRANCH/TAG"
              value={get(lesson, 'code.github.branch')}
              onChange={value => {
                const github = this.createGithubObject(lesson, 'branch', value)
                lesson.code = {...lesson.code, github}
              }}
              hint="Specify folders after branch or tag name when needed. e.g. master/01-lesson"
            />
          </div>
        )}
      </div>
    )
  }
}

export default Code
