import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';

class RegisterPanel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: false,
            redirect: false
        };
        this.handleFocus = this.handleFocus.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleFocus() {
        this.setState({
            error: false
        });
    }

    handleSubmit() {
        var id = this.id.value;
        var name = this.name.value;
        var pass = this.pass.value;

        axios.post('/back/register', {
            username: usrName,
            userid: usrId,
            pass: usrPass
        }).then((res) => {
            if (res.data == '1') {
                this.setState({ error: true});
            } else if (res.data == '0') {
                this.setState({ redirect: true });
            }
        });
    }

    render() {
        if (this.state.redirect) {
            return <Redirect to="/"/>
        }
        return (
            <section id="main">
                <h2 id="title">Every Day</h2>
                <div className="form">
                    <input type="text" name="username" placeholder="用户名"
                        ref={(node) => { this.name = node; }}
                    />
                    <input type="text" name="userid" 
                        placeholder="帐号"
                        ref={(node) => { this.id = node; }}
                        className={ this.state.error && 'border-red' }
                        onFocus={ this.handleFocus }
                    />
                    <span className="error-block"
                        style={{ display: this.state.error ? 'inline-block' : 'none' }}
                        ref={(node) => { this.errorBlock = node; }}
                    >
                        <span className="icon-bolt"/>
                        <span>已存在该帐号</span>
                    </span>
                    <input type="password" name="pass" 
                        placeholder="密码"
                        ref={(node) => { this.pass = node; }}
                    />
                    <button onClick={ this.handleSubmit } id="submit">注册<span className="icon-right">↪</span></button>
                </div>
            </section>
        );
    }
}

export default RegisterPanel;