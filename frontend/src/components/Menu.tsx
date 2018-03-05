import * as React from 'react';
import { Component } from 'react';
import { css, StyleSheet } from 'aphrodite/no-important';

import { PHONE, TABLET_LANDSCAPE } from '../constants';
import { Column } from './Column';
import { Heading } from './Heading';
import { MenuItem } from '../api/Menu';
import { Page } from '../api/Page';
import { withProps } from '../utils/withProps';
import { State } from '../types';
import { findById } from '../utils/findById';
import { Row } from './Row';

type Props = {
  menu: MenuItem,
  onClick: (page: Page) => void
}

const mapStateToProps = (state: State) => ({
  pages: state.content.pages
});

const { props, connect } = withProps<Props>()(mapStateToProps);

export const Menu = connect(class extends Component<typeof props> {
  public render() {
    const { menu, onClick } = this.props;
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
      heading: {
        marginBottom: '.5rem'
      },
      link: {
        ':hover': {
          cursor: 'pointer',
          opacity: '.5'
        }
      }
    });

    return (
      <Row>
        {menu.rows.map((row, index) => (
          <Column
            key={index}
            breakpoints={{ [PHONE]: 6, [TABLET_LANDSCAPE]: 3 }}
            styles={[styleSheet.category]}
          >
            <Heading text={row.name} breakpoints={{ [PHONE]: 8 }} styles={[styleSheet.heading]}/>
            {row.items.map(item => {
              const page = findById(item, pages);

              if (!page) {
                return false;
              }

              return (
                <a
                  key={item}
                  className={css(styleSheet.link)}
                  onClick={() => onClick(page)}
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
