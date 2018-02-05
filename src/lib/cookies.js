import cookies from 'browser-cookies'
import {isString} from 'lodash'

const cookieUtil = {
  set(name, value) {
    const use_secure_cookie = location.protocol === 'https:'
    cookies.set(name, isString(value) ? value : JSON.stringify(value), {
      secure: use_secure_cookie,
      path: '/',
      expires: 365,
    })
    return cookies.get(name)
  },
  get(name) {
    const value = cookies.get(name)
    try {
      return JSON.parse(value)
    } catch (e) {
      return cookies.get(value)
    }
  },
}

export default cookieUtil
