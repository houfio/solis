import { css, StyleSheet } from 'aphrodite/no-important';
import * as React from 'react';
import { Component } from 'react';
import * as ReactMarkdown from 'react-markdown';

import { Heading } from '../components/Heading';
import { PHONE } from '../constants';
import { RendererProps } from '../types';
import { createRenderer } from '../utils/createRenderer';

export const text = createRenderer(class extends Component<RendererProps<'text'>> {
  public render() {
    const { data: { text, mode } } = this.props;

    const styleSheet = StyleSheet.create({
      light: {
        color: '#FFFFFF'
      }
    });

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
          root: ({ children }) => (
            <div className={css(mode === 1 && styleSheet.light)}>
              {children}
            </div>
          ),
          heading: ({ children, level }) => {
            const type = level === 1 ? 'bold' : level === 2 ? 'thin' : 'subtle';

            return (
              <Heading text={children} light={mode === 1} breakpoints={{ [PHONE]: type }}/>
            );
          }
        }}
      />
    );
  }
});
