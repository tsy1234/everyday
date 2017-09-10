import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import Cover from './Cover';

class Nav extends Component {
    constructor() {
        super();

        this.togglePerson = this.togglePerson.bind(this);
        this.handleMain = this.handleMain.bind(this);
    }

    togglePerson() {
        const { open, setOpen } = this.props;
        if (open) {
            setOpen(false);
        } else {
            setOpen(true);
        }
    }

    handleMain() {
        var open = this.props.open;
        if (open) {
            this.props.setOpen(false);
        }
    }

    render() {
        const { myAchieves, getMyAchieves, setOpen } = this.props;
        return (
            <nav id="head">
                <Link to="/">
                    <span id="nav-title" onClick={this.handleMain}>EVERYDAY LEARNING</span>
                </Link>
                <ul>
                    <li className={this.props.open ? 'nav-tag nav-open' : 'nav-tag'} onClick={this.togglePerson}>个人</li>
                </ul>
                <Cover
                    myAchieves={myAchieves} getMyAchieves={getMyAchieves}
                    handleDelete={() => {setOpen(false);}} open={this.props.open}
                />
            </nav> 
        );
    }
}

export default Nav;
