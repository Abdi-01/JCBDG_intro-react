import axios from 'axios';
import React from 'react';
import { URL_API } from '../helper';
import { Redirect } from 'react-router-dom'

class LoginPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            alertShow: 'none',
            redirect: false
        }
    }

    onBtLogin = () => {
        this.inUsername.value = ''
        this.inPass.value = ''
        axios.get(URL_API + `/tb_user?username=${this.inUsername.value}&password=${this.inPass.value}`)
            .then(res => {
                if (res.data.length > 0) {
                    this.setState({ redirect: true })
                    console.log('Login Success ✔')
                } else {
                    this.setState({ alertShow: 'block' })
                    setTimeout(() => this.setState({ alertShow: 'none' }), 3000)
                }
            })
            .catch(err => console.log(err))
    }

    render() {
        if (this.state.redirect) {
            console.log('Redirect')
            return <Redirect to='/' />
        }
        return (
            <div style={{ width: '30vw', margin: 'auto' }}>
                <h3>Login Page</h3>
                <div className="alert alert-danger" style={{ display: this.state.alertShow }} role="alert">
                    Account not found !
               </div>
                <form>
                    <div className="input-group">
                        <input className="form-control" placeholder="Username" type="text" ref={el => this.inUsername = el} />
                    </div>
                    <div className="input-group">
                        <input className="form-control" placeholder="Password" type="password" ref={el => this.inPass = el} />
                    </div>
                    <button type="button" className="btn btn-primary" onClick={this.onBtLogin}>Login</button>
                </form>
            </div>
        );
    }
}

export default LoginPage;