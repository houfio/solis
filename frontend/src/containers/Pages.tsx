import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { css, StyleSheet } from 'aphrodite/no-important';
import * as React from 'react';
import { Component } from 'react';

import { AdminPage } from '../components/AdminPage';
import { Heading } from '../components/Heading';
import { PHONE } from '../constants';
import { State } from '../types';
import { withProps } from '../utils/withProps';

const mapStateToProps = (state: State) => ({
  pages: state.content.pages
});

const { props, connect } = withProps()(mapStateToProps);

export const Pages = connect(class extends Component<typeof props> {
  public render() {
    const { pages } = this.props;

    const stylesheet = StyleSheet.create({
      header: {
        padding: '2rem',
        borderRadius: '.5rem',
        background: 'linear-gradient(145deg, #1976D2 0%, #12589D 100%)',
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
          <FontAwesomeIcon key="0" icon="plus" size="lg"/>
        ]}
      >
        {pages!.map((page) => (
          <div
            key={page.id}
            className={css(stylesheet.header)}
          >
            <Heading text={page.name} light={true} breakpoints={{ [PHONE]: 'thin' }} styles={[stylesheet.heading]}/>
          </div>
        ))}
      </AdminPage>
    );
  }
});
