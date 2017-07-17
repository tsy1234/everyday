import React, { Component } from 'react';

class Cover extends Component {
    constructor() {
        super();
    }

    render() {
        const lists = this.props.achieves.map((item, index) => (
            <div key={ index } className="time-line">
			    <span className="time-ill">{ item.date }</span>
			    <p>{ item.content }</p>
		    </div>
        ));

        return (
            <div className={this.props.open ? 'cover open' : 'cover'}>
                <nav className="person-nav">
                    <span>我完成的事</span>
                </nav>
                <div className="my-achieves">
                    {lists}
                </div>
            </div>
        );
    }
}

export default Cover;
