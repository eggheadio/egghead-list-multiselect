import axios from 'axios'

const http = axios.create()

export const postItem = url => {
  return http
    .request({
      url,
      method: 'post',
    })
    .then(() => window.location.reload())
    .catch(err => console.error('Error:', err))
}
