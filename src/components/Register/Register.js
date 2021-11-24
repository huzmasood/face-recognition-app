import React, { Component } from 'react';

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            username: '',
            email: '',
            password: '',
            repassword: '',
            notRobot: false
        }
    };

    onNameChange = (event) => {
        this.setState({ name: event.target.value })
    }

    onUsernameChange = (event) => {
        this.setState({ username: event.target.value.toLowerCase() })
    }

    onEmailChange = (event) => {
        this.setState({ email: event.target.value })
    }

    onPasswordChange = (event) => {
        this.setState({ password: event.target.value })
    }

    onRePasswordChange = (event) => {
        this.setState({ repassword: event.target.value })
    }

    onRoboCheck = (event) => {
        this.setState({ notRobot: document.getElementById('checkbox').checked })
    }

    onSubmitRegister = () => {
        const { name, username, email, password, repassword, notRobot } = this.state;
        if (name === '' || username === '' || password === '' || repassword === '') {
            alert('Please enter all of your credentials.')
        } else if (username.includes(" ")) {
            alert('Username cannot have space.')
        } else if (password !== repassword) {
            alert('Passwords do not match.')
        } else if (!notRobot) {
            alert("Please confirm you're not a robot.")
        } else {
            fetch('http://localhost:3001/register', {
            method: 'POST',
            headers: {'content-type': 'application/json'},
            body: JSON.stringify({
                    name: name,
                    username: username,
                    email: email,
                    password: password
            })
        })
            .then(response => response.json())
            .then(user => {
                if (user) {
                    this.props.loadUser(user);
                    this.props.routeChange('home')
                }
            })
            .catch(alert('Ooops! The server seems to be down. Please come back later.'))
        }
    };

    render () {
        const { routeChange } = this.props;
        return(
            <div className="br3 mv5 w-90 mw6 shadow-5 shadow-hover ph3 pb4 center flex-column border" style={{ cursor: 'default' }}>
                <div className="start">
                    <p onClick={ () => routeChange('signin') } className="f1 ma0 grow-large lh-solid pointer">⬅</p>
                </div>
                <fieldset className="b--transparent">
                    <legend className="f1 fw6 underline-hover">Register</legend>
                    <div className="mt3">
                        <label className="db fw6 lh-copy f5">Name:</label>
                        <input className="pa2 b--dark-blue ba bg-transparent hover-bg-black hover-blue w-60 inputs"
                            type="text"
                            onChange={ this.onNameChange } />
                    </div>
                    <div className="mt3">
                        <label className="db fw6 lh-copy f5">Username:</label>
                        <input className="pa2 b--dark-blue ba bg-transparent hover-bg-black hover-blue w-60 inputs"
                            type="text"
                            onChange={ this.onUsernameChange } />
                    </div>
                    <div className="mt3">
                        <label className="db fw6 lh-copy f5">Email:</label>
                        <input className="pa2 b--dark-blue ba bg-transparent hover-bg-black hover-blue w-60 inputs"
                            type="email"
                            onChange={ this.onEmailChange } />
                    </div>
                    <div className="mt3">
                        <label className="db fw6 lh-copy f5">Password:</label>
                        <input className="pa2 b--dark-blue ba bg-transparent hover-bg-black hover-blue w-60 inputs"
                            type="password"
                            onChange={ this.onPasswordChange } />
                    </div>
                    <div className="mv3">
                        <label className="db fw6 lh-copy f5">Re-enter Password:</label>
                        <input className="pa2 b--dark-blue ba bg-transparent hover-bg-black hover-blue w-60 inputs"
                            type="password"
                            onChange={ this.onRePasswordChange } />
                    </div>
                    <label className="lh-copy f6 fw6"><input type="checkbox" id="checkbox" onChange={ this.onRoboCheck } /> I'm not a robot</label>
                </fieldset>
                <div>
                    <input className="b ph3 pv2 bg-transparent grow pointer f6"
                        type="submit"
                        value="Sign Up" 
                        onClick={ () => routeChange('home') } />
                </div>
            </div>
        )
    }
}

export default Register;