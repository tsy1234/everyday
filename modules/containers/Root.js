import React, { Component } from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';

import Achieved from '../components/Achieved';
import Group from '../components/Group';

import GetGroupList from './GetGroupList';
import GetNav from './GetNav';

import { requestMain } from '../action';

class Root extends Component {
    constructor (props) {
        super(props);
    }

    componentDidMount () {
        this.props.renderGroupLists();
    }

    render () {
        return (
            <HashRouter>
                <div id="main-wrap">
                    <GetNav/>
                    <div id="abs-wrap">
                        <Switch>
                            <Route exact path="/" component={GetGroupList}/>
                            <Route path="/other/:personId" component={Achieved}/>
                            <Route path="/groups/:groupId" component={Group}/>
                        </Switch>                    
                    </div> 
                </div>
            </HashRouter>
        );
    }
}

var mapDispatchToProps = (dispatch) => {
    return {
        renderGroupLists: () => { dispatch(requestMain()); }
    };
};

export default connect(null, mapDispatchToProps)(Root);