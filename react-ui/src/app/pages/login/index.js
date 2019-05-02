import React, { Component } from 'react';
import { connect } from 'react-redux';

import './index.css';
import Sunrise from '../../assets/img/sunrise.png'
import AXA from '../../assets/img/axa.png'

import { userActions } from '../../../actions';
import { filemanagerActions } from '../../../actions';

class Login extends Component {

    constructor(props) {
        super(props);

        // reset login status
        this.props.dispatch(userActions.logout());

        this.state = {
            username: '',
            password: '',
            submitted: false
        };

        this.onChange = this.onChange.bind(this)
        this.connect = this.connect.bind(this)
    }

    connect(event){
        event.preventDefault();
        this.setState({ submitted: true });
        const { username, password } = this.state;
        const { dispatch } = this.props;
        if (username && password) {
            dispatch(userActions.login(username, password));
            dispatch(filemanagerActions.connect(username, password));
        }
    }

    onChange(event) {
        this.setState({[event.target.name]: event.target.value});
    }
    render() {
        const { loggingIn } = this.props;
        const { username, password, submitted } = this.state;
        return (
            <div id='login'>
                <img alt='Axa' id='axa' src={AXA} />
                <h2>Sunrise by</h2>
                <img alt='Sunrise' id='sunrise' src={Sunrise} />
                
                <form onSubmit={this.connect}>
                    <p>Identifiant</p>
                    <input name='username' type='text' onChange={this.onChange} />
                    {submitted && !username &&
                        <div className="help-block">Username is required</div>
                    }
                    <p>Mot de passe</p>
                    <input name='password' type='password' onChange={this.onChange} />
                    {submitted && !password &&
                        <div className="help-block">Password is required</div>
                    }
                    <input name='submit' type='submit' value={'Se connecter'} />
                    {loggingIn &&
                        <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                    }
                </form>
            </div>
        )
    }
}


function mapStateToProps(state) {
    const { loggingIn } = state.auth;
    return {
        loggingIn
    };
}

export default connect(mapStateToProps)(Login);
