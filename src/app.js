import React from 'react';
import { render } from 'react-dom';
import { HashRouter, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux'; 

import Root from '../modules/containers/Root';
import configureStore from './configureStore';

import '../public/style/normalize.css';

const store = configureStore();

render(
    <Provider store={store}>
        <Root/>
    </Provider>,    
    document.getElementById('app')
);


