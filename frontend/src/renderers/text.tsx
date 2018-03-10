import * as React from 'react';
import { Component } from 'react';
import * as ReactMarkdown from 'react-markdown';

import { createRenderer } from '../utils/createRenderer';
import { RendererProps } from '../types';
import { Heading } from '../components/Heading';
import { PHONE } from '../constants';

export const text = createRenderer(class extends Component<RendererProps<'text'>> {
  public render() {
    const { data: { text } } = this.props;

    return (
      <ReactMarkdown
        source={text}
        allowedTypes={[
          'root',
          'paragraph',
          'strong',
          'link',
          'image',
          'list',
          'listItem',
          'heading'
        ]}
        renderers={{
          heading: ({ children, level }) => {
            const type = level === 1 ? 'bold' : level === 2 ? 'thin' : 'subtle';

            return (
              <Heading text={children} breakpoints={{ [PHONE]: type }}/>
            );
          }
        }}
      />
    );
  }
});
