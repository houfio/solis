import * as React from 'react';
import { Component } from 'react';
import { Query } from 'react-apollo';
import { Helmet } from 'react-helmet';

import { BLOCK_RENDERERS } from '../constants';
import { ContentPageQuery, ContentPageQueryVariables } from '../schema/__generated__/ContentPageQuery';
import { PublicQuery_pages } from '../schema/__generated__/PublicQuery';
import { withProps } from '../utils/withProps';

import query from '../schema/contentPage.graphql';
import { findByKey } from '../utils/findByKey';

type Props = {
  page: PublicQuery_pages
};

const { props, connect } = withProps<Props>()();

export const ContentPage = connect(class extends Component<typeof props> {
  public render() {
    const { page } = this.props;

    return (
      <Query<ContentPageQuery, ContentPageQueryVariables> query={query} variables={{ id: page.id }}>
        {({ data, loading }) => {
          if (loading || !data || !data.page) {
            return 'loading haha';
          }

          return (
            <>
              <Helmet title={`${page.name} / Jong Nederland`}/>
              {[...data.page.blocks]
                .filter((block) => !block.parent)
                .sort((a, b) => a.order - b.order)
                .map((block) => {
                  const renderer = findByKey(block.type, BLOCK_RENDERERS);
                  const children = data.page!.blocks.filter((b) => b.parent && b.parent.id === block.id);

                  return renderer(block, children);
                })}
            </>
          );
        }}
      </Query>
    );
  }
});
