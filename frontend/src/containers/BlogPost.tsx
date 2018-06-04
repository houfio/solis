import { faClock } from '@fortawesome/fontawesome-free-solid/faClock';
import { faTag } from '@fortawesome/fontawesome-free-solid/faTag';
import { css, StyleSheet } from 'aphrodite/no-important';
import { distanceInWordsToNow } from 'date-fns';
import * as nlLocale from 'date-fns/locale/nl';
import * as React from 'react';
import { Query } from 'react-apollo';
import { RouteComponentProps } from 'react-router';

import { BlogTag } from '../components/BlogTag';
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
    paddingTop: '5rem'
  },
  pills: {
    margin: '1rem 0 2rem 0'
  }
});

export const BlogPost = ({ match: { params: { id } } }: Props) => (
  <Query<BlogPostQuery, BlogPostQueryVariables> query={query} variables={{ id }}>
    {({ loading, error, data }) => {
      if (loading) {
        return <span>loading</span>;
      } else if (error || !data || !data.post) {
        return <Heading text="Deze post bestaat niet." breakpoints={{ [ PHONE ]: 'bold' }}/>;
      }

      const { title, creationDate, content, tags } = data.post;

      return (
        <div className={css(styleSheet.post)}>
          <Heading text={title} breakpoints={{ [ PHONE ]: 'bold' }}/>
          <div className={css(styleSheet.pills)}>
            <BlogTag icon={faClock} text={distanceInWordsToNow(new Date(creationDate), { locale: nlLocale })}/>
            {tags.map((tag, index) => <BlogTag key={index} icon={faTag} text={tag.tag}/>)}
          </div>
          <span>{content}</span>
        </div>
      );
    }}
  </Query>
);
