import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { css, StyleSheet } from 'aphrodite/no-important';
import * as React from 'react';
import { Component } from 'react';

import { AdminPage } from '../components/AdminPage';
import { Heading } from '../components/Heading';
import { PHONE } from '../constants';
import { admin } from '../modules/admin';
import { State } from '../types';
import { handle } from '../utils/handle';
import { withProps } from '../utils/withProps';

const mapStateToProps = (state: State) => ({
  pages: state.content.pages,
  openPage: state.admin.openPage
});

const getActionCreators = () => ({
  setOpenPage: admin.setOpenPage
});

const { props, connect } = withProps()(mapStateToProps, getActionCreators);

export const Pages = connect(class extends Component<typeof props> {
  public render() {
    const { pages, openPage } = this.props;
    const { setOpenPage } = this.props;

    const stylesheet = StyleSheet.create({
      row: {
        position: 'relative'
      },
      header: {
        padding: '2rem',
        borderRadius: '.5rem',
        background: 'linear-gradient(145deg, #1976D2 0%, #12589D 100%)',
        lineHeight: 1,
        cursor: 'pointer',
        boxShadow: '0 0 10px 0 rgba(0, 0, 0, .15)',
        transition: 'all .2s ease .2s, opacity .2s ease',
        ':hover': {
          opacity: .9
        }
      },
      headerOpen: {
        transform: 'scale(1.05)',
        transition: 'all .2s ease',
        boxShadow: '0 0 25px 0 rgba(0, 0, 0, .5)'
      },
      heading: {
        marginBottom: 0
      },
      inner: {
        height: '0',
        backgroundColor: '#fff',
        marginBottom: '1rem',
        transition: 'height .2s ease',
        borderRadius: '0 .5rem .5rem',
        boxShadow: '0 0 10px 0 rgba(0, 0, 0, .15)'
      },
      innerOpen: {
        height: '10rem',
        transition: 'height .2s ease .2s'
      }
    });

    return (
      <AdminPage
        title="Pagina's"
        actions={[
          <FontAwesomeIcon key="0" icon="plus" size="lg"/>
        ]}
      >
        {pages!.map((page) => (
          <div key={page.id} className={css(stylesheet.row)}>
            <div
              className={css(stylesheet.header, openPage === page.id && stylesheet.headerOpen)}
              onClick={handle(setOpenPage, { pageId: page.id })}
            >
              <Heading text={page.name} light={true} breakpoints={{ [PHONE]: 'thin' }} styles={[stylesheet.heading]}/>
            </div>
            <div className={css(stylesheet.inner, openPage === page.id && stylesheet.innerOpen)}/>
          </div>
        ))}
      </AdminPage>
    );
  }
});
