import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom'; 

import Nav from '../modules/components/Nav';
import GroupList from '../modules/components/GroupList';
import Group from '../modules/components/Group';
import '../public/style/normalize.css';

render(
     <BrowserRouter>
        <div>
            <Nav/>
            <Switch>
                <Route path="/groups/:groupId" component={Group}/>
                <Route component={GroupList}/>
            </Switch>
        </div>
     </BrowserRouter>,
    document.getElementById('app')
);


