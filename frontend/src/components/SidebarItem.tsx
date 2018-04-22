import { IconName } from '@fortawesome/fontawesome-common-types';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { css, StyleSheet } from 'aphrodite/no-important';
import * as React from 'react';
import { Component } from 'react';
import { Route } from 'react-router';
import { push } from 'react-router-redux';

import { State } from '../types';
import { handle } from '../utils/handle';
import { withProps } from '../utils/withProps';

type Props = {
  path: string,
  name: string,
  icon: IconName
};

const mapStateToProps = (state: State) => ({
  location: state.router.location,
  collapsed: state.content.collapsed
});

const getActionCreators = () => ({
  push
});

const { props, connect } = withProps<Props>()(mapStateToProps, getActionCreators);

export const SidebarItem = connect(class extends Component<typeof props> {
  public render() {
    const { path, name, icon } = this.props;
    const { location, collapsed } = this.props;
    const { push } = this.props;

    const styleSheet = StyleSheet.create({
      item: {
        display: 'flex',
        flexWrap: 'nowrap',
        width: collapsed ? '1rem' : '220px',
        height: '1rem',
        marginLeft: collapsed ? '14px' : '25px',
        marginBottom: collapsed ? '10px' : '20px',
        padding: '15px',
        cursor: 'pointer',
        borderRadius: '.5rem',
        lineHeight: 1,
        transition: 'all .2s ease',
        ':hover': {
          color: '#414756',
          backgroundColor: 'rgba(255, 255, 255, .8)'
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
        color: '#414756',
        backgroundColor: '#fff',
        cursor: 'default',
        ':hover': {
          backgroundColor: '#fff'
        }
      }
    });

    return (
      <Route path={path} exact={true} location={location || undefined}>
        {({ match }) => (
          <div
            className={css(styleSheet.item, Boolean(match) && styleSheet.active)}
            onClick={Boolean(match) ? undefined : handle(push, path)}
          >
            <FontAwesomeIcon icon={icon} className={css(styleSheet.itemIcon)}/>
            <span className={css(styleSheet.itemText)}>{name}</span>
          </div>
        )}
      </Route>
    );
  }
});
