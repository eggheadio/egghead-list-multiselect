import React from 'react'
import Footer from 'components/Footer'
import Header from 'components/Header'
import {inject, observer} from 'mobx-react'
import InPageCallout from '../InPageCallout/index'
import eggo from './eggo.svg'

const PageNavigation = ({children, currentUserStore, notificationStore}) => (
  <div>
    <div className="bg-base-secondary">
      <section className="mw9 center">
        <Header current_user={currentUserStore.currentUser} />
      </section>
    </div>
    {notificationStore.hasNotifications &&
      notificationStore.activeNotifications.map(notification => {
        const {name, message} = notification
        return (
          <div className="pa2 bg-base-secondary">
            <InPageCallout
              onDismiss={() =>
                notificationStore.removeNotification(notification)
              }
              text={message}
              logoUrl={eggo}
              size="large"
              background={'dark'}
              buttonType="navigation"
            />
          </div>
        )
      })}
    {children}
    <div className="bg-base-secondary">
      <section className="mw9 center">
        <Footer current_user={currentUserStore.currentUser} />
      </section>
    </div>
  </div>
)

export default inject('currentUserStore', 'notificationStore')(
  observer(PageNavigation),
)
