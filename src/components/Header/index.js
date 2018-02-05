import React from 'react'
import PropTypes from 'prop-types'
import Icon from 'components/Icon'
import Button from 'components/Button'

import {inject, observer} from 'mobx-react'

import {throttle, isEmpty, get} from 'lodash'
import Maybe from 'components/Maybe'
import WatchClickOutside from '../../bundles/legacy/components/WatchClickOutside'
import ExternalTrackingLink from 'components/ExternalTrackingLink'

import LogoDesktop from '../assets/EggheadLogoWhite'
import LogoMobile from '../assets/Eggo'
import css from './index.scss'

import axios from 'axios'
import TrackingLink from '../TrackingLink/index'
const http = axios.create()

const maxMobileViewportWidth = 991
const headerHideOffset = 1

const headerLinks = []

const navigationLinks = [
  {
    title: 'Browse it All',
    link: '/browse',
    icon: 'browse-all',
    iconColor: 'dark-gray',
  },
  {
    title: 'Quick Lessons',
    link: '/lessons',
    icon: 'lesson-headline',
    iconColor: 'green',
  },
  {
    title: 'Full Courses',
    link: '/courses',
    icon: 'play-course',
    iconColor: 'orange',
  },
]

const browseLinks = [
  {
    title: 'Frameworks',
    link: '/browse/frameworks',
  },
  {
    title: 'Libraries',
    link: '/browse/libraries',
  },
  {
    title: 'Languages',
    link: '/browse/languages',
  },
  {
    title: 'Tools',
    link: '/browse/tools',
  },
  {
    title: 'Platforms',
    link: '/browse/platforms',
  },
]

const reviewLinks = [
  {title: 'Review', link: '/review'},
  {title: 'Lessons', link: '/review/lessons'},
]

const LogoLink = ({isMobileViewport}) => (
  <a href="/" className={css.logoLink}>
    {isMobileViewport ? <LogoMobile /> : <LogoDesktop />}
  </a>
)

const GoProButton = ({location}) => {
  return (
    <ExternalTrackingLink
      href="/pricing?from=go-pro-nav"
      className={`${css.headerLink} ${css.headerLinkGoPro} `}
      track={`click nav go pro`}
      trackParams={{
        location,
      }}
    >
      Go Pro
    </ExternalTrackingLink>
  )
}

const InstructorButton = ({path, location}) => {
  return (
    <TrackingLink
      to={path}
      className={`${css.headerLink} ${css.headerLinkGoPro} `}
      track={`click nav instructor`}
      trackParams={{
        location,
      }}
    >
      Instructor
    </TrackingLink>
  )
}

const HeaderLink = ({item}) => {
  return (
    <li>
      <ExternalTrackingLink
        href={item.link}
        className={css.headerLink}
        track={`clicked ${item.title.toLowerCase()}`}
      >
        {item.title}
      </ExternalTrackingLink>
    </li>
  )
}

const HeaderLinks = ({links}) => (
  <Maybe condition={!isEmpty(links)}>
    <ul className={css.headerLinks}>
      {links.map((item, k) => <HeaderLink item={item} key={k} />)}
    </ul>
  </Maybe>
)

const ProfileDropdown = ({
  user_profile_url,
  name,
  username,
  email,
  avatar_url,
  id,
  is_pro,
  isDropdownOpened,
  toggleHandler,
  mouseOverHandler,
  mouseLeaveHandler,
}) => {
  const closedClass = isDropdownOpened ? '' : css.dropdownClosed
  const openedClass = isDropdownOpened ? css.dropdownOpened : ''
  return (
    <div
      className={css.dropdown}
      onMouseOver={mouseOverHandler}
      onMouseLeave={mouseLeaveHandler}
    >
      <button
        className={`br0 ${css.dropdownTrigger} ${openedClass} `}
        onClick={toggleHandler}
      >
        <span className={`${css.dropdownUsername}`}>{username}</span>
        <img src={avatar_url} alt="" className={css.dropdownUserAvatar} />
      </button>
      <div className={`${css.dropdownContentHolder} ${closedClass}`}>
        {user_profile_url && (
          <ExternalTrackingLink
            href={user_profile_url}
            track="clicked view profile"
            className={css.navigationLink}
          >
            Profile
          </ExternalTrackingLink>
        )}
        {!is_pro && (
          <ExternalTrackingLink
            href="/pricing?from=header%20dropdown"
            track="clicked become a member"
            className={css.navigationLink}
          >
            Become a member
          </ExternalTrackingLink>
        )}
        <div className={css.dropdownSeparator} />
        <ExternalTrackingLink
          href="/users/sign_out"
          data-method="delete"
          track="clicked sign out"
          className={css.navigationLink}
        >
          Sign out
        </ExternalTrackingLink>
      </div>
    </div>
  )
}

