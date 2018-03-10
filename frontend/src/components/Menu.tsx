import * as React from 'react';
import { Component, CSSProperties } from 'react';
import { css, StyleSheet } from 'aphrodite/no-important';

import { PHONE, TABLET_LANDSCAPE } from '../constants';
import { Column } from './Column';
import { Heading } from './Heading';
import { MenuItem } from '../api/Menu';
import { Page } from '../api/Page';
import { withProps } from '../utils/withProps';
import { State } from '../types';
import { findByValue } from '../utils/findByValue';
import { Row } from './Row';
import { handle } from '../utils/handle';

type Props = {
  menuItem: MenuItem,
  onClick: (page: Page) => void,
  styles?: (CSSProperties | false)[]
}

const mapStateToProps = (state: State) => ({
  pages: state.content.pages
});

const { props, connect } = withProps<Props>()(mapStateToProps);

export const Menu = connect(class extends Component<typeof props> {
  public render() {
    const { menuItem, onClick, styles = [] } = this.props;
    const { pages } = this.props;

    if (!pages) {
      return false;
    }

    const styleSheet = StyleSheet.create({
      category: {
        display: 'flex',
        marginBottom: '2rem',
        flexDirection: 'column'
      },
      link: {
        cursor: 'pointer',
        transition: 'opacity .2s ease',
        ':hover': {
          opacity: '.5'
        }
      }
    });

    return (
      <Row styles={styles}>
        {menuItem.columns.map((column, index) => (
          <Column
            key={index}
            breakpoints={{ [PHONE]: 6, [TABLET_LANDSCAPE]: 3 }}
            styles={[styleSheet.category]}
          >
            <Heading text={column.name} breakpoints={{ [PHONE]: 'thin' }}/>
            {column.targets.map(target => {
              const page = findByValue(target, 'id', pages);

              if (!page) {
                return false;
              }

              return (
                <a
                  key={target}
                  className={css(styleSheet.link)}
                  onClick={handle(onClick, page)}
                >
                  {page.name}
                </a>
              );
            })}
          </Column>
        ))}
      </Row>
    );
  }
});
