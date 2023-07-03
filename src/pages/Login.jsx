import React, { Component } from 'react';
import Idm from '../services/Idm';
import '../css/common.css';
import { Link } from 'react-router-dom';

class Login extends Component {
  state = {
    name: '',
    password: '',
    loggedIn: 0,
  };

  handleSubmit = () => {
    const { handleLogIn } = this.props;
    const { name, password } = this.state;
    this.setState({ loggedIn: 1 });
    //handleLogIn(name, ""); //remove later
    Idm.login(name, password)
      .then((response) => {
        //console.log(response);
        if (response.data === 'user name does not exist!') {
          //console.log("user name does not exist!");
          this.setState({ loggedIn: -2 });
        } else if (response.data === 'Incorrect Password!') {
          //console.log("Incorrect Password!");
          this.setState({ loggedIn: -1 });
        } else if (response !== undefined) {
          //console.log(response.data.start_date);
          if (response.data.music_num === 0) {
            handleLogIn(
              name,
              response.data.u_id,
              response.data.exp_num + 1,
              response.data.music_num,
              response.data.v,
              response.data.a,
              response.data.start_date,
              '',
              '',
              ''
            );
          } else {
            handleLogIn(
              name,
              response.data.u_id,
              response.data.exp_num,
              response.data.music_num,
              response.data.v,
              response.data.a,
              response.data.start_date,
              response.data.mname,
              response.data.mid,
              response.data.murl
            );
          }

          //console.log(this.state.loggedIn);
        } else {
          alert('User not exist, please register!');
        }
      })
      .catch((error) => console.log(error));
  };

  updateField = ({ target }) => {
    const { name, value } = target;
    //console.log(this.state);
    this.setState({ [name]: value });
  };

  render() {
    const { name, password } = this.state;
    if (this.props.loggedIn) {
      return (
        <div>
          <p>You have successfully logged in.</p>
          <Link to='/'>Go back to the homepage to start the experiment.</Link>
        </div>
      );
    }
    if (this.state.loggedIn === 1) {
      return (
        <div>
          <p>Logging in...</p>
          <p>Please wait patiently.</p>
        </div>
      );
    }
    return (
      <div>
        <h1 className='login-title'>Login</h1>
        {this.state.loggedIn === -1 && (
          <p style={{ color: 'red' }}>
            ***Incorrect password. Please re-enter.
          </p>
        )}
        {this.state.loggedIn === -2 && (
          <p style={{ color: 'red' }}>
            ***Username does not exist. Please register or contact the
            administrator.
          </p>
        )}
        <form
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <label className='label'>Username</label>
          <input
            className='input'
            type='text'
            name='name'
            value={name}
            onChange={this.updateField}
          ></input>
          <label className='label'>Password</label>
          <input
            className='input'
            type='password'
            name='password'
            value={password}
            onChange={this.updateField}
          ></input>

          <button className='button' onClick={() => this.handleSubmit()}>
            Login
          </button>
        </form>
        <Link to='/register'>
          <p>New user? Click here to register.</p>
        </Link>
        <br />
        <br />
        <br />
        <br />
        <br />
        <p>
          If you forgot your password or encounter any other login issues,
          please contact the administrator promptly. WeChat: szxh20190131.
        </p>
      </div>
    );
  }
}

export default Login;
