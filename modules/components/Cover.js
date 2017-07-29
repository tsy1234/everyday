import React, { Component } from 'react';
import axios from 'axios';

class Cover extends Component {
    constructor(props) {
        super();

        this.state = {
            show: false,
            achieves: []
        };

        this.showAdd = this.showAdd.bind(this);
        this.addAchieve = this.addAchieve.bind(this);
        this.handleBlur = this.handleBlur.bind(this);
    }

    componentWillMount() {
        axios.get('/back/getmy')
            .then((response) => {
                this.setState({
                    achieves: response.data.achieved
                });
            });
    }

    addAchieve(e) {
        const content = this.textInput.value.trim();

        if (e.keyCode === 13) {
            if (content === '') {
                return false;
            }

            const arr = this.state.achieves.slice();

            const now = new Date();
            const date = `${now.getFullYear()}.${now.getMonth() + 1}.${now.getDate()}`;

            axios.post('/back/addachieved', {
                content,
                date
            });

            arr.push({content, date});

            this.setState({
                achieves: arr
            });

            this.textInput.value = '';
        }
        
    }

    handleBlur() {
        this.setState({
            show: false
        });
    }

    showAdd() {
        this.setState({
            show: true
        });

        this.textInput.focus();
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
                    <span className="icon-remove-circle sy-icon-cover" onClick={this.props.handleDelete}/>
                </nav>
                <div className="my-achieves">
                    { lists }
                    <div className={show ? 'hidden' : 'add-achieve'} onClick={this.showAdd}>
                        <span className="icon-plus-sign"/>
                        <span>添加新事项</span>
                    </div>
                    <div className={show ? 'add-form' : 'add-form hide-form'} onBlur={this.handleBlur}>
                        <input type="text" ref={(input) => {this.textInput = input;}} onKeyUp={this.addAchieve}/>
                    </div>
                </div>
            </div>
        );
    }
}

export default Cover;
