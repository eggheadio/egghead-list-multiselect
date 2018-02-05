import {isFunction, isUndefined} from 'lodash'
import axios from 'axios'

const http = axios.create()

export const fetchCurrentUserData = () => {
  return http.get('/current_user').then(({data}) => {
    return data
  })
}

export const track = (event, paramsOrCallback, callback) => {
  let wasCalled = false
  const params = isFunction(paramsOrCallback) ? {} : paramsOrCallback
  const timeout = 1250

  if (isUndefined(callback) && isFunction(paramsOrCallback)) {
    callback = paramsOrCallback
  }

  function politelyExit() {
    if (isFunction(callback) && !wasCalled) {
      wasCalled = true
      callback.apply(null, [event, wasCalled])
    }
  }

  setTimeout(politelyExit, timeout)

  return fetchCurrentUserData().then(currentUser => {
    const userParams = {...currentUser, ...params}

    if (window) {
      window._dcq = window._dcq || []

      if (window.mixpanel && window.mixpanel.track) {
        window.mixpanel.track(event, userParams)
      }

      if (window._dcq) {
        window._dcq.push(['track', event, userParams])
      }

      if (window.analytics && window.analytics.track) {
        window.analytics.track(event, userParams)
      }

      if (window.fbq) {
        window.fbq('trackCustom', event, userParams)
      }

      if (isFunction(callback) && !wasCalled) {
        wasCalled = true
        callback.apply(null, [event, currentUser])
      }

      return currentUser
    }
  })
}

export const alias = data => {
  if (window.mixpanel) {
    window.mixpanel.alias(data)
  }
}

export const identify = data => {
  return fetchCurrentUserData().then(currentUser => {
    const combinedData = {...currentUser, ...data}
    if (window && currentUser.id) {
      if (window.analytics) {
        // this is segment
        window.analytics.identify(currentUser.id, combinedData)
      }

      if (window.mixpanel) {
        window.mixpanel.identify(currentUser.email)
        window.mixpanel.people.set({
          ...combinedData,
          $first_name: currentUser.name,
          $created: currentUser.created_at,
          $email: currentUser.email,
        })
      }

      if (window._dcq) {
        window._dcq.push(['identify', combinedData])
      }
    } else if (window) {
      if (window.analytics) {
        window.analytics.identify()
      }
      if (window._dcq) {
        window._dcq.push(['identify', data])
      }
    }
    return currentUser
  })
}

export const tag = tag => {
  return fetchCurrentUserData().then(currentUser => {
    return identify({tags: [tag]})
  })
}

export default {
  track,
  tag,
  identify,
  alias,
}
