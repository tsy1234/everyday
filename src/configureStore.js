import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import rootReducer from '../modules/reducer';

export default function () {
    return createStore(
        rootReducer,
        applyMiddleware(thunk)
    );
};