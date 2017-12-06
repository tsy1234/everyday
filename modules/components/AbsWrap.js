import React, { Component } from 'react';
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';

import Achieved from './Achieved';
import GetGroup from '../containers/GetGroup';
import GetNav from '../containers/GetNav';

import GetGroupList from '../containers/GetGroupList';

import { requestMain } from '../action';

class AbsWrap extends Component {
    constructor(props) {
        super(props);
        this.cookie = true;
    }
    // TODO
    componentWillMount() {
        axios.get('/back/checkCookies').then((res) => {
            if (res.data != '1') {
                this.render(true);
            } 
        });
    }

    componentDidMount() {
        this.props.renderGroupLists();
    }

    render(cookie) {
        if (cookie) {
            return <Redirect to="/login"/>
        }
        return (
            <div id="main-wrap">
                <GetNav/>
                <div id="abs-wrap">
                    <Switch>
                        <Route exact path="/" component={ GetGroupList }/>   
                        <Route path="/other/:personId" component={ Achieved }/>
                        <Route path="/groups/:groupId" component={ GetGroup }/>
                    </Switch>                   
                </div> 
            </div>
        );
    }
}

var mapDispatchToProps = (dispatch) => {
    return {
        renderGroupLists: () => { dispatch(requestMain()); }
    };
};

export default connect(null, mapDispatchToProps)(AbsWrap);