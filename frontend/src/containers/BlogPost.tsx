import { css, StyleSheet } from 'aphrodite/no-important';
import * as React from 'react';
import { Query } from 'react-apollo';
import { RouteComponentProps } from 'react-router';

import { Container } from '../components/Container';
import { Heading } from '../components/Heading';
import { PHONE } from '../constants';
import { BlogPostQuery, BlogPostQueryVariables } from '../schema/__generated__/BlogPostQuery';

import query from '../schema/blogPost.graphql';

type Params = {
  id: string
};

type Props = RouteComponentProps<Params>;

const styleSheet = StyleSheet.create({
  post: {
    paddingTop: '2rem'
  }
});

export const BlogPost = ({ match: { params: { id } } }: Props) => (
  <Query<BlogPostQuery, BlogPostQueryVariables> query={query} variables={{ id }}>
    {({ loading, error, data }) => {
      if (loading) {
        return <span>loading</span>;
      } else if (error || !data || !data.post) {
        return <Heading text="Deze post bestaat niet." breakpoints={{ [PHONE]: 'bold' }}/>;
      }

      const { title, creationDate, author, content } = data.post;

      return (
        <Container>
          <div className={css(styleSheet.post)}>
            <Heading text={title} breakpoints={{ [PHONE]: 'bold' }}/>
            <span>{new Date(creationDate).toLocaleDateString()}</span>
            <span>{author.email}</span>
            <p>{content}</p>
          </div>
        </Container>
      );
    }}
  </Query>
);
