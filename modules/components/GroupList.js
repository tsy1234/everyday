import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Group = ({name, path}) => (
    <Link to={path}>
        <div className="group">
		    <h3>{ name }</h3>
		    <p>l love learning</p>
	    </div>
    </Link>    
);

class GroupList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            achieves: []
        };
    }

    componentWillMount() {
        axios.get('/back/getgroups')
            .then((response) => {
                this.setState({achieves: response.data});
            });
    }

    render() {
        const array = this.state.achieves;
        const groupList = array.map((group, index) => {
            const path = '/groups/' + group.name.replace(' ', '_');

            return (
                <Group key={group.name} name={group.name} path={path}/>
            );
        });

        return (
            <section id="group-list">
                <p>已创立的小组</p>
                { groupList }
            </section>
        );
    }
}

export default GroupList;
