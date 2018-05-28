import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { css, StyleSheet } from 'aphrodite/no-important';
import * as React from 'react';
import { Component } from 'react';

import { Route } from 'react-router';
import { BLACK, WHITE } from '../constants';
import { State } from '../types';
import { withProps } from '../utils/withProps';
import { RouterContextConsumer } from './RouterContextConsumer';

type Props = {
  path: string,
  name: string,
  icon: IconProp
};

const mapStateToProps = (state: State) => ({
  collapsed: state.admin.collapsed
});

const { props, connect } = withProps<Props>()(mapStateToProps);

export const SidebarItem = connect(class extends Component<typeof props> {
  public render() {
    const { path, name, icon } = this.props;
    const { collapsed } = this.props;

    const styleSheet = StyleSheet.create({
      item: {
        display: 'flex',
        flexWrap: 'nowrap',
        width: collapsed ? '3rem' : '250px',
        height: '3rem',
        marginLeft: collapsed ? '13px' : '25px',
        marginBottom: collapsed ? '13px' : '25px',
        padding: '1rem',
        cursor: 'pointer',
        borderRadius: '3rem',
        lineHeight: 1,
        transition: 'all .2s ease',
        ':hover': {
          color: BLACK,
          backgroundColor: 'rgba(255, 255, 255, .75)'
        }
      },
      itemIcon: {
        marginRight: '10px'
      },
      itemText: {
        transition: 'opacity .2s ease',
        opacity: collapsed ? 0 : 1,
        whiteSpace: 'nowrap'
      },
      active: {
        color: BLACK,
        backgroundColor: WHITE,
        cursor: 'default',
        ':hover': {
          backgroundColor: WHITE
        }
      }
    });

    return (
      <RouterContextConsumer>
        {({ history: { push } }) => {
          const navigateTo = () => {
            push(path);
          };

          return (
            <Route path={path} exact={true}>
              {({ match }) => (
                <div
                  className={css(styleSheet.item, Boolean(match) && styleSheet.active)}
                  onClick={Boolean(match) ? undefined : navigateTo}
                >
                  <FontAwesomeIcon icon={icon} className={css(styleSheet.itemIcon)}/>
                  <span className={css(styleSheet.itemText)}>{name}</span>
                </div>
              )}
            </Route>
          );
        }}
      </RouterContextConsumer>
    );
  }
});
