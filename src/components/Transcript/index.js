import React from 'react'
import {inject, observer} from 'mobx-react'
import {get} from 'lodash'
import css from './index.scss'
import Markdown from 'components/Markdown'
import Icon from 'components/Icon'
import Dots from 'components/Loading/Dots'
import downloadPDF from './logos/downloadPDF.png'
import enchancedTranscript from './logos/enchancedTranscript.png'
import axios from 'axios'

const http = axios.create()

@inject('currentUserStore')
@observer
class Transcript extends React.Component {
  state = {
    text: this.props.transcript,
    enhanced: false,
    isLoading: false,
  }

  static defaultProps = {
    transcript: '',
  }

  componentDidMount() {
    const {enhancedTranscriptUrl} = this.props
    if (enhancedTranscriptUrl) {
      this.setState({isLoading: true})

      http.get(enhancedTranscriptUrl).then(({data}) => {
        const {text, enhanced} = data
        this.setState({
          text,
          enhanced,
          isLoading: false,
        })
      })
    }
  }

  render() {
    const {currentUser} = this.props.currentUserStore
    const {enhanced, text, isLoading} = this.state
    const isUserPro = get(currentUser, 'is_pro')

    return (
      <div className="bg-white br2 mt2 overflow-hidden">
        {!isUserPro && enhanced && <SubscriptionSection />}
        {isLoading ? (
          <Dots />
        ) : (
          <div className={` black-90 pa3 pa4-ns br--bottom lh-copy ${css.box}`}>
            <Markdown>{text}</Markdown>
          </div>
        )}
      </div>
    )
  }
}

const SubscriptionSection = () => (
  <div className="bg-gray pa3 pa4-ns flex items-center">
    <img
      alt=""
      src={enchancedTranscript}
      className={`mr3 mr4-ns ${css.subscriptionSectionLogo}`}
    />
    <div className="flex">
      <div className="flex flex-column">
        <h4
          className={`dark-blue lh-title fw5 mt0 mb3 ${
            css.subscriptionSectionTitle
          }`}
        >
          Enhanced Transcript Available
        </h4>
        <a
          href="/pricing"
          className={`flex self-start link bg-green white fw6 br-pill bn lh-copy ttu pointer ${
            css.subscriptionSectionCTA
          }`}
        >
          Go Pro and get it
        </a>
      </div>
      <ul
        className={`list pa0 ma0 dark-gray ml4-m ml5-l dn db-ns ${
          css.subscriptionSectionList
        }`}
      >
        <li className="flex items-baseline">
          <div className="flex-shrink-0">
            <Icon type="check" color="green" size="5" />
          </div>
          <span className="ml2">Cut and Paste Code Examples</span>
        </li>
        {/* list item bellow is hidden while we have no Download PDF link */}
        <li className="flex items-baseline">
          <div className="flex-shrink-0">
            <Icon type="check" color="green" size="5" />
          </div>
          <span className="ml2">Enhanced your knowledge</span>
        </li>
        <li className="flex items-baseline">
          <div className="flex-shrink-0">
            <Icon type="check" color="green" size="5" />
          </div>
          <span className="ml2">Read the lesson to follow along</span>
        </li>
      </ul>
    </div>
  </div>
)

export default Transcript
