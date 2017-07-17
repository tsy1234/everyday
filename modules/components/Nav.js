import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import Cover from './Cover';

class Nav extends React.Component {
    constructor() {
        super();

        this.state = {
            achieves: [],
            open: false  
        };

        this.togglePerson = this.togglePerson.bind(this);
    }

    togglePerson() {
        if (this.state.open) {
            this.setState((prevState) => (
                {open: !prevState.open}
            ));
        } else {
            axios.get('/back/getmy')
                .then((response) => {
                    this.setState({
                        achieves: response.data,
                        open: true
                    });
                });
            }
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
                <Cover open={this.state.open} achieves={this.state.achieves}/>
            </nav> 
        );
    }
}

export default Nav;
