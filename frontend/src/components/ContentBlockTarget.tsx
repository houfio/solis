import { faArrowsAlt } from '@fortawesome/fontawesome-free-solid/faArrowsAlt';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { css, StyleSheet } from 'aphrodite/no-important';
import * as React from 'react';
import { Mutation, MutationFn } from 'react-apollo';
import { ConnectDropTarget, DropTarget } from 'react-dnd';

import { GRAY, PURPLE } from '../constants';
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
      padding: '1rem',
      borderRadius: '.5rem',
      border: `1px solid ${isOver ? PURPLE : GRAY}`,
      color: isOver ? PURPLE : GRAY,
      transition: 'all .2s ease',
      margin: '1rem 0'
    }
  });

  return connectDropTarget && connectDropTarget(
    <div className={css(styleSheet.zone)}>
      <FontAwesomeIcon icon={faArrowsAlt}/>
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
