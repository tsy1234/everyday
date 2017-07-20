import React, { Component } from 'react';
import axios from 'axios';

class Achieved extends Component {
    constructor() {
        super();
        this.state = {
            achieves: []
        };
    }

    componentWillMount() {
        const s = '/back/getone/' + this.props.match.params.personId;

        axios.get(s)
            .then((response) => {
                this.setState({achieves: response.data});
            });
    }

    render() {
        const lists = this.state.achieves.map((item, index) => (
            <div key={ index } className="time-line">
			    <span className="time-ill">{ item.date }</span>
			    <p>{ item.content }</p>
		    </div>
        ));

        return (
            <section id="other-achieves">
                { lists }
            </section>
        );
    }
}

export default Achieved;
