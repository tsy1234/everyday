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
                this.setState({
                    achieves: response.data.achieved,
                    name: response.data.name
                });
            });
    }

    render() {
        const lists = this.state.achieves.map((item, index) => (
            <div key={ index } className="time-line">
			    <span className="time-ill">{ item.date }</span>
			    <p>{ item.content }</p>
		    </div>
        ));

        const placeholder = (
            <div className="no-placeholder">
                <span className="icon-edit"/>
                <p className="no-content">暂时没有完成事项</p>
            </div>
        );

        const content = (lists.length > 0) ? lists : placeholder;

        return (
            <section id="other-achieves">
                <span id="achieves-source">{ this.state.name + '的完成事项' }</span>
                { content }
            </section>
        );
    }
}

export default Achieved;
