import { ActionReducerMap, MetaReducer, ActionReducer } from '@ngrx/store';
import { RouterReducerState, routerReducer } from '@ngrx/router-store';

import { RouterStateUrl } from './app-router-state-serializer';
import * as fromCore from './core/core-reducer';

// check if environment is production (production/development)
const production = process.env.ENV === 'production';

export interface State {
    routerReducer: RouterReducerState<RouterStateUrl>;
    // core: fromCore.
}

export const reducers: ActionReducerMap<State> = {
    routerReducer: routerReducer
};

// console.log all actions
export function logger(reducer: ActionReducer<State>): ActionReducer<State> {
    return function (state: State, action: any): State {
        console.log('state', state);
        console.log('action', action);

        return reducer(state, action);
    };
}

export const metaReducers: MetaReducer<State>[] = !production
    ? [logger]
    : [];
