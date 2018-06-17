import { css, StyleSheet } from 'aphrodite/no-important';
import * as React from 'react';
import { Mutation, MutationFn } from 'react-apollo';
import { ConnectDropTarget, DropTarget } from 'react-dnd';

import { PURPLE, PURPLE_ACCENT, WHITE } from '../constants';
import { BlockTargetMutation, BlockTargetMutationVariables } from '../schema/__generated__/BlockTargetMutation';

import mutation from '../schema/blockTarget.graphql';

type Props = {
  pageId: string,
  order?: number,
  parentId?: string,
  parentData?: number
};

type Context = {
  connectDropTarget?: ConnectDropTarget,
  isOver?: boolean,
  mutate?: MutationFn<BlockTargetMutation, BlockTargetMutationVariables>
};

const Component = DropTarget(
  'content',
  {
    drop: (props: Props & Context, monitor) => {
      const { pageId, order, parentId, parentData } = props;

      if (monitor) {
        const { type, data } = monitor.getItem();

        props.mutate!({
          variables: {
            id: pageId,
            type,
            parent: parentId,
            parentData,
            order,
            data: JSON.stringify(data)
          }
        });
      }
    }
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

export const ContentBlockTarget = (props: Props) => (
  <Mutation<BlockTargetMutation, BlockTargetMutationVariables> mutation={mutation}>
    {(mutate) => (
      <Component {...props} mutate={mutate}/>
    )}
  </Mutation>
);
