import Honeybadger from 'honeybadger-js'
import {isEmpty} from 'lodash'

export const initializeErrorTracking = user => {
  Honeybadger.configure({
    api_key: 'ab0e3d98',
    onerror: false,
  })

  window.onerror = (message, url, line, column, error) => {
    if (!isEmpty(user)) {
      Honeybadger.setContext({
        name: user.name,
        email: user.email,
        userId: user.id,
      })
    }

    Honeybadger.notify(
      error
        ? error
        : {
            name: message,
            message,
            stack: [
              message,
              '\n    at ? (',
              url || 'unknown',
              ':',
              line || 0,
              ':',
              column || 0,
              ')',
            ].join(''),
          },
    )
  }
}
