import { css, StyleSheet } from 'aphrodite/no-important';
import * as React from 'react';
import { ConnectDropTarget, DropTarget } from 'react-dnd';

import { PURPLE, PURPLE_ACCENT, WHITE } from '../constants';

type Props = {
  pageId: string,
  order?: number,
  parentId?: string,
  parentData?: number
};

type Context = {
  connectDropTarget?: ConnectDropTarget,
  isOver?: boolean
};

export const ContentBlockTarget = DropTarget(
  'content',
  {
    /*drop: (props: Props, monitor) => {
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
)(({ connectDropTarget, isOver }: Props & Context) => {
  const styleSheet = StyleSheet.create({
    zone: {
      display: 'flex',
      justifyContent: 'center',
      color: WHITE,
      padding: '1rem',
      borderRadius: '.5rem',
      background: `linear-gradient(145deg, ${PURPLE} 0%, ${PURPLE_ACCENT} 100%)`,
      opacity: isOver ? .8 : 1,
      transition: 'opacity .2s ease'
    }
  });

  return connectDropTarget && connectDropTarget(
    <div className={css(styleSheet.zone)}>
      drop
    </div>
  );
});
