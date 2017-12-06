import React, { Component } from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';

import LoginPanel from '../components/LoginPanel';
import AbsWrap from '../components/AbsWrap';
import RegisterPanel from '../components/RegisterPanel';

const Root = () => {
    return (
        <HashRouter>
            <swtich>
                <Route path="/login" component={ LoginPanel }/>
                <Route path="/register" component={ RegisterPanel }/>
                <Route path="/" component={ AbsWrap }/>
            </swtich>
        </HashRouter>
    );
};

export default Root;