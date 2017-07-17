import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

class Group extends Component {
    constructor() {
        super();
        this.state = {
            members: []
        };
    }

    componentWillMount() {
        const groupName = this.props.match.params.groupId;
        axios.get('/back/getmembers/' + groupName)
            .then((response) => {
                this.setState({members: response.data});
            });
    }

    render() {
        const list = this.state.members.map((person, index) => {
            const path = '/other/' + person.personId;
            return (
                <li key={person.personId}>
                    <Link to={path}>
                        <span>{index}</span>
                        <span>{person.personId}</span>
                    </Link>
                </li>
            );
        });
        return (
            <section>
                <nav className="group-nav">
                    <span>小组成员</span>
                </nav>
                <div className="group-details">
                    <ul>
                        { list }
                    </ul>
                </div> 
            </section>
        ); 
    }
}

export default Group;
