import { css, StyleDeclaration, StyleSheet } from 'aphrodite/no-important';
import * as React from 'react';
import { Component } from 'react';

import { MenuItem } from '../api/Menu';
import { Page } from '../api/Page';
import { PHONE, TABLET_LANDSCAPE } from '../constants';
import { State } from '../types';
import { findByValue } from '../utils/findByValue';
import { handle } from '../utils/handle';
import { withProps } from '../utils/withProps';
import { Column } from './Column';
import { Heading } from './Heading';
import { Row } from './Row';

type Props = {
  menuItem: MenuItem,
  onClick: (page: Page) => void,
  styles?: StyleDeclaration
};

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
          opacity: .5
        }
      }
    });

    return (
      <Row styles={styles}>
        {menuItem.columns
          .sort((a, b) => a.order - b.order)
          .map((column) => (
            <Column
              key={column.id}
              breakpoints={{ [PHONE]: 6, [TABLET_LANDSCAPE]: 3 }}
              styles={[styleSheet.category]}
            >
              <Heading text={column.name} light={true} breakpoints={{ [PHONE]: 'thin' }}/>
              {column.targets
                .sort((a, b) => a.order - b.order)
                .map((target) => {
                  const page = findByValue(target.target, 'id', pages);

                  if (!page) {
                    return false;
                  }

                  return (
                    <a
                      key={target.id}
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
