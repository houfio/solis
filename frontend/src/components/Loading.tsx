import * as React from 'react';
import { css, StyleSheet } from 'aphrodite/no-important';
import { Component } from 'react';

type Props = {
  message: string,
  delay?: number
}

type LocalState = {
  showMessage: boolean
}

export class Loading extends Component<Props, LocalState> {
  public state = {
    showMessage: false
  };

  private timeoutId: number = 0;

  public componentDidMount() {
    const { delay = 5000 } = this.props;

    this.timeoutId = setTimeout(
      () => this.setState({
        showMessage: true
      }),
      delay
    ) as any;
  }

  public componentWillUnmount() {
    clearTimeout(this.timeoutId);
  }

  public render() {
    const { message } = this.props;
    const { showMessage } = this.state;

    const rotate = {
      from: {
        transform: 'rotate(0)'
      },
      to: {
        transform: 'rotate(360deg)'
      }
    };

    const styleSheet = StyleSheet.create({
      wrapper: {
        display: 'flex',
        height: '100vh',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column'
      },
      loader: {
        width: '1rem',
        height: '1rem',
        border: '.25rem solid #BDC1C6',
        borderLeft: '.25rem solid #1976D2',
        borderRadius: '50%',
        animationName: rotate,
        animationTimingFunction: 'linear',
        animationDuration: '.5s',
        animationIterationCount: 'infinite'
      },
      text: {
        marginTop: '1rem',
        visibility: 'hidden',
        opacity: 0,
        textAlign: 'center',
        transition: 'opacity .2s ease'
      },
      textShown: {
        visibility: 'visible',
        opacity: 1
      }
    });

    return (
      <div className={css(styleSheet.wrapper)}>
        <div className={css(styleSheet.loader)}/>
        <span
          className={css(
            styleSheet.text,
            showMessage && styleSheet.textShown
          )}
        >
          {message}
        </span>
      </div>
    );
  }
}
