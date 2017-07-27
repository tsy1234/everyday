import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import Cover from './Cover';

class Nav extends React.Component {
    constructor() {
        super();

        this.state = {
            open: false  
        };

        this.togglePerson = this.togglePerson.bind(this);
    }

    togglePerson() {
        this.setState((prevState) => (
            {open: !prevState.open}
        ));
    }

    render() {
        return (
            <nav id="head">
                <Link to="/">
                    <span id="nav-title">EVERYDAY LEARNING</span>
                </Link>
                <ul>
                    <li className={this.state.open ? 'nav-tag nav-open' : 'nav-tag'} onClick={this.togglePerson}>个人</li>
                </ul>
                <Cover handleDelete={this.togglePerson} open={this.state.open}/>
            </nav> 
        );
    }
}

export default Nav;
