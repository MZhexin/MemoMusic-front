import React, { Component } from 'react';
import Idm from '../services/Idm';
import '../css/common.css';
import { Link } from 'react-router-dom';

class Register extends Component {
  state = {
    uname: '',
    password: '',
    repwd: '',
    utype: 0,
    profession: '',
    age: 0,
    gender: 0,
    expertise: 0,
    love_level: 0,
    submit: 0,
    success: 0,
  };

  handleSubmit = (e) => {
    const {
      uname,
      password,
      repwd,
      utype,
      profession,
      age,
      gender,
      expertise,
      love_level,
    } = this.state;
    this.setState({ success: 1 });
    if (
      uname !== '' &&
      password !== '' &&
      password === repwd &&
      utype !== 0 &&
      profession !== '' &&
      age !== 0 &&
      gender !== 0 &&
      expertise !== 0 &&
      love_level !== 0
    ) {
      Idm.register(
        uname,
        password,
        utype,
        profession,
        age,
        gender,
        expertise,
        love_level
      )
        .then((response) => {
          //console.log(response);
          if (response.data === 'User Already Exist!') {
            this.setState({ success: -1 });
          } else {
            this.setState({ success: 2 });
          }
        })
        .catch((error) => console.log(error));
    }
  };

  updateField = ({ target }) => {
    const { name, value } = target;

    this.setState({ [name]: value });
  };

  selectGender = (e) => {
    this.setState({ gender: e.target.value });
  };

  selectUType = (e) => {
    this.setState({ utype: e.target.value });
  };

  selectAge = (e) => {
    this.setState({ age: e.target.value });
  };

  selectExpertise = (e) => {
    this.setState({ expertise: e.target.value });
  };

  selectLovelevel = (e) => {
    this.setState({ love_level: e.target.value });
  };

  render() {
    const {
      uname,
      password,
      repwd,
      utype,
      profession,
      age,
      gender,
      expertise,
      love_level,
      submit,
      success,
    } = this.state;
    if (success === 2) {
      return (
        <div>
          <p>You have successfully registered</p>
          <p>
            <Link to='/faq'>
              Click here to read the experiment introduction
            </Link>
          </p>
          <p>
            <Link to='/login'>
              Click here to log in and start the experiment
            </Link>
          </p>
        </div>
      );
    }
    if (success === 1) {
      return (
        <div>
          <p>Registering...</p>
          <p>Please be patient</p>
        </div>
      );
    }
    return (
      <div>
        <h1 className='login-title'>Register</h1>
        {success === -1 && (
          <p style={{ color: 'red' }}>***Username is already taken</p>
        )}
        {uname === '' && submit === 1 && (
          <p style={{ color: 'red' }}>***Please enter your username</p>
        )}
        {password === '' && submit === 1 && (
          <p style={{ color: 'red' }}>***Please enter your password</p>
        )}
        {password !== repwd && submit === 1 && (
          <p style={{ color: 'red' }}>
            ***Passwords do not match, please re-enter
          </p>
        )}
        {profession === '' && submit === 1 && (
          <p style={{ color: 'red' }}>***Please enter your profession</p>
        )}
        {gender === 0 && submit === 1 && (
          <p style={{ color: 'red' }}>***Please select your gender</p>
        )}
        {age === 0 && submit === 1 && (
          <p style={{ color: 'red' }}>***Please select your age</p>
        )}
        {utype === 0 && submit === 1 && (
          <p style={{ color: 'red' }}>
            ***Please select your favorite type of music
          </p>
        )}
        {expertise === 0 && submit === 1 && (
          <p style={{ color: 'red' }}>
            ***Please select your level of professional training
          </p>
        )}
        {love_level === 0 && submit === 1 && (
          <p style={{ color: 'red' }}>
            ***Please select your level of love for music
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
            name='uname'
            value={uname}
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
          <label className='label'>Confirm Password</label>
          <input
            className='input'
            type='password'
            name='repwd'
            value={repwd}
            onChange={this.updateField}
          ></input>
          <label className='label'>Profession</label>
          <input
            className='input'
            type='text'
            name='profession'
            value={profession}
            onChange={this.updateField}
          ></input>
          <br />
          <label className='label' style={{ display: 'inline' }}>
            Age:
          </label>
          <select
            value={age}
            onChange={this.selectAge}
            style={{ display: 'inline' }}
          >
            <option value={0}> (None)</option>
            <option value={1}> 10-19 years old</option>
            <option value={2}> 20 -29 years old</option>
            <option value={3}> 30-39 years old</option>
            <option value={4}> 40-49 years old</option>
            <option value={5}> 50-60 years old</option>
            <option value={6}> 61 years old and above</option>
          </select>
          <br />
          <br />
          <label className='label' style={{ display: 'inline' }}>
            Gender:
          </label>
          <select
            value={gender}
            onChange={this.selectGender}
            style={{ display: 'inline' }}
          >
            <option value={0}> (None)</option>
            <option value={1}> Male</option>
            <option value={2}> Female</option>
          </select>
          <br />
          <br />
          <label className='label' style={{ display: 'inline' }}>
            Favorite type of music:
          </label>
          <select
            value={utype}
            onChange={this.selectUType}
            style={{ display: 'inline' }}
          >
            <option value={0}> (None)</option>
            <option value={1}> Classical music</option>
            <option value={2}> Pop music</option>
            <option value={3}> Yanni music</option>
          </select>
          <br />
          <br />
          <label className='label' style={{ display: 'inline' }}>
            Professional training:
          </label>
          <select
            value={expertise}
            onChange={this.selectExpertise}
            style={{ display: 'inline' }}
          >
            <option value={0}> (None)</option>
            <option value={1}> None</option>
            <option value={2}> Have attended hobby classes</option>
            <option value={3}> Received professional training</option>
          </select>
          <br />
          <br />
          <label className='label' style={{ display: 'inline' }}>
            Love for music:
          </label>
          <select
            value={love_level}
            onChange={this.selectLovelevel}
            style={{ display: 'inline' }}
          >
            <option value={0}> (None)</option>
            <option value={1}> Not very fond of music</option>
            <option value={2}> Average</option>
            <option value={3}> Quite fond of music</option>
            <option value={4}> Very fond of music</option>
            <option value={5}>
              {' '}
              A die-hard fan of a certain kind of music
            </option>
          </select>
          <button className='button' onClick={() => this.handleSubmit()}>
            Register
          </button>
        </form>
        <Link to='/login'>
          <p>Already have an account? Click here to log in</p>
        </Link>
      </div>
    );
  }
}

export default Register;
