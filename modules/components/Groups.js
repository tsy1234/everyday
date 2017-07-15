import React, { Component } from 'react';
import axios from 'axios';

const Group = ({name}) => (
    <div className="group">
		<h3>{ name }</h3>
		<p>l love learning</p>
	</div>
);

class Groups extends Component {
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
        const groupList = array.map((group, index) => (
            <Group key={group.name} name={group.name}/>
        ));

        return (
            <section id="group-list">
                <p>已创立的小组</p>
                { groupList }
            </section>
        );
    }
}

export default Groups;
