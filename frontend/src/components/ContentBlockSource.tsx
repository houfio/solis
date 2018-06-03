import { css, StyleSheet } from 'aphrodite/no-important';
import * as React from 'react';
import { ConnectDragSource, DragSource } from 'react-dnd';

import { BLOCK_RENDERERS, GRAY, PHONE, WHITE } from '../constants';
import { findByKey } from '../utils/findByKey';
import { Heading } from './Heading';

type Props = {
  type: string,
  data: any
};

type Context = {
  connectDragSource?: ConnectDragSource,
  isDragging?: boolean
};

export const ContentBlockSource = DragSource(
  'content',
  {
    beginDrag: () => {
      return {};
    }
  },
  (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  })
)(({ type, data, connectDragSource, isDragging }: Props & Context) => {
    const styleSheet = StyleSheet.create({
      block: {
        position: 'relative',
        padding: '1rem',
        marginBottom: '2rem',
        borderRadius: '.5rem',
        border: `1px solid ${GRAY}`,
        backgroundColor: WHITE,
        cursor: 'move',
        opacity: isDragging ? .5 : 1,
        transition: 'opacity .2s ease'
      }
    });

    const renderer = findByKey(type, BLOCK_RENDERERS);

    return connectDragSource && connectDragSource(
      <div className={css(styleSheet.block)}>
        <Heading text={type} breakpoints={{ [ PHONE ]: 'thin' }}/>
        {renderer({ data } as any)}
      </div>
    );
  }
);
