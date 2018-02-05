import _ from 'lodash'

class TrackingUtil {
  static track(action, details, callback) {
    if (!_.isUndefined(window.track)) {
      window.track(action, details, callback)
    }
  }
}

export default TrackingUtil
