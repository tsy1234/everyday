import React, { Component } from 'react';
import axios from 'axios';
import { Link, Redirect } from 'react-router-dom';

class Group extends Component {
    constructor() {
        super();
        
        this.state = {
            members: [],
            isIn: false
        };

        this.addGroup = this.addGroup.bind(this);
        this.dropGroup = this.dropGroup.bind(this);
        this.toggleSet = this.toggleSet.bind(this);
        this.delGroup = this.delGroup.bind(this);
    }

    addGroup() {
        const groupName = this.groupName;
        var list = this.state.members.slice();
        list.push({ name: this.personName, personId: this.personId });

        this.setState({
            isIn: true,
            members: list,
            redirect: false
        });

        axios.post('back/joingroup', { groupName });
    }

    dropGroup() {
        const groupName = this.groupName;

        this.setState({ isIn: false });

        axios.post('back/dropgroup', { groupName });
    }

    toggleSet () {
        this.setPanel.classList.toggle('hidden');
    }

    delGroup () {
        const groupName = this.groupName;
        axios.post('back/delgroup', { groupName });
        this.props.delGroup(groupName);
        this.setState({ redirect: true });
    }

    componentWillMount() {
        console.log('where is my group');
        const groupName = this.props.match.params.groupId;
        this.groupName = groupName;

        axios.get('/back/getmembers/' + groupName)
            .then((response) => {
                this.setState({ members: response.data });
            });

        axios.post('/back/isingroup', {
            groupName: groupName
        }).then((response) => {
            const data = response.data;

            if (data.isIn) {
                 this.setState({ isIn: true });
            }

            this.personName = data.personName;
            this.personId = data.personId;
        });
    }

    render() {
        if (this.state.redirect) {
            return <Redirect to="/"/>;
        }

        const list = this.state.members.map((person, index) => {
            const path = '/other/' + person.personId;
            return (
                <li key={ person.personId } className="one-member">
                    <Link to={ path }>
                        <span className="member-num">{ index + 1 }</span>
                        <span className="member-name">{ person.name }</span>
                    </Link>
                </li>
            );
        });

        const join = <span id="add-group" onClick={ this.addGroup }>加入该小组</span>;
        const isIn = <span id="in-group" onClick={ this.dropGroup }>退出该小组</span>;

        const placeholder = (
            <div className="no-placeholder">
                <span className="icon-edit"/>
                <p className="no-content">暂时没有成员加入</p>
            </div>
        );

        const details = (list.length > 0) ? <ul>{ list }</ul> : placeholder;

        return (
            <section id="group-wrap">
                <nav className="group-nav">
                    <span>小组成员</span>
                    { this.state.isIn ? isIn : join }
                    <i className="fa fa-cog group-set" aria-hidden="true"
                       onClick={ this.toggleSet }
                    />
                    <ul className="group-set-panel hidden"
                        ref={ (set) => { this.setPanel = set; } }
                    >
                        <li onClick={ this.delGroup }>删除小组</li>
                        <li>别的</li>
                    </ul>
                </nav>
                <div className="group-details">
                    { details }
                </div> 
            </section>
        ); 
    }
}

export default Group;
