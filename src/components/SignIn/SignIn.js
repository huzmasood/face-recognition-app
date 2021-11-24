import React, { Component } from 'react';

class SignIn extends Component {
    constructor (props) {
        super(props);
        this.state = {
            signInUsername: '',
            signInPassword: ''
        }
    }

    onUsernameChange = (event) => {
        this.setState({ signInUsername: event.target.value.toLowerCase() })
    }

    onPasswordChange = (event) => {
        this.setState({ signInPassword: event.target.value })
    }

    onSubmitSignin = () => {
        const { signInUsername, signInPassword } = this.state;
        if (signInUsername === '' || signInPassword === '') {
            alert('Please enter all of your credentials.')
        } else{
            fetch('http://localhost:3001/signin', {
            method: 'POST',
            headers: {'content-type': 'application/json'},
            body: JSON.stringify({
                    username: signInUsername,
                    password: signInPassword
            })
        })
            .then(response => response.json())
            .then(user => {
                if (user.id) {
                    this.props.loadUser(user);
                    this.props.routeChange('home')
                } else {
                    alert('Incorrect username or password.')
                }
            })
            .catch(alert('Ooops! The server seems to be down. Please come back later.'))
        }
    }

    render() {
        const { routeChange } = this.props;
        return(
            <div className="br3 mv6 w-90 mw6 shadow-5 shadow-hover pa4 center flex-column border" style={{ cursor: 'default' }}>
                <fieldset className="b--transparent">
                    <legend className="f1 fw6 underline-hover">Sign In</legend>
                    <div className="mt3">
                        <label className="db fw6 lh-copy f5">Username:</label>
                        <input className="pa2 b--purple ba bg-transparent hover-bg-black hover-light-purple w-60 inputs"
                        type="text"
                        onChange={ this.onUsernameChange } />
                    </div>
                    <div className="mv3">
                        <label className="db fw6 lh-copy f5">Password:</label>
                        <input className="pa2 b--purple ba bg-transparent hover-bg-black hover-light-purple w-60 inputs"
                            type="password"
                            onChange={ this.onPasswordChange } />
                    </div>
                </fieldset>
                <div>
                    <input className="b ph3 pv2 bg-transparent grow pointer f6"
                        type="submit"
                        value="Login"
                        onClick={ () => routeChange('home') } />
                </div>
                <div className="lh-copy mt3 center">
                    <p onClick={ () => routeChange('register') } className="f6 link dim black pointer ma0">Register</p>
                </div>
            </div>
        )
    }
}

export default SignIn;