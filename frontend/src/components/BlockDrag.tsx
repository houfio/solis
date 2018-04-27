import { css, StyleSheet } from 'aphrodite/no-important';
import * as React from 'react';
import { ComponentClass } from 'react';
import { ConnectDragSource, DragSource } from 'react-dnd';

import { ContentBlockTypes } from '../api/ContentBlock';
import { BLOCK_RENDERERS, PHONE } from '../constants';
import { findByKey } from '../utils/findByKey';
import { Heading } from './Heading';

type Props<T extends keyof ContentBlockTypes = any> = {
  type: T,
  data: ContentBlockTypes[T]
};

type Context = {
  connectDragSource: ConnectDragSource,
  isDragging: boolean
};

export const BlockDrag = DragSource<Props & Context>(
  'content',
  {
    beginDrag: (props) => ({
      type: props.type,
      data: props.data
    })
  },
  (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  })
)(({ type, data, connectDragSource, isDragging }) => {
  const styleSheet = StyleSheet.create({
    block: {
      padding: '1rem',
      margin: '.5rem',
      borderRadius: '.5rem',
      backgroundColor: '#fff',
      cursor: 'move',
      opacity: isDragging ? .5 : 1,
      transition: 'opacity .2s ease'
    }
  });

  const renderer = findByKey(type, BLOCK_RENDERERS);

  return connectDragSource(
    <div className={css(styleSheet.block)}>
      <Heading text={type} breakpoints={{ [PHONE]: 'thin' }}/>
      {renderer({
        children: [],
        data
      })}
    </div>
  );
}) as any as ComponentClass<Props>;
