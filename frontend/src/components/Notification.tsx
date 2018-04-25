import { css, CSSProperties, StyleSheet } from 'aphrodite/no-important';
import * as React from 'react';
import { Component } from 'react';

import { content } from '../modules/content';
import { ColorType, Notification as NotificationType } from '../types';
import { handle } from '../utils/handle';
import { withProps } from '../utils/withProps';

type Props = {
  notification: NotificationType,
  index: number
};

const getActionCreators = () => ({
  removeNotification: content.removeNotification,
  dismissNotification: content.dismissNotification
});

const { props, connect } = withProps<Props>()(undefined, getActionCreators);

const notificationStyles: { [T in ColorType]: CSSProperties } = {
  primary: {
    color: '#fff',
    background: 'linear-gradient(145deg, #1976d2 0%, #12589d 100%)'
  },
  secondary: {
    color: '#fff',
    background: 'linear-gradient(145deg, #414756 0%, #303540 100%)'
  },
  tertiary: {
    color: '#303540',
    background: 'linear-gradient(145deg, #fff 0%, #eee 100%)'
  }
};

export const Notification = connect(class extends Component<typeof props> {
  private timeoutId?: number;

  public componentDidMount() {
    const { index } = this.props;

    if (index === 0) {
      this.createDismissTimer();
    }
  }

  public componentWillReceiveProps(nextProps: typeof props) {
    const { notification: nextNotification, index: nextIndex } = nextProps;
    const { notification, index } = this.props;
    const { removeNotification } = this.props;

    if (notification.dismissed !== nextNotification.dismissed && nextNotification.dismissed) {
      if (this.timeoutId) {
        clearTimeout(this.timeoutId);
      }

      setTimeout(handle(removeNotification, { notificationId: notification.id }), 200);
    } else if (index !== nextIndex && nextIndex === 0) {
      this.createDismissTimer();
    }
  }

  public render() {
    const { notification, index } = this.props;
    const { dismissNotification } = this.props;

    const slideIn = {
      '0%': {
        right: 0,
        opacity: 0
      },
      '100%': {
        right: '1rem',
        opacity: 1
      }
    };

    const slideOut = {
      '0%': {
        right: '1rem',
        opacity: 1
      },
      '100%': {
        right: 0,
        opacity: 0
      }
    };

    const styleSheet = StyleSheet.create({
      notification: {
        position: 'fixed',
        padding: '1rem',
        borderRadius: '.5rem',
        bottom: `${index * 4 + 1}rem`,
        right: '1rem',
        cursor: 'pointer',
        animationName: slideIn as any,
        animationDuration: '.2s',
        boxShadow: '0 0 1rem 0 rgba(0, 0, 0, .5)',
        transition: `bottom .2s ease ${.2 + index * .05}s`,
        zIndex: 100,
        ...notificationStyles[notification.color || 'primary']
      },
      dismissed: {
        animationName: slideOut as any
      }
    });

    return (
      <div
        className={css(styleSheet.notification, notification.dismissed && styleSheet.dismissed)}
        onClick={handle(dismissNotification, { notificationId: notification.id })}
      >
        {notification.text}
      </div>
    );
  }

  private createDismissTimer = () => {
    const { notification, dismissNotification } = this.props;

    this.timeoutId = setTimeout(
      handle(dismissNotification, { notificationId: notification.id }),
      notification.timeout
    ) as any;
  }
});
