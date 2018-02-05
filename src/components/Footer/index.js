import React from 'react'
import PropTypes from 'prop-types'
import Logo from '../assets/EggheadLogoWhite'
import WatchClickOutside from '../../bundles/legacy/components/WatchClickOutside'
import SearchBar from 'components/SearchBar'
import Icon from 'components/Icon'
import styled from 'styled-components'
import Featured from './components/Featured'

const LogoLink = () => {
  return (
    <a href="/" className="db">
      <Logo />
    </a>
  )
}

const SearchSection = () => {
  return (
    <div className="flex flex-column order-last-l mb4 pb3 mb0-l w-100 w-auto-ns">
      <h4 className="avenir normal f5 f4-ns mt0 mb3 white">
        Search for Lessons and Courses
      </h4>
      <SearchBar placeholder="e.g. JavaScript, React" location={`footer`} />
    </div>
  )
}

const FooterLinks = ({items, path}) => {
  return (
    <div className="flex order-0-l justify-between justify-start-ns w-100 w-auto-ns">
      {items.map((item, k) => {
        return (
          <div className="mr4" key={k}>
            <h5 className="avenir f6 f5-ns ttu tracked gray fw6 mt0 mb2 mb3-ns">
              {item.header}
            </h5>
            <ul className="list flex flex-column ma0 pa0 f6 f5-ns">
              {item.items.map((i, k) => {
                if (!i.title) {
                  return
                }

                return (
                  <li className="pv1" key={k}>
                    <a
                      href={i.link}
                      className={`db lh-copy hover-white no-underline grow ${
                        path === i.link ? 'white' : 'white-50'
                      }`}
                    >
                      {i.title}
                    </a>
                  </li>
                )
              })}
            </ul>
          </div>
        )
      })}
    </div>
  )
}
FooterLinks.propTypes = {
  items: PropTypes.array.isRequired,
  path: PropTypes.string,
}

class Footer extends React.Component {
  static propTypes = {
    path: PropTypes.string,
    name: PropTypes.string,
    username: PropTypes.string,
    email: PropTypes.string,
    id: PropTypes.number,
    is_pro: PropTypes.bool,
  }

  render() {
    const {
      path,
      name,
      username,
      email,
      id,
      is_pro,
      avatarUrl = 'http://placehold.it/150x150',
    } = this.props
    const footerDefaultClasses = 'pb2'
    const socialClasses =
      'tc br2 f5 no-underline db-ns pa2 w2 h2 white grow-large'

    const footerItems = [
      {
        header: 'content',
        items: [
          {title: 'Browse', link: '/browse'},
          {title: 'Courses', link: '/courses'},
          {title: 'Lessons', link: '/lessons'},
        ],
      },
      {
        header: 'about',
        items: [
          {title: 'Instructors', link: '/instructors'},
          {title: 'Stories', link: '/stories'},
          {title: 'Pricing', link: '/pricing'},
        ],
      },
    ]

    return (
      <div className="flex flex-column bg-base-secondary">
        <Featured />
        <footer className={footerDefaultClasses}>
          <div className="center ph3 ph4-ns pv4 pv5-ns eh-mw9">
            <div className="pt2-ns pb3">
              <LogoLink />
            </div>

            <div className="pt3 pb4 flex flex-column flex-row-l justify-between items-start bb b--light-navy">
              <SearchSection />
              <FooterLinks items={footerItems} path={path} />
            </div>

            <div className="pt3 mt2 flex flex-column flex-row-ns justify-between items-center f6">
              <ul className="list pa0 ma0 flex gray">
                <li>
                  <a
                    href="/privacy"
                    className="link no-underline gray hover-white"
                  >
                    Terms & Conditions
                  </a>
                </li>
                <li className="ml4">&copy; egghead.io</li>
              </ul>
            </div>
          </div>
        </footer>
      </div>
    )
  }
}

export default Footer
