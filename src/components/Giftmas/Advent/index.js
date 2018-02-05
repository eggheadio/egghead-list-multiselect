import React, {Component} from 'react'
import {observer, Provider} from 'mobx-react'
import {css} from 'glamor'
import {map, sortBy, times, constant} from 'lodash'
import axios from 'axios'

import colorValues from 'lib/colorValues'

import bgCardToday from './assets/images/card-opened.png'
import bgCardUpcoming from './assets/images/card-half-opened.png'
import bgCardUpcomingHover from './assets/images/card-half-opened-hover.png'
import bgCardClosed from './assets/images/card-closed.png'

const additionalColorValues = {
  altGreen: '#134e59',
  altYellow: '#ffd56d',
  altYellowDark: '#e7a03c',
}

const http = axios.create()

const giftsByOrder = [
  {
    imgUrl:
      'https://d2eip9sf3oo6c2.cloudfront.net/series/square_covers/000/000/160/thumb/EGH_ReactBeginners.png',
    title: "The Beginner's Guide to ReactJS",
    courseUrl: '/courses/the-beginner-s-guide-to-reactjs',
    state: 'today',
  },
  {
    imgUrl:
      'https://d2eip9sf3oo6c2.cloudfront.net/series/square_covers/000/000/166/thumb/EGH_AdvPatterns.png',
    title: 'Advanced React Component Patterns',
    courseUrl: '/courses/advanced-react-component-patterns',
    state: 'today',
  },
  {
    imgUrl:
      'https://d2eip9sf3oo6c2.cloudfront.net/series/square_covers/000/000/167/thumb/EGH_JSthis_1000.png',
    title: "Understand JavaScript's this Keyword in Depth",
    courseUrl: '/courses/understand-javascript-s-this-keyword-in-depth',
    state: 'today',
  },
  {
    imgUrl:
      'https://d2eip9sf3oo6c2.cloudfront.net/series/square_covers/000/000/157/thumb/gatsbycourse.png',
    title: 'Build a Blog with React and Markdown using Gatsby',
    courseUrl: '/courses/build-a-blog-with-react-and-markdown-using-gatsby',
    state: 'today',
  },
  {
    imgUrl:
      'https://d2eip9sf3oo6c2.cloudfront.net/series/square_covers/000/000/120/thumb/EGH_NodeDocker_1000.png',
    title: 'Build a Twelve-Factor Node.js App with Docker',
    courseUrl: '/courses/build-a-twelve-factor-node-js-app-with-docker',
    state: 'today',
  },
  {
    state: 'upcoming',
  },
  {
    state: 'closed',
  },
  {
    state: 'closed',
  },
  {
    state: 'closed',
  },
  {
    state: 'closed',
  },
  {
    state: 'closed',
  },
  {
    state: 'closed',
  },
  {
    state: 'closed',
  },
  {
    state: 'closed',
  },
  {
    state: 'closed',
  },
  {
    state: 'closed',
  },
  {
    state: 'closed',
  },
  {
    state: 'closed',
  },
]

const fontText = 'BT Futura W01'
const fontTitles = 'Ysobel W01 Display'

const hoverState = css({
  ':hover': {
    backgroundImage: `url(${bgCardUpcomingHover})`,
  },
})

const Button = ({children, href}) => {
  const from = additionalColorValues['altYellow']
  const to = additionalColorValues['altYellowDark']
  return (
    <a
      href={href}
      className={css({
        textTransform: 'uppercase',
        textDecoration: 'none',
        color: colorValues['white'],
        display: 'inline-flex',
        borderRadius: '5px',
        alignItems: 'center',
        fontFamily: fontText,
        fontSize: '16px',
        lineHeight: '24px',
        padding: '20px 30px',
        background: `linear-gradient(170deg, ${from}, ${to})`,
      })}
    >
      {children}
    </a>
  )
}

const CardContent = ({imgUrl, title, courseUrl}) => (
  <div
    className={css({
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      textAlign: 'center',
    })}
  >
    <a
      href={courseUrl}
      className={css({
        transition: '150ms',
        transform: 'scale(1)',
        ':hover': {
          transform: 'scale(1.1)',
        },
      })}
    >
      <img
        src={imgUrl}
        className={css({
          display: 'block',
          width: '100%',
          maxWidth: '120px',
          '@media(min-width: 545px)': {
            maxWidth: '100px',
          },
          '@media(min-width: 768px)': {
            maxWidth: '150px',
          },
          '@media(min-width: 992px)': {
            maxWidth: '110px',
          },
          '@media(min-width: 1200px)': {
            maxWidth: '170px',
          },
        })}
      />
    </a>
    <a
      href={courseUrl}
      className={css({
        fontSize: '16px',
        lineHeight: 1.25,
        textDecoration: 'none',
        color: colorValues['dark-blue'],
        marginTop: '15px',
        ':hover': {
          textDecoration: 'underline',
        },
        '@media(min-width: 545px)': {
          fontSize: '16px',
        },
        '@media(min-width: 768px)': {
          fontSize: '20px',
        },
        '@media(min-width: 992px)': {
          fontSize: '18px',
        },
        '@media(min-width: 1200px)': {
          fontSize: '22px',
        },
      })}
    >
      {title}
    </a>
  </div>
)