const NavigationLink = ({item}) => {
  return (
    <li>
      <ExternalTrackingLink
        href={item.link}
        className={css.navigationLink}
        track={`clicked ${item.title.toLowerCase()}`}
      >
        {item.icon && (
          <div className={css.iconHolder}>
            <Icon type={item.icon} color={item.iconColor} size="4" />
          </div>
        )}
        <span>{item.title}</span>
      </ExternalTrackingLink>
    </li>
  )
}

const DirectionArrow = ({rotated}) => {
  const rotatedClass = rotated ? css.directionArrowRotated : ''
  return (
    <div className={`${css.directionArrow} ${rotatedClass}`}>
      <Icon type="arrow-right" color="dark-gray" size="2" />
    </div>
  )
}

const NavigationDropdown = ({
  navigationLinks,
  browseLinks,
  learnToCodeClick,
  isDropdownOpened,
  directionArrow,
  disabled,
}) => {
  const closedClass = isDropdownOpened ? '' : css.dropdownClosed
  const openedClass = isDropdownOpened ? css.dropdownOpened : ''
  return (
    <div className={css.dropdown}>
      <button
        className={`br0
          ${css.dropdownTrigger}
          ${openedClass}
          ${disabled ? css.disable : ''}
        `}
        onClick={learnToCodeClick}
      >
        <div className={css.triggerIconHolder}>
          <Icon type="playbook" color="dark-gray" size="4" />
        </div>
        <span className={css.dropdownTriggerTitle}>Learn to Code</span>
        <Maybe condition={Boolean(directionArrow)}>
          <DirectionArrow rotated={isDropdownOpened} />
        </Maybe>
      </button>
      <div className={`${css.dropdownContentHolder} ${closedClass}`}>
        <ul className={css.dropdownLinksList}>
          {navigationLinks.map((item, k) => (
            <NavigationLink item={item} key={k} />
          ))}
        </ul>
        <div className={css.dropdownSeparator} />
        <ul className={css.dropdownLinksList}>
          {browseLinks.map((item, k) => <NavigationLink item={item} key={k} />)}
        </ul>
      </div>
    </div>
  )
}

const ProfileHeaderItems = ({
  user_profile_url,
  production_board_path,
  path,
  name,
  username,
  email,
  id,
  is_pro,
  avatar_url,
  isProfileDropdownOpened,
  profileDropdownToggleHandler,
  mouseOverHandler,
  mouseLeaveHandler,
}) => {
  return (
    <div className={css.profileHeaderItemsHolder}>
      {!is_pro && !production_board_path ? (
        <GoProButton location={path} />
      ) : null}
      {production_board_path ? (
        <InstructorButton location={path} path={production_board_path} />
      ) : null}
      {id ? null : (
        <ExternalTrackingLink
          href="/users/sign_in"
          className={css.headerLink}
          track="clicked header login"
          trackParams={{
            location: path,
          }}
        >
          Sign in
        </ExternalTrackingLink>
      )}
      {id ? (
        <div className="self-stretch flex-shrink-0">
          <ProfileDropdown
            user_profile_url={user_profile_url}
            avatar_url={avatar_url}
            name={name}
            username={username}
            email={email}
            id={id}
            is_pro={is_pro}
            isDropdownOpened={isProfileDropdownOpened}
            toggleHandler={profileDropdownToggleHandler}
            mouseOverHandler={mouseOverHandler}
            mouseLeaveHandler={mouseLeaveHandler}
          />
        </div>
      ) : null}
    </div>
  )
}

