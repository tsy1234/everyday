import React, { Component } from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';

import LoginPanel from '../components/LoginPanel';
import AbsWrap from '../components/AbsWrap';
import RegisterPanel from '../components/RegisterPanel';
import GetGroupList from '../containers/GetGroupList';
import GetGroup from '../containers/GetGroup';
import Achieved from '../components/Achieved';

const Root = () => {
    return (
        <HashRouter>
            <swtich>
                <Route exact path="/" render={({ match }) => (<AbsWrap  match={ match } InputChild={ GetGroupList }/>)}/>
                <Route path="/login" component={ LoginPanel }/>
                <Route path="/register" component={ RegisterPanel }/>
                <Route path="/groups/:groupId" render={({ match }) => (<AbsWrap match={ match } InputChild={ GetGroup }/>)}/>
                <Route path="/other/:personId" render={({ match }) => (<AbsWrap match={ match } InputChild={ Achieved }/>)}/>
            </swtich>
        </HashRouter>
    );
};

export default Root;