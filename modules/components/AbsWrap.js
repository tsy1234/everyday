import React, { Component } from 'react';
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';

import GetNav from '../containers/GetNav';

class AbsWrap extends Component {
    constructor(props) {
        super(props);
    }
    // TODO
    componentWillMount() {
        axios.get('/back/checkCookies').then((res) => {
            if (res.data != '1') {
                this.render(true);
            } 
        }).catch((e) => {
            console.log(e);
        });
    }

    render(cookie) {
        if (cookie) {
            return <Redirect to="/login"/>
        }
        const { InputChild, match } = this.props;
        return (
            <div id="main-wrap">
                <GetNav/>
                <div id="abs-wrap">
                <InputChild match={ match } />
                </div> 
            </div>
        );
    }
}

export default AbsWrap;