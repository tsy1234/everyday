import React, { Component } from 'react';

class Group extends Component {
    constructor() {
        super();
    }

    render() {
        return (
            <section className="group-details">
                {this.props.match.params.groupId}
            </section> 
        ); 
    }
}

export default Group;
