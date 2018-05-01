import { faPlus } from '@fortawesome/fontawesome-free-solid';
import { css, StyleSheet } from 'aphrodite/no-important';
import * as React from 'react';
import { Component } from 'react';
import { push } from 'react-router-redux';

import { Action } from '../components/Action';
import { AdminPage } from '../components/AdminPage';
import { Heading } from '../components/Heading';
import { PHONE } from '../constants';
import { State } from '../types';
import { handle } from '../utils/handle';
import { withProps } from '../utils/withProps';

const mapStateToProps = (state: State) => ({
  pages: state.content.pages
});

const getActionCreators = () => ({
  push
});

const { props, connect } = withProps()(mapStateToProps, getActionCreators);

export const Pages = connect(class extends Component<typeof props> {
  public render() {
    const { pages } = this.props;
    const { push } = this.props;

    const stylesheet = StyleSheet.create({
      header: {
        padding: '2rem',
        borderRadius: '.5rem',
        background: 'linear-gradient(145deg, #1976d2 0%, #12589d 100%)',
        lineHeight: 1,
        cursor: 'pointer',
        marginBottom: '1rem',
        transition: 'opacity .2s ease',
        ':hover': {
          opacity: .9
        }
      },
      heading: {
        marginBottom: 0
      }
    });

    return (
      <AdminPage
        title="Pagina's"
        actions={[
          <Action key="0" icon={faPlus}/>
        ]}
      >
        {pages!.map((page) => (
          <div
            key={page.id}
            className={css(stylesheet.header)}
            onClick={handle(push, `/admin/pages/${page.id}`)}
          >
            <Heading text={page.name} light={true} breakpoints={{ [PHONE]: 'thin' }} styles={[stylesheet.heading]}/>
          </div>
        ))}
      </AdminPage>
    );
  }
});
