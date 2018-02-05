import React, {Component} from 'react'
import {findDOMNode} from 'react-dom'
import {isFunction} from 'lodash'
import scrollIntoView from 'scroll-into-view'
import PropTypes from 'prop-types'

class ScrollView extends Component {
  static childContextTypes = {
    scroll: PropTypes.object,
  }

  elements = {}

  register = (name, ref) => {
    this.elements[name] = ref
  }

  unregister = name => {
    delete this.elements[name]
  }

  getChildContext() {
    return {
      scroll: {
        register: this.register,
        unregister: this.unregister,
      },
    }
  }

  scrollTo = name => {
    const node = findDOMNode(this.elements[name])
    scrollIntoView(node, {
      time: 50,
      validTarget: function(target, parentsScrolled) {
        try {
          return target.matches('.scroller')
        } catch (e) {
          return false
        }
      },
      align: {
        top: 0,
      },
    })
  }

  render() {
    return React.Children.only(this.props.children)
  }
}

class ScrollElement extends Component {
  static contextTypes = {
    scroll: PropTypes.object,
  }

  componentDidMount() {
    const {name, scroller, nowPlaying} = this.props
    this.context.scroll.register(this.props.name, this._element)
    if (nowPlaying) {
      scrollIntoView(this._element, {
        time: 50,
        validTarget: function(target, parentsScrolled) {
          return (
            parentsScrolled < 1 &&
            target !== window &&
            !target.matches('.lessonListHeader')
          )
        },
        align: {
          top: 0,
        },
      })
    }
  }

  componentWillUnmount() {
    this.context.scroll.unregister(this.props.name)
  }

  render() {
    return React.cloneElement(this.props.children, {
      ref: ref => (this._element = ref),
    })
  }
}

export {ScrollElement}

export default ScrollView
