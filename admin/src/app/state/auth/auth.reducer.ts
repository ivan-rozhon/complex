import { createReducer, Action } from '@ngrx/store';

export interface State {
  loggingIn: boolean;
}

export const authFeatureKey = 'auth';

export const initialState: State = {
  loggingIn: false,
};

const authReducer = createReducer(initialState);

export function reducer(state: State | undefined, action: Action): any {
  return authReducer(state, action);
}
