import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { css, StyleSheet } from 'aphrodite/no-important';
import * as React from 'react';
import { Component } from 'react';
import { ConnectDropTarget, DropTarget } from 'react-dnd';

import { content } from '../modules/content';
import { withProps } from '../utils/withProps';

type Props = {
  page: number,
  order?: number,
  parent?: number,
  parentData?: number
};

type Context = {
  connectDropTarget: ConnectDropTarget,
  isOver: boolean
};

const getActionCreators = () => ({
  setContentBlock: content.setContentBlock
});

const { props, connect } = withProps<Props, Context>()(undefined, getActionCreators);

export const DropZone = connect(DropTarget<typeof props>(
  'content',
  {
    drop: (props, monitor) => {
      const { page, order, parent, parentData } = props;
      const { setContentBlock } = props;

      if (monitor) {
        const { type, data } = monitor.getItem() as any;

        setContentBlock({ blockType: type, data, page, order, parent, parentData });
      }
    }
  },
  (connect, monitor) => ({
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver()
  })
)(class extends Component<typeof props> {
  public render() {
    const { connectDropTarget, isOver } = this.props;

    const styleSheet = StyleSheet.create({
      zone: {
        display: 'flex',
        justifyContent: 'center',
        padding: '1rem',
        margin: '.5rem',
        borderRadius: '.5rem',
        color: '#fff',
        backgroundColor: isOver ? '#1976d2' : '#414756',
        transition: 'all .2s ease'
      }
    });

    return connectDropTarget(
      <div className={css(styleSheet.zone)}>
        <FontAwesomeIcon icon="arrows-alt" size="lg"/>
      </div>
    );
  }
}) as any);
