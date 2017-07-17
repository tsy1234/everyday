import React from 'react';
import { render } from 'react-dom';
import { HashRouter, Route, Switch } from 'react-router-dom'; 

import Nav from '../modules/components/Nav';
import GroupList from '../modules/components/GroupList';
import Group from '../modules/components/Group';
import Achieved from '../modules/components/Achieved';
import '../public/style/normalize.css';

render(
     <HashRouter>
        <div>
            <Nav/>
            <Switch>
                <Route exact path="/" component={GroupList}/>
                <Route path="/other/:personId" component={Achieved}/>
                <Route path="/groups/:groupId" component={Group}/>
            </Switch>
        </div>
     </HashRouter>,
    document.getElementById('app')
);


