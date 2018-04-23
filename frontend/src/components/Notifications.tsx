import * as React from 'react';
import { Component } from 'react';

import { State } from '../types';
import { withProps } from '../utils/withProps';
import { Notification } from './Notification';

const mapStateToProps = (state: State) => ({
  notifications: state.content.notifications
});

const { props, connect } = withProps()(mapStateToProps);

export const Notifications = connect(class extends Component<typeof props> {
  public render() {
    const { notifications } = this.props;

    return notifications.map((notification, index) => (
      <Notification key={notification.id} notification={notification} index={index}/>
    ));
  }
});
