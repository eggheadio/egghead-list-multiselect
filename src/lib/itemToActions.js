import {keys, map, isObject, compact} from 'lodash'
import axios from 'axios'

const http = axios.create()

export default (item, updateContent) =>
  compact(
    map(keys(item), propKey => {
      const base = propKey.split('_')[0]
      const chooseExecute = action => {
        return action.external === true
          ? () => (window.location = item[propKey])
          : () => http.post(item[propKey]).then(({data}) => updateContent(data))
      }

      if (isObject(ACTION[base])) {
        return {
          ...ACTION[base],
          execute: chooseExecute(ACTION[base]),
          item,
        }
      }
    }),
  )

export const ACTION = {
  reject: {
    label: 'Request Changes',
    icon: 'comment-alert',
    color: 'yellow',
    confirmText: 'Are you sure you want to Ask For Changes?',
  },
  accept: {
    label: 'Accept',
    icon: 'accept',
    color: 'green',
  },
  approve: {
    label: 'Approve',
    icon: 'thumbs-up',
  },
  publish: {
    label: 'Publish',
    icon: 'check-circle',
    color: 'green',
    confirmText: 'Publish immediately?',
  },
  claim: {
    label: 'Claim',
    icon: 'check-circle',
    color: 'green',
    confirmText: 'Claim this lesson?',
  },
  flag: {
    label: 'Flag for Changes',
    icon: 'flag',
    color: 'yellow',
    confirmText: 'Does this lesson require changes from the instructor?',
  },
  retire: {
    label: 'Retire',
    icon: 'alert',
    color: 'black',
    confirmText: 'Should this lesson be retired and hidden from view?',
  },
  upload: {
    label: 'Upload Video',
    icon: 'upload-cloud',
    color: 'blue',
    external: true,
  },
  cancel: {
    label: 'Cancel',
    icon: 'cancel',
    color: 'red',
    confirmText: 'Should this lesson be completely cancelled?',
  },
  edit: {
    label: 'Edit',
    icon: 'edit',
    color: 'red',
    external: true,
  },
}
