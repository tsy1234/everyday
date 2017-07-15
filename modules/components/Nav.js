import React from 'react';
import axios from 'axios';

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
            axios.get('/back/getone/15079002208')
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
            <nav>
                <span id="nav-title">EVERYDAY LEARNING</span>
                <ul>
                    <li className={this.state.open ? 'nav-tag nav-open' : 'nav-tag'} onClick={this.togglePerson}>个人</li>
                </ul>
                <Cover open={this.state.open} achieves={this.state.achieves}/>
            </nav> 
        );
    }
}

export default Nav;
