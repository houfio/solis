import { css, StyleSheet } from 'aphrodite/no-important';
import * as React from 'react';

import { PHONE, TABLET_LANDSCAPE } from '../constants';
import { NavigationQuery_menu } from '../schema/__generated__/NavigationQuery';
import { handle } from '../utils/handle';
import { Column } from './Column';
import { Heading } from './Heading';
import { Row } from './Row';

type Props = {
  item: NavigationQuery_menu,
  onClick: (path: string) => void
};

const styleSheet = StyleSheet.create({
  category: {
    display: 'flex',
    margin: '1rem 0',
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

export const Menu = ({ item, onClick }: Props) => (
  <Row>
    {[ ...item.columns ]
      .sort((a, b) => a.order - b.order)
      .map((column) => (
        <Column
          key={column.id}
          breakpoints={{ [ PHONE ]: 6, [ TABLET_LANDSCAPE ]: 3 }}
          styles={[ styleSheet.category ]}
        >
          <Heading text={column.name} light={true} breakpoints={{ [ PHONE ]: 'thin' }}/>
          {[ ...column.targets ]
            .sort((a, b) => a.order - b.order)
            .map((target) => (
              <a
                key={target.id}
                className={css(styleSheet.link)}
                onClick={handle(onClick, target.target.path)}
              >
                {target.target.name}
              </a>
            ))}
        </Column>
      ))}
  </Row>
);
