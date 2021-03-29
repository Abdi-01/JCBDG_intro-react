import axios from 'axios';
import React from 'react';
import { URL_API } from '../helper';
import { Redirect } from 'react-router-dom'
import { authLogin } from '../actions'
import { connect } from 'react-redux'

class LoginPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            alertShow: 'none',
            redirect: false
        }
    }

    onBtLogin = () => {
        axios.get(URL_API + `/tb_user?username=${this.inUsername.value}&password=${this.inPass.value}`)
            .then(res => {
                if (res.data.length > 0) {
                    // menjalankan fungsi action
                    this.props.authLogin(res.data[0])
                    this.setState({ redirect: true })
                    console.log('Login Success ✔')
                } else {
                    this.setState({ alertShow: 'block' })
                    setTimeout(() => this.setState({ alertShow: 'none' }), 3000)
                }
                this.inUsername.value = ''
                this.inPass.value = ''
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

/**
 * connect : untuk menghubungkan action atau reducer dengan sistem redux
 * connect(param1, {..param2})
 * param1: berisi fungsi untuk mengambil data dari reducer/store, diisi jika dibutuhkan
 * ...param2 : berisi fungsi-fungsi action yang akan digunakan, diisi jika dibutuhkan
 *  */
export default connect(null, { authLogin })(LoginPage);