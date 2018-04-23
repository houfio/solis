import * as React from 'react';
import { Component } from 'react';
import { Field, reduxForm } from 'redux-form';

import { Page } from '../api/Page';
import { withProps } from '../utils/withProps';
import { Checkbox } from './form/Checkbox';
import { Input } from './form/Input';
import { Select } from './form/Select';

type Props = {
  page: Page
};

const { props, connect } = withProps<Props>()(undefined, undefined, (state, dispatch, own) => ({
  form: `page/${own.page.id}`,
  initialValues: own.page
}));

export const PageSettings = connect(reduxForm({})(class extends Component<typeof props> {
  public render() {
    return (
      <div>
        <Field name="name" component={Input} label="Name"/>
        <Field name="path" component={Input} label="Permalink"/>
        <Field
          name="type"
          component={Select}
          label="Type"
          normalize={this.normalizeEmpty}
        >
          <option value="">Standaard</option>
          <option value="home">Home</option>
        </Field>
        <Field name="hidden" component={Checkbox} label="Verborgen"/>
      </div>
    );
  }

  private normalizeEmpty = (value: string) => {
    if (value === '') {
      return;
    }

    return value;
  }
} as any));
