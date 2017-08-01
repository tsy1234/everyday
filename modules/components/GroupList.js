import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Group = ({name, introduce, path}) => (
    <Link to={path}>
        <div className="group">
		    <h3>{ name }</h3>
		    <p>{ introduce }</p>
	    </div>
    </Link>    
);

class GroupList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            groups: [],
            panel: false
        };
        this.test = 'this is a test';

        this.newGroup = this.newGroup.bind(this);
        this.showPanel = this.showPanel.bind(this);
        this.hidePanel = this.hidePanel.bind(this);
    }

    componentWillMount() {
        axios.get('/back/getgroups')
            .then((response) => {
                this.setState({groups: response.data});
            });
    }

    newGroup() {
        const name = this.groupName.value.trim();
        const introduce = this.groupIntroduce.value.trim();

        if (name === '') {
            return false;
        }

        axios.post('back/creategroup', {
            name, introduce
        });

        var list = this.state.groups.slice();
        list.push({name, introduce});
        this.setState({
            panel: false,
            groups: list
        });
    }

    showPanel() {
        this.setState({panel: true});
    }

    hidePanel() {
        this.setState({panel: false});
    }

    render() {
        const array = this.state.groups;
        const groupList = array.map((group, index) => {
            const path = '/groups/' + group.name.replace(' ', '_');

            return (
                <Group key={group.name} name={group.name} introduce={group.introduce} path={path}/>
            );
        });

        const cover = (
            <div className="all-cover">
                <div id="group-panel">
                    <header>
                        创建项目
                        <span className="icon-remove" onClick={this.hidePanel}/>
                    </header>
                    <div className="ed-form">
                        <input type="text" placeholder="小组名称" ref={(input) => {this.groupName = input;}}/>
                        <input type="text" placeholder="小组简介 (选填)" ref={(input) => {this.groupIntroduce = input;}}/>
                        <button className="btn-primary" onClick={this.newGroup}>
                            完成并创建
                        </button>
                    </div>
                </div>        
            </div>
        );

        return (
            <section id="group-list">
                <p>已创立的小组</p>
                { groupList }
                <div id="new-group" onClick={this.showPanel}>
                    <span className="icon-plus-sign"/>
                    <span>创建新小组</span>
                </div>
                {this.state.panel ? cover : null}
            </section>
        );
    }
}

export default GroupList;
