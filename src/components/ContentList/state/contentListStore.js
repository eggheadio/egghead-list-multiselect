import {observable, action, toJS, computed} from 'mobx'
import {map} from 'lodash'
import axios from 'axios'
import {findIndex, debounce, each} from 'lodash'
import convertToItem from 'lib/convertToItem'

const http = axios.create()

export default class ContactListStore {
  @observable items
  @observable tagDrawerOpen = false

  constructor(items = []) {
    this.setItems(items)
  }

  @computed
  get contentItems() {
    return map(this.items, convertToItem)
  }

  @action
  updateLessons = debounce(lessons => {
    each(lessons, (item, index) => {
      http.request({
        method: 'put',
        url: item.update_lesson_url,
        data: {
          lesson: {
            series_row_order_position: index,
          },
        },
      })
    })
  }, 750)

  @action
  toggleTagDrawer = () => {
    this.tagDrawerOpen = !this.tagDrawerOpen
  }

  @action
  loadItems = url => {
    return http.get(url).then(({data}) => {
      this.items = data
      return this.items
    })
  }

  @action
  setItems = items => {
    this.items = items || []
  }

  @action
  saveItem = (patch, url) =>
    http
      .request({
        method: 'put',
        url: url,
        data: patch,
      })
      .then(({data}) => data)

  @action
  updateItem = newItem => {
    const items = toJS(this.items)
    const index = findIndex(items, {slug: newItem.slug})

    if (index > -1) {
      this.setItems(
        map(items, item => (newItem.slug !== item.slug ? item : newItem)),
      )
    }
  }
}
