import React from 'react'
import Icon from 'components/Icon'
export default {
  proposed: {
    label: 'Proposed',
    description: 'Waiting for review to be accepted.',
    color: 'blue',
    icon: <Icon type="timer-plus" color="blue" size="3" />,
  },
  cancelled: {
    label: 'Cancelled',
    description: 'The lesson has been cancelled.',
    color: 'red',
    icon: <Icon type="cancel" color="red" size="3" />,
  },
  accepted: {
    label: 'Accepted',
    description: 'If you want to create this lesson, please CLAIM it.',
    color: 'blue',
    icon: <span className="f3">&#128074;</span>,
  },
  requested: {
    label: 'Requested',
    description: "This lesson can be claimed if you'd like to create it.",
    color: 'white',
    icon: <span className="f3">&#128073;</span>,
  },
  claimed: {
    label: 'Claimed',
    description: 'Please upload a video for your lesson.',
    color: 'yellow',
    icon: <span className="f3">&#128170;</span>,
  },
  submitted: {
    label: 'Submitted',
    description: 'REVIEW: This lesson is waiting for a review.',
    color: 'black',
    icon: <span className="f3">&#128079;</span>,
  },
  rejected: {
    label: 'Changes Needed',
    description:
      'TODO: Changes have been requested. Please update the lesson video.',
    title: 'Changes Needed',
    color: 'red',
    icon: <span className="f3">&#128078;</span>,
  },
  updated: {
    label: 'Updated',
    description: 'REVIEW: Requested changes have been made.',
    color: 'yellow',
    icon: <Icon type="refresh" color="yellow" size="3" />,
  },
  approved: {
    label: 'Approved',
    description: 'This lesson has been approved for publication.',
    color: 'green',
    icon: <span className="f3">&#128077;</span>,
  },
  flagged: {
    label: 'Flagged',
    description: `FLAGGED: This lesson has problems that need to be corrected.`,
    color: 'red',
    icon: <Icon type="flag" color="red" size="3" />,
  },
  revised: {
    label: 'Revised',
    description: `This lesson has been revised and is no longer flagged.`,
    color: 'green',
    icon: <Icon type="revise" color="green" size="3" />,
  },
  published: {
    label: 'Published',
    description: `This lesson is published.`,
    color: 'green',
    icon: <span className="f3">&#128077;</span>,
  },
  retired: {
    label: 'Retired',
    description: `This lesson has been retired.`,
    color: 'black-20',
    icon: <Icon type="exclamation-triangle" color="black" size="3" />,
  },
}
