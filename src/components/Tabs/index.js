import React from 'react'
import PropTypes from 'prop-types'
import {Tab, Tabs, TabList, TabPanel, resetIdCounter} from 'react-tabs'
import {map, isEqual} from 'lodash'
import css from './index.scss'

resetIdCounter()

class TabsComponent extends React.Component {
  state = {
    selected: 0,
  }

  allTabPropsChanged = (groups, nextGroups) =>
    groups.reduce(
      (acc, group, index) => !isEqual(group, nextGroups[index]) && acc,
      true,
    )

  componentWillReceiveProps(nextProps) {
    const {groups} = this.props
    const nextGroups = nextProps.groups
    if (this.allTabPropsChanged(groups, nextGroups)) {
      this.setState({selected: 0})
    }
  }

  handleSelect = index =>
    this.setState({
      selected: index,
    })

  render() {
    const {groups, labelClasses} = this.props

    return (
      <Tabs onSelect={this.handleSelect} selectedIndex={this.state.selected}>
        <TabList
          className={`list
                     pa0
                     ma0
                     flex
                     items-center
                     bb
                     b--white-30
                     ${labelClasses}`}
        >
          {map(groups, (group, index) => (
            <Tab
              key={index}
              className={`
                pv3 ph4-ns
                flex-grow-1
                flex-grow-0-ns
                flex-wrap-ns
                tc
                ttu
                pointer
                b
                bb
                relative
                ${
                  this.state.selected === index
                    ? 'b--orange white'
                    : 'b--transparent dark-gray-secondary white-60'
                }
                ${css.tab}
              `}
            >
              {group.title}
            </Tab>
          ))}
        </TabList>

        {map(groups, (group, index) => (
          <TabPanel key={index}>{group.component}</TabPanel>
        ))}
      </Tabs>
    )
  }
}

TabsComponent.propTypes = {
  groups: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
      component: PropTypes.node.isRequired,
    }),
  ).isRequired,
}

export default TabsComponent
