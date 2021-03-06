import React from 'react';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
class Navbar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <Link className="navbar-brand" to="/">{this.props.brand}</Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div className="navbar-nav">
                        <Link className="nav-link active" to="/register">Register <span class="sr-only">(current)</span></Link>
                        <Link className="nav-link active" to="/login">Login <span class="sr-only">(current)</span></Link>
                        <a className="nav-link" href="#">Features</a>
                        <a className="nav-link" href="#">Pricing</a>
                        <a className="nav-link disabled" href="#" tabindex="-1" aria-disabled="true">Disabled</a>
                    </div>
                </div>
                <div>
                    <h3 className="text-white m-1">Welcome, 
                    {this.props.username}</h3>
                </div>
            </nav>
        );
    }
}

// fungsi untuk mengambil data dari reducer/store
const mapStateToProps = (state) => {
    return {
        username: state.authReducer.username,
        role : state.authReducer.role
    }
}

export default connect(mapStateToProps)(Navbar);