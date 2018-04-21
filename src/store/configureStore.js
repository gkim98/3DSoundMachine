import { createStore, combineReducers } from 'redux';
import ListenerReducer from '../reducers/listener';

export default () => {
    const store = createStore(
        combineReducers({
            listener: ListenerReducer
        }),
    );

    return store;
};