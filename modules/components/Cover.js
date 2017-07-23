import React, { Component } from 'react';
import axios from 'axios';

class Cover extends Component {
    constructor(props) {
        super();
        this.state = {
            show: false,
            achieves: props.achieves
        };
        this.showAdd = this.showAdd.bind(this);
        this.addAchieve = this.addAchieve.bind(this);
    }

    addAchieve() {
        const text = this.textInput.value.trim();

        axios.post('/back/addachieved', {
            content: text
        });


    }

    showAdd() {
        this.setState((pre) => (
            {
                show: !pre.show
            }
        ));
    }

    render() {
        const lists = this.state.achieves.map((item, index) => (
            <div key={ index } className="time-line">
			    <span className="time-ill">{ item.date }</span>
			    <p>{ item.content }</p>
		    </div>
        ));

        const show = this.state.show;

        return (
            <div className={this.props.open ? 'cover open' : 'cover'}>
                <nav className="person-nav">
                    <span>我完成的事</span>
                </nav>
                <div className="my-achieves">
                    { lists }
                    <div className={show ? 'hidden' : 'add-achieve'} onClick={this.showAdd}>
                        <span className="icon-plus-sign"/>
                        <span>添加新事项</span>
                    </div>
                    <div className={show ? 'add-form' : 'add-form hidden'}>
                        <input type="text" ref={(input) => {this.textInput = input;}}/>
                        <button className="btn-primary" onClick={this.addAchieve}>创建</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default Cover;