const MobileMenu = ({
  user_profile_url,
  path,
  id,
  learnToCodeClick,
  is_pro,
  avatar_url,
  mobileMenuOpened,
  navigationLinks,
  browseLinks,
}) => {
  if (!mobileMenuOpened) {
    return null
  }
  return (
    <div className={css.mobileMenu}>
      <div className={css.mobileMenuBody}>
        <NavigationDropdown
          path={path}
          learnToCodeClick={learnToCodeClick}
          navigationLinks={navigationLinks}
          browseLinks={browseLinks}
          isDropdownOpened={true}
        />
        {id ? (
          <ExternalTrackingLink
            href={user_profile_url}
            track="clicked view profile"
            className={css.mobileMenuProfileLink}
          >
            <img src={avatar_url} alt="" className={css.mobileMenuUserAvatar} />
            View Profile
          </ExternalTrackingLink>
        ) : null}
      </div>
      <div className={css.mobileMenuFooter}>
        <div className={css.mobileMenuSignLinksHolder}>
          {id ? null : (
            <ExternalTrackingLink
              href="/users/sign_in"
              className={css.mobileMenuFooterLink}
              track="clicked header login"
              trackParams={{
                location: path,
              }}
            >
              Sign in
            </ExternalTrackingLink>
          )}
          {!is_pro ? <GoProButton location={path} /> : null}
        </div>
        <div>
          {id ? (
            <ExternalTrackingLink
              href="/users/sign_out"
              data-method="delete"
              track="clicked sign out"
              className={css.mobileMenuFooterLink}
            >
              Log out
            </ExternalTrackingLink>
          ) : (
            <Button
              color="orange"
              secondaryColor="white"
              outline
              size="medium"
              targetUrl="/users/sign_up"
              trackParams={{
                location: path,
              }}
              trackEventName="clicked header signup"
            >
              Sign Up Free
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}

const MobileMenuIcon = ({handler, mobileMenuOpened}) => {
  const openedClass = mobileMenuOpened ? css.mobileMenuTriggerOpened : ''
  return (
    <div
      className={`${css.mobileMenuTrigger} ${openedClass}`}
      onClick={handler}
    >
      <div className={css.mobileMenuTriggerInner} />
    </div>
  )
}

@inject('currentUserStore')
@observer
class Header extends React.Component {
  static propTypes = {
    path: PropTypes.string,
    name: PropTypes.string,
    username: PropTypes.string,
    email: PropTypes.string,
    id: PropTypes.number,
    is_pro: PropTypes.bool,
  }

  constructor(props) {
    super(props)
    this.state = {
      headerIsHidden: false,
      currentScrollTop: 0,
      isNavigationDropdownOpened: false,
      isProfileDropdownOpened: false,
      mobileMenuOpened: false,
      isMobileViewport: false,
      isInBrowseSection: false,
    }
  }

  isTouchDevice = () =>
    'ontouchstart' in window ||
    navigator.MaxTouchPoints > 0 ||
    navigator.msMaxTouchPoints > 0

  handleWidthChange = () => {
    if (window.innerWidth > maxMobileViewportWidth) {
      this.setState({
        mobileMenuOpened: false,
        isMobileViewport: false,
      })
    } else {
      this.setState({
        isMobileViewport: true,
      })
    }
  }

  handleScrollBehavior = () => {
    if (
      window.pageYOffset > headerHideOffset &&
      window.pageYOffset > this.state.currentScrollTop
    ) {
      this.setState({
        headerIsHidden: true,
        currentScrollTop: window.pageYOffset,
      })
    } else if (
      window.pageYOffset < this.state.currentScrollTop - 40 ||
      window.pageYOffset === 0
    ) {
      this.setState({
        headerIsHidden: false,
        currentScrollTop: window.pageYOffset,
      })
    }
  }

  navigationOnClick = () => {
    window.location.href = '/browse'
  }

  navigationDropdownClickOutsideHandler = () => {
    this.setState({isNavigationDropdownOpened: false})
  }

  profileDropdownToggleHandler = () => {
    this.setState({
      isProfileDropdownOpened: !this.state.isProfileDropdownOpened,
    })
  }

  profileDropdownOpenHandler = () => {
    if (!this.isTouchDevice()) {
      this.setState({isProfileDropdownOpened: true})
    }
  }

  profileDropdownCloseHandler = () => {
    if (!this.isTouchDevice()) {
      this.setState({isProfileDropdownOpened: false})
    }
  }

  profileDropdownClickOutsideHandler = () => {
    this.setState({isProfileDropdownOpened: false})
  }

  mobileMenuToggleHandler = () => {
    if (this.state.mobileMenuOpened) {
      document.documentElement.classList.remove(`${css.bodyOverflowHidden}`)
      document.body.classList.remove(`${css.bodyOverflowHidden}`)
    } else {
      document.documentElement.classList.add(`${css.bodyOverflowHidden}`)
      document.body.classList.add(`${css.bodyOverflowHidden}`)
    }
    this.setState({mobileMenuOpened: !this.state.mobileMenuOpened})
  }

  componentDidMount = () => {
    this.handleWidthChange()
    window.addEventListener('resize', throttle(this.handleWidthChange, 200))
    window.addEventListener('scroll', throttle(this.handleScrollBehavior, 200))
    this.isTouchDevice()

    if (window.location.href.indexOf('/browse') !== -1) {
      this.setState({
        isInBrowseSection: true,
      })
    } else {
      this.setState({
        isInBrowseSection: false,
      })
    }
  }

  render() {
    const currentUser = get(
      this.props,
      'currentUserStore.currentUser',
      this.props.current_user,
    )
    const {
      user_profile_url,
      path,
      name,
      username,
      email,
      id,
      is_pro,
      avatar_url = 'http://placehold.it/150x150',
    } =
      currentUser || {}

    const {
      isNavigationDropdownOpened,
      isProfileDropdownOpened,
      mobileMenuOpened,
      headerIsHidden,
      isMobileViewport,
    } = this.state
    const headerDefaultClasses = css.header
    const headerExpandedClasses = mobileMenuOpened ? css.expanded : ''
    const headerIsHiddenClasses = headerIsHidden ? css.hidden : ''
    const headerClasses = `
      ${headerDefaultClasses}
      ${headerExpandedClasses}
      ${headerIsHiddenClasses}
    `
    const navigationDropdownLinks =
      path === '/review' ? reviewLinks : navigationLinks
    const browseDropdownLinks = browseLinks

    return (
      <div>
        <header className={headerClasses} id="eh_header">
          <div className={css.headerContentWrapper}>
            <div className={css.headerContentContainer}>
              <div className={css.headerContentInner}>
                <div className="flex items-center">
                  <LogoLink isMobileViewport={isMobileViewport} />
                  <Maybe condition={!isMobileViewport}>
                    <WatchClickOutside
                      onClickOutside={
                        this.navigationDropdownClickOutsideHandler
                      }
                    >
                      <NavigationDropdown
                        disabled={this.state.isInBrowseSection}
                        path={path}
                        navigationLinks={navigationDropdownLinks}
                        browseLinks={browseDropdownLinks}
                        isDropdownOpened={isNavigationDropdownOpened}
                        learnToCodeClick={this.navigationOnClick}
                      />
                    </WatchClickOutside>
                  </Maybe>
                  <HeaderLinks path={path} links={headerLinks} />
                </div>
                <WatchClickOutside
                  onClickOutside={this.profileDropdownClickOutsideHandler}
                >
                  <ProfileHeaderItems
                    {...currentUser}
                    isProfileDropdownOpened={isProfileDropdownOpened}
                    profileDropdownToggleHandler={
                      this.profileDropdownToggleHandler
                    }
                    mouseOverHandler={this.profileDropdownOpenHandler}
                    mouseLeaveHandler={this.profileDropdownCloseHandler}
                  />
                </WatchClickOutside>
                <MobileMenuIcon
                  handler={this.mobileMenuToggleHandler}
                  mobileMenuOpened={mobileMenuOpened}
                />
              </div>
            </div>
          </div>
          <MobileMenu
            {...currentUser}
            mobileMenuOpened={mobileMenuOpened}
            path={path}
            learnToCodeClick={this.navigationOnClick}
            navigationLinks={navigationDropdownLinks}
            browseLinks={browseDropdownLinks}
          />
        </header>
        <div className={css.headerCompensator} />
      </div>
    )
  }
}

export default Header
