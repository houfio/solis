import { ComponentClass } from 'react';
import { connect, MapStateToPropsParam, MergeProps } from 'react-redux';
import { ActionCreatorsMapObject, bindActionCreators, Dispatch } from 'redux';

import { State } from '../types';

export const withProps = <O, C = {}>() =>
  <S, D extends ActionCreatorsMapObject, M>(mapStateToProps?: MapStateToPropsParam<S, O, State>,
                                            getActionCreators?: () => D,
                                            connectProps?: MergeProps<S, D, O, M>) => {
    const mapDispatchToProps = getActionCreators ? (dispatch: Dispatch) =>
      bindActionCreators(getActionCreators(), dispatch) : undefined;
    const mergeProps = (stateProps: S, dispatchProps: D, ownProps: O) => ({
      ...ownProps as any,
      ...stateProps as any,
      ...dispatchProps as any,
      ...connectProps ? connectProps(stateProps, dispatchProps, ownProps) : {}
    });
    const props: O & C & S & D & M = undefined!;

    return {
      props,
      connect: (component: ComponentClass<any>) =>
        connect(mapStateToProps!, mapDispatchToProps!, mergeProps)(component) as ComponentClass<O>
    };
  };
