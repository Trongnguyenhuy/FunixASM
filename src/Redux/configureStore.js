import { createStore, combineReducers, applyMiddleware } from 'redux';
import { staffs } from './staff';
import { departments } from './department';
import { salary } from './salary';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

export const configureStore = () => {
    const store = createStore(
        combineReducers({
            staffs: staffs,
            departments: departments,
            salary: salary
        }),
        applyMiddleware(thunk,logger)
    );

    return store;
}