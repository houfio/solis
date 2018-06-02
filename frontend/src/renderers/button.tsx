import * as React from 'react';

import { Button } from '../components/Button';
import { RouterConsumer } from '../context/router';
import { ContentPageQuery_page_blocks_data_Button } from '../schema/__generated__/ContentPageQuery';
import { RendererProps } from '../types';
import { createRenderer } from '../utils/createRenderer';

type Props = RendererProps<ContentPageQuery_page_blocks_data_Button>;

export const button = createRenderer(({ data: { text, type, target: { path } } }: Props) => (
  <RouterConsumer>
    {({ history: { push } }) => {
      const navigateTo = () => {
        push(path);
      };

      return (
        <Button
          text={text}
          type={type === 0 ? 'primary' : 'secondary'}
          onClick={navigateTo}
        />
      );
    }}
  </RouterConsumer>
));
