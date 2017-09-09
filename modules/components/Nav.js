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
        this.handleMain = this.handleMain.bind(this);
    }

    togglePerson() {
        this.setState((prevState) => (
            {open: !prevState.open}
        ));
    }

    handleMain() {
        var open = this.state.open;
        if (open) {
            this.setState({open: false});
        }
    }

    render() {
        const { myAchieves, getMyAchieves } = this.props;
        return (
            <nav id="head">
                <Link to="/">
                    <span id="nav-title" onClick={this.handleMain}>EVERYDAY LEARNING</span>
                </Link>
                <ul>
                    <li className={this.state.open ? 'nav-tag nav-open' : 'nav-tag'} onClick={this.togglePerson}>个人</li>
                </ul>
                <Cover
                    myAchieves={myAchieves} getMyAchieves={getMyAchieves}
                    handleDelete={this.togglePerson} open={this.state.open}
                />
            </nav> 
        );
    }
}

export default Nav;
