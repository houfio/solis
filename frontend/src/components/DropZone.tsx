import { faArrowsAlt } from '@fortawesome/fontawesome-free-solid/faArrowsAlt';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { css, StyleSheet } from 'aphrodite/no-important';
import * as React from 'react';
import { Component } from 'react';
import { ConnectDropTarget, DropTarget } from 'react-dnd';

import { BLUE, DARK_GRAY, WHITE } from '../constants';

type Props = {
  pageId: string,
  order?: number,
  parentId?: string,
  parentData?: number
};

type Context = {
  connectDropTarget: ConnectDropTarget,
  isOver: boolean
};

export const DropZone = DropTarget<Props>(
  'content',
  {
    /*drop: (props, monitor) => {
      const { pageId, order, parentId, parentData } = props;

      if (monitor) {
        const { type, data } = monitor.getItem() as any;

        setContentBlock({ blockType: type, data, pageId, order, parentId, parentData });
      }
    }*/
  },
  (connect, monitor) => ({
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver()
  })
)(class extends Component<Props & Context> {
  public render() {
    const { connectDropTarget, isOver } = this.props;

    const styleSheet = StyleSheet.create({
      zone: {
        display: 'flex',
        justifyContent: 'center',
        padding: '1rem',
        margin: '.5rem',
        borderRadius: '.5rem',
        color: WHITE,
        backgroundColor: isOver ? BLUE : DARK_GRAY,
        transition: 'all .2s ease'
      }
    });

    return connectDropTarget(
      <div className={css(styleSheet.zone)}>
        <FontAwesomeIcon icon={faArrowsAlt} size="lg"/>
      </div>
    );
  }
} as any);