const CardNumber = ({index}) => (
  <div
    className={css({
      color: colorValues['white'],
      fontFamily: fontTitles,
      fontWeight: 700,
      fontSize: '64px',
      lineHeight: 1.1,
    })}
  >
    {index + 1}
  </div>
)

const Card = ({imgUrl, title, courseUrl, state, index}) => {
  let bg = state
  switch (state) {
    case 'published':
      bg = bgCardToday
      break

    case 'upcoming':
      bg = bgCardUpcoming
      break

    default:
      bg = bgCardClosed
      break
  }
  return (
    <div
      className={css(
        {
          width: '288px',
          height: '310px',
          padding: '35px 35px 40px 75px',
          backgroundImage: `url(${bg})`,
          backgroundSize: '100%',
          backgroundRepeat: 'no-repeat',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: '20px',
          '@media(min-width: 545px)': {
            width: '250px',
            height: '270px',
            padding: '30px 30px 40px 65px',
          },
          '@media(min-width: 768px)': {
            width: '350px',
            height: '374px',
            padding: '35px 40px 40px 90px',
            marginTop: '30px',
          },
          '@media(min-width: 992px)': {
            width: '285px',
            height: '304px',
            padding: '35px 40px 40px 80px',
            marginTop: '20px',
          },
          '@media(min-width: 1200px)': {
            width: '380px',
            height: '405px',
            padding: '50px 40px 50px 100px',
            marginTop: '30px',
          },
        },
        state === 'upcoming' && hoverState,
      )}
    >
      {state === 'published' ? (
        <CardContent imgUrl={imgUrl} title={title} courseUrl={courseUrl} />
      ) : (
        <CardNumber index={index} />
      )}
    </div>
  )
}

const giftmasCourseSlugs = [
  'the-beginner-s-guide-to-reactjs',
  'advanced-react-component-patterns',
  'understand-javascript-s-this-keyword-in-depth',
  'build-a-blog-with-react-and-markdown-using-gatsby',
  'build-a-twelve-factor-node-js-app-with-docker',
  'intro-to-python',
  'introductory-machine-learning-in-python-with-scikit-learn',
  'make-webpack-easy-with-poi',
  'use-typescript-to-develop-react-applications',
  'build-a-server-rendered-code-split-app-in-react-with-react-universal-component',
  'advanced-fine-grained-control-of-vue-js-components',
  'getting-to-know-the-state-monad-in-javascript',
  'create-dynamic-components-in-angular',
  'create-dynamic-forms-in-angular',
  'learn-http-in-angular',
  'async-react-with-redux-saga',
  'manage-application-state-with-mobx-state-tree',
  'build-react-components-from-streams-with-rxjs-and-recompose',
]

class Advent extends Component {
  state = {
    giftmasCourses: [
      ...times(giftmasCourseSlugs.length, constant({state: 'closed'})),
    ],
    publishedCoursesCount: 0,
  }

  componentDidMount() {
    axios
      .all(
        map(
          giftmasCourseSlugs.map(
            slug =>
              `https://egghead.io/api/v1/series/${slug}?load_lessons=false`,
          ),
          http.get,
        ),
      )
      .then(results => {
        const courses = results.map(r => r.data)
        const giftmasCourses = sortBy(courses, 'published_at')
        const publishedCoursesCount = giftmasCourses.reduce(
          (count, currentCourse) => {
            if (currentCourse.state === 'published') {
              count += 1
            }
            return count
          },
          0,
        )
        this.setState({giftmasCourses, publishedCoursesCount})
      })
  }

  render() {
    return (
      <section
        className={css({
          padding: '20px 0 40px 0',
          display: 'flex',
          justifyContent: 'center',
          '@media(min-width: 768px)': {
            padding: '30px 0 60px 0',
          },
          '@media(min-width: 992px)': {
            padding: '60px 0 80px 0',
          },
          '@media(min-width: 1200px)': {
            padding: '70px 0 100px 0',
          },
        })}
      >
        <div
          className={css({
            width: '100%',
            maxWidth: '288px',
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            '@media(min-width: 545px)': {
              maxWidth: '510px',
            },
            '@media(min-width: 768px)': {
              maxWidth: '730px',
            },
            '@media(min-width: 992px)': {
              maxWidth: '960px',
            },
            '@media(min-width: 1200px)': {
              maxWidth: '1170px',
            },
          })}
        >
          {map(this.state.giftmasCourses, (gift, index) => {
            const isUpcomingGift = index === this.state.publishedCoursesCount
            return (
              <Card
                key={index}
                index={index}
                imgUrl={gift.square_cover_large_url}
                title={gift.title}
                courseUrl={gift.http_url}
                state={isUpcomingGift ? 'upcoming' : gift.state}
              />
            )
          })}
        </div>
      </section>
    )
  }
}

export default observer(Advent)
