import * as React from 'react';
import { Component } from 'react';
import { RouteComponentProps } from 'react-router';
import { push } from 'react-router-redux';

import { Action } from '../components/Action';
import { AdminPage } from '../components/AdminPage';
import { PageSettings } from '../components/PageSettings';
import { content } from '../modules/content';
import { State } from '../types';
import { findByValue } from '../utils/findByValue';
import { handle } from '../utils/handle';
import { withProps } from '../utils/withProps';

type Params = {
  id: string
};

const mapStateToProps = (state: State) => ({
  pages: state.content.pages
});

const getActionCreators = () => ({
  addNotification: content.addNotification,
  push
});

const { props, connect } = withProps<{}, RouteComponentProps<Params>>()(mapStateToProps, getActionCreators);

export const Page = connect(class extends Component<typeof props> {
  public componentDidMount() {
    const { match: { params: { id } } } = this.props;
    const { pages } = this.props;
    const { push } = this.props;

    const pageId = Number(id);

    if (isNaN(pageId) || !findByValue(pageId, 'id', pages!)) {
      push('/admin/pages');
    }
  }

  public render() {
    const { match: { params: { id } } } = this.props;
    const { pages } = this.props;
    const { push, addNotification } = this.props;

    const page = findByValue(+id, 'id', pages!);

    if (!page) {
      return false;
    }

    return (
      <AdminPage
        title="Pagina"
        actions={[
          <Action
            key="0"
            icon="save"
            onClick={handle(addNotification, () => ({
              id: Date.now(),
              text: 'Opgeslagen',
              timeout: 1000
            }))}
          />,
          <Action key="1" icon="arrows-alt" onClick={handle(push, `/admin/pages/${id}/content`)}/>,
          <Action key="2" icon="trash"/>
        ]}
      >
        <PageSettings page={page}/>
      </AdminPage>
    );
  }
});
