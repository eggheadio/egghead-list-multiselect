import React, {Component} from 'react'
import axios from 'axios'
import Error from 'components/Error'
import Loading from 'components/Loading'

const http = axios.create()

class RequestBase extends Component {
  state = {
    running: !this.props.lazy,
    response: null,
    data: null,
    error: null,
    subscription: null,
  }

  componentDidMount() {
    const {lazy, subscribe, subscribeInterval} = this.props
    if (!lazy) {
      this.request()
      if (subscribe) {
        this.setState({
          subscription: setInterval(() => {
            const {running} = this.state
            if (!running) {
              this.request()
            }
          }, subscribeInterval),
        })
      }
    }
  }

  componentWillReceiveProps(nextProps) {
    const {url} = this.props

    if (url !== nextProps.url && nextProps.url) {
      this.request(nextProps.body, nextProps)
    }
  }

  componentWillUnmount() {
    this.willUnmount = true
    const {subscription} = this.state
    clearInterval(subscription)
  }

  request = (body = this.props.body, props = this.props) => {
    const {response, data} = this.state

    const {method, url, params, headers, onResponse, onData, onError} = props

    this.setState(
      {
        running: true,
        request: true,
      },
      () => {
        http
          .request({
            method: method,
            url: url,
            params: params,
            headers: headers,
            data: body,
          })
          .then(response => {
            if (this.willUnmount) {
              return
            }
            this.setState(
              {
                running: false,
                response,
                data: response.data,
                error: null,
              },
              () => {
                if (onResponse) {
                  onResponse(null, response)
                }
                if (onData) {
                  onData(data)
                }
              },
            )
          })
          .catch(error => {
            if (this.willUnmount) {
              return
            }
            this.setState(
              {
                running: false,
                response: error,
                error,
              },
              () => {
                if (onResponse) {
                  onResponse(response)
                }
                if (onError) {
                  onError(error)
                }
              },
            )
          })
      },
    )
  }

  render() {
    const {children, lazy, placeholder, showLoadingBetweenRequests} = this.props
    const {running, error, data, response} = this.state
    if (!children) {
      return null
    }
    if (
      (running && showLoadingBetweenRequests) ||
      (running && (lazy || !data))
    ) {
      return placeholder ? placeholder : <Loading />
    }
    if (error) {
      return <Error>{`Error: ${error.message}`}</Error>
    }
    return (
      children({
        request: this.request,
        running,
        error,
        data,
        response,
      }) || null
    )
  }
}

export default RequestBase
