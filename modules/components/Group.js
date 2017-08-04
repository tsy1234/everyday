import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

class Group extends Component {
    constructor() {
        super();
        this.state = {
            members: [],
            isIn: false
        };

        this.addGroup = this.addGroup.bind(this);
    }

    addGroup() {
        const groupName = this.groupName.replace('_', ' ');
        var list = this.state.members.slice();
        list.push({name: this.personName, personId: this.personId});

        this.setState({
            isIn: true,
            members: list
        });

        axios.post('back/joingroup', {groupName});
    }

    componentWillMount() {
        const groupName = this.props.match.params.groupId;
        this.groupName = groupName;

        axios.get('/back/getmembers/' + groupName)
            .then((response) => {
                this.setState({members: response.data});
            });

        axios.post('/back/isingroup', {
            groupName: groupName.replace('_', ' ')
        }).then((response) => {
            const data = response.data;

            if (data.isIn) {
                 this.setState({isIn: true});
            }

            this.personName = data.personName;
            this.personId = data.personId;
        });
    }

    render() {
        const list = this.state.members.map((person, index) => {
            const path = '/other/' + person.personId;
            return (
                <li key={person.personId} className="one-member">
                    <Link to={path}>
                        <span className="member-num">{index + 1}</span>
                        <span className="member-name">{person.name}</span>
                    </Link>
                </li>
            );
        });

        const join = <span id="add-group" onClick={this.addGroup}>加入该小组</span>;
        const isIn = <span id="in-group">已加入小组</span>;

        const placeholder = (
            <div className="no-placeholder">
                <span className="icon-edit"/>
                <p className="no-content">暂时没有成员加入</p>
            </div>
        );

        const details = (list.length > 0) ? <ul>{list}</ul> : placeholder;

        return (
            <section id="group-wrap">
                <nav className="group-nav">
                    <span>小组成员</span>
                    {this.state.isIn ? isIn : join}
                </nav>
                <div className="group-details">
                    { details }
                </div> 
            </section>
        ); 
    }
}

export default Group;
