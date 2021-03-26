import axios from 'axios';
import React from 'react';
import { URL_API } from '../helper';

class RegisterPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dataUser: [],
            selectedIdx: null
        }
    }

    componentDidMount() {
        this.getDataUser()
    }

    getDataUser = () => {
        axios.get(URL_API + '/tb_user').then(res => {
            console.log(res.data)
            this.setState({ dataUser: res.data })
        }).catch(err => {
            console.log(err)
        })
    }

    onBtRegis = () => {
        let username = this.inUsername.value
        let password = this.inPassword.value
        let role = this.inRole.value
        console.log(username, password, role)

        axios.post(URL_API + '/tb_user', {
            username, password, role
        })
            .then(res => this.getDataUser()).catch(err => console.log(err))
    }

    printData = () => {
        return this.state.dataUser.map((item, index) => {
            if (this.state.selectedIdx == index) {
                return <tr>
                    <td>{index + 1}</td>
                    <th><input className="form-control" type="text" ref={elemen => this.newUsername = elemen} placeholder="Username" defaultValue={item.username} /></th>
                    <th><input className="form-control" type="text" ref={elemen => this.newPassword = elemen} placeholder="Password" defaultValue={item.password} /></th>
                    <th><select className="form-control" type="text" ref={elemen => this.newRole = elemen} placeholder="Password" defaultValue={item.role}>
                        <option value="admin">Admin</option>
                        <option value="user">User</option>
                    </select></th>
                    <th><button type="button" className="btn btn-outline-warning" >Save</button>
                        <button type="button" className="btn btn-outline-danger" onClick={() => this.setState({ selectedIdx: null })}>Cancel</button></th>
                </tr>
            } else {
                return <tr>
                    <td>{index + 1}</td>
                    <td>{item.username}</td>
                    <td>{item.password}</td>
                    <td>{item.role}</td>
                    <td><button type="button" className="btn btn-warning" onClick={() => this.setState({ selectedIdx: index })}>Edit</button><button type="button" className="btn btn-danger">Delete</button></td>
                </tr>
            }
        })
    }

    onBtIdx = (idx) => {
        this.setState({ selectedIdx: idx })
    }

    render() {
        return (
            <div className="container text-center">
                <h1>Register</h1>
                <table className="table">
                    <thead className="thead-dark">
                        <tr>
                            <th>No</th>
                            <th>Username</th>
                            <th>Password</th>
                            <th>Role</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.printData()}
                    </tbody>
                    <tfoot>
                        <tr>
                            <th>#</th>
                            <th><input className="form-control" type="text" ref={elemen => this.inUsername = elemen} placeholder="Username" /></th>
                            <th><input className="form-control" type="text" ref={elemen => this.inPassword = elemen} placeholder="Password" /></th>
                            <th><select className="form-control" type="text" ref={elemen => this.inRole = elemen} placeholder="Password">
                                <option value="admin">Admin</option>
                                <option value="user">User</option>
                            </select></th>
                            <th><button type="button" className="btn btn-info" onClick={this.onBtRegis}>Submit</button></th>
                        </tr>
                    </tfoot>
                </table>
            </div>
        );
    }
}

export default RegisterPage;