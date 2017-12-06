import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';

class LoginPanel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: false,
            redirect: false 
        };
        this.handleFocus = this.handleFocus.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        console.log('login did mount');
    }

    handleFocus() {
        this.setState({
            error: false
        });
    }

    handleSubmit() {
        var id = this.id.value;
        var pass = this.pass.value;

        axios.post('/back/checklogin', { id, pass })
            .then((res) => {
                if (res.data == '1') {
                    this.setState({ error: true});
                } else {
                    this.setState({ redirect: true});
                }
            });
    }

    render() {
        if (this.state.redirect) {
            return <Redirect to="/"/>;
        }
        return (
            <section id="main">
                <h2 id="title">Every Day</h2>
                <div className="form">
                    <input type="text" name="id" placeholder="帐号"
                        onFocus={ this.handleFocus }
                        className={ this.state.error && 'border-red' }
                        ref={(node) => { this.id = node; }}
                    />
                    <input type="password" name="pass" placeholder="密码"
                        ref={(node) => { this.pass = node; }}
                    />
                    <span className="error-block" 
                        style={{ display: this.state.error ? 'inline-block' : 'none' }}
                        ref={(node) => { this.errorBlock = node; }}
                    >
                        <span className="icon-bolt"/>
                        <span>该用户未注册</span>
                    </span>
                    <button onClick={ this.handleSubmit } id="submit">登录<span className="icon-right">↪</span></button>
                    <div className="horizontal-line"></div>
                    <button id="register">
                        <Link to="/register">注册</Link>    
                    </button>
                </div>
            </section>
        );
    }
}

export default LoginPanel;