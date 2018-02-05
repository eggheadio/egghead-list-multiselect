import moment from 'moment'

export function timeFromNow(start) {
  return moment(start).fromNow()
}
