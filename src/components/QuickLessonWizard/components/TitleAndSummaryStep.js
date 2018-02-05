import React from 'react'
import {css} from 'glamor'

import colorValues from 'lib/colorValues'
import Button from 'components/Button'
import {isEmpty, find, get} from 'lodash'
import {toJS} from 'mobx'
import {inject, observer} from 'mobx-react'
import {Formik, Field} from 'formik'
import TextArea from 'components/form/fields/base/TextArea'
import AsyncDropdown from 'components/AsyncDropdown'
import yup from 'yup'
import queryString from 'query-string'
import {withRouter} from 'react-router-dom'

const schema = yup.object().shape({
  title: yup
    .string()
    .min(5)
    .max(90)
    .required(),
  summary: yup.string().max(1024),
})

class TitleAndSummaryStep extends React.Component {
  handleFormSubmit = values => {
    const {
      updateLesson,
      saveLesson,
      setSelectedStep,
    } = this.props.quickLessonWizardStore
    updateLesson(values)
      .then(saveLesson)
      .then(() => {
        setSelectedStep(2)
      })
  }

  render() {
    const {quickLessonWizardStore, location} = this.props
    const lesson = quickLessonWizardStore.lesson
    const isSaving = quickLessonWizardStore.isSaving
    const parsed = queryString.parse(location.search)

    return (
      <Formik
        isInitialValid={lesson.title.length >= 5}
        initialValues={{title: lesson.title, summary: lesson.summary}}
        onSubmit={this.handleFormSubmit}
        validationSchema={schema}
        render={({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
          isValid,
        }) => (
          <div>
            <form onSubmit={handleSubmit}>
              <div className="bg-white-secondary pa2">
                <div className="pa3 f9">
                  <h3>
                    {quickLessonWizardStore.lesson.title
                      ? quickLessonWizardStore.lesson.title
                      : quickLessonWizardStore.lesson.series
                        ? `You are creating a new lesson for the course ${
                            quickLessonWizardStore.lesson.series.title
                          }`
                        : 'You are creating a new lesson.'}
                  </h3>

                  {quickLessonWizardStore.lesson.title ? (
                    <p>
                      You can edit the details of your lesson here. If your
                      lesson is part of a course, be sure to select it here so
                      that it will be associated.
                    </p>
                  ) : (
                    <p>
                      It only needs a title to be created. You can also add a
                      brief summary now. If your lesson is part of a course, be
                      sure to select it here so that it will be associated.
                    </p>
                  )}
                </div>
                <TextArea
                  label="Title"
                  value={values.title}
                  placeholder="A descriptive phrase to help users find this lesson."
                  divClassNames="bg-white br2 mb3"
                  characterLimit={90}
                  minLength={5}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  rows={2}
                  cols={40}
                  isRequired
                  name="title"
                />
                <TextArea
                  label="Summary"
                  value={values.description}
                  placeholder="Please be descriptive, but brief. Talk to the user, not at them. SEO is important! Markdown is supported."
                  divClassNames="bg-white br2 flex-grow-1"
                  styleTools={false}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  characterLimit={1024}
                  rows={7}
                  cols={40}
                  name="summary"
                />
                {!isEmpty(quickLessonWizardStore.courses) && (
                  <div className={`bg-white br2 mv3`}>
                    <label
                      className={css({
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        borderBottom: `1px solid ${
                          colorValues['gray-secondary']
                        }`,
                        padding: '20px',
                      })}
                    >
                      <span
                        className={css({
                          color: colorValues['base'],
                          fontSize: '18px',
                          lineHeight: '24px',
                          fontFamily: 'Avenir',
                          fontWeight: 500,
                          paddingTop: '2px',
                        })}
                      >
                        Associate Lesson with Course
                      </span>
                    </label>
                    <div className={`pa3`}>
                      <AsyncDropdown
                        updateItem={series =>
                          quickLessonWizardStore.updateLesson({series})
                        }
                        items={quickLessonWizardStore.courses}
                        getDataUrl={quickLessonWizardStore.searchForCourse}
                        itemLabelProp="title"
                        itemImageUrlProp="square_cover_url"
                        placeholder="Type the Course Name Here"
                        selected={find(quickLessonWizardStore.courses, {
                          slug:
                            parsed.course ||
                            get(quickLessonWizardStore, 'lesson.series.slug'),
                        })}
                      />
                    </div>
                  </div>
                )}
              </div>
              <div className="flex flex-column flex-row-ns justify-end  pa4">
                <div className="flex flex-column mb2 mb0-ns pr3">
                  <Button
                    outline
                    color="red"
                    disabled={isSubmitting || isSaving}
                    onClick={e => {
                      e.preventDefault()
                      quickLessonWizardStore.closeWizard()
                    }}
                  >
                    {lesson.path ? 'Close' : 'Cancel'}
                  </Button>
                </div>

                <div className="flex flex-column mb0-ns">
                  <Button
                    type="submit"
                    color="green"
                    disabled={!isValid || isSubmitting || isSaving}
                  >
                    {isSaving
                      ? 'Saving'
                      : lesson.path ? 'Save Lesson' : 'Create Lesson'}
                  </Button>
                </div>
              </div>
              {quickLessonWizardStore.notice && (
                <div className="w-100 pa2 tr">
                  {quickLessonWizardStore.notice}
                </div>
              )}
            </form>
          </div>
        )}
      />
    )
  }
}

export default withRouter(
  inject('quickLessonWizardStore')(observer(TitleAndSummaryStep)),
)
