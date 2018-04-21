import { css, StyleSheet } from 'aphrodite/no-important';
import * as React from 'react';
import { Component } from 'react';

import { State } from '../types';
import { withProps } from '../utils/withProps';

type LocalState = {
  progress: number,
  working: boolean
};

const mapStateToProps = (state: State) => ({
  queue: state.http
});

const { props, connect } = withProps()(mapStateToProps);

export const Progress = connect(class extends Component<typeof props, LocalState> {
  public state = {
    progress: 0,
    working: false
  };

  private intervalId?: number;

  public componentDidMount() {
    this.intervalId = setInterval(this.incrementProgress, 100) as any;
  }

  public componentWillReceiveProps(nextProps: typeof props) {
    const { queue } = this.props;
    const { queue: nextQueue } = nextProps;

    if (queue.page !== nextQueue.page) {
      if (!nextQueue.page) {
        this.setState({
          progress: 100,
          working: false
        });
      } else if (!queue.page) {
        this.setState({
          progress: 0,
          working: true
        });
      }
    }
  }

  public componentWillUnmount() {
    clearInterval(this.intervalId);
  }

  public render() {
    const { progress, working } = this.state;

    const styleSheet = StyleSheet.create({
      progress: {
        position: 'fixed',
        height: '4px',
        width: '100%',
        backgroundColor: '#fff',
        zIndex: 3,
        opacity: 0,
        transition: 'opacity .2s ease .2s, transform .2s ease',
        transformOrigin: '0%'
      },
      working: {
        opacity: 1
      }
    });

    return (
      <div
        style={{
          transform: `scaleX(${progress / 100})`
        }}
        className={css(
          styleSheet.progress,
          working && styleSheet.working
        )}
      />
    );
  }

  private incrementProgress = () => {
    const { progress, working } = this.state;

    if (working) {
      this.setState({
        progress: Math.min(progress + Math.random() * 4, 90)
      });
    }
  }
});
