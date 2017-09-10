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

        this.newGroup = this.newGroup.bind(this);
        this.handleCover = this.handleCover.bind(this);
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

        this.props.addNewGroup({name, introduce});
        this.handleCover();
    }

    handleCover() {
        this.coverContainer.classList.add('cover-hide');
        var self = this;
        setTimeout(function () {
            self.props.closePanel();
        }, 500);
    }

    render() {
        const array = this.props.groups;
        const groupList = array.map((group, index) => {
            const path = '/groups/' + group.name.replace(' ', '_');

            return (
                <Group key={group.name} name={group.name} introduce={group.introduce} path={path}/>
            );
        });

        const cover = (
            <section ref={(ele) => {this.coverContainer = ele;}} id="cover-container"> 
                <div id="group-panel">
                    <header>
                        创建项目
                        <span className="icon-remove" onClick={this.handleCover}/>
                    </header>
                    <div className="beauty-image"/>
                    <div className="ed-form">
                        <input className="sy-input" type="text" placeholder="小组名称" ref={(input) => {this.groupName = input;}}/>
                        <input className="sy-input" type="text" placeholder="小组简介 (选填)" ref={(input) => {this.groupIntroduce = input;}}/>
                        <button className="sy-button btn" onClick={this.newGroup}>
                            完成并创建
                        </button>
                    </div>
                </div>        
                <div className="all-cover" onClick={this.handleCover}/>
            </section>
        );

        return (
            <section id="group-list">
                <p>已创立的小组</p>
                { groupList }
                <div id="new-group" onClick={this.props.openPanel}>
                    <span className="icon-plus-sign"/>
                    <span>创建新小组</span>
                </div>
                {this.props.panel ? cover : null}
            </section>
        );
    }
}

export default GroupList;
