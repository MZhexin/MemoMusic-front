import React, { Component } from "react";
import Idm from "../services/Idm";
import "../css/common.css";
import {Link} from 'react-router-dom';

class Login extends Component {
  state = {
    name: "",
    password: "",
    loggedIn: 0
  };

  handleSubmit = () => {
    const { handleLogIn } = this.props;
    const { name, password } = this.state;
    this.setState({loggedIn: 1});
    //handleLogIn(name, ""); //remove later
    Idm.login(name, password)
      .then(response => {
        //console.log(response);
        if (response.data === "user name does not exist!") {
          //console.log("user name does not exist!");
          this.setState({loggedIn: -2});
        }
        else if (response.data === "Incorrect Password!") {
          //console.log("Incorrect Password!");
          this.setState({loggedIn: -1});
        }
        else if (response !== undefined){
          //console.log(response.data.start_date);
          if (response.data.music_num === 0) {
            handleLogIn(name, response.data.u_id, response.data.exp_num + 1,  response.data.music_num, response.data.v, response.data.a, response.data.start_date, "", "", "");
          }
          else{
            handleLogIn(name, response.data.u_id, response.data.exp_num,  response.data.music_num, response.data.v, response.data.a, response.data.start_date, response.data.mname, response.data.mid, response.data.murl);
          }

          //console.log(this.state.loggedIn);
        }else{
          alert("User not exist, please register!");
        }
      })
      .catch(error => console.log(error));
  };

  updateField = ({ target }) => {
    const { name, value } = target;
    //console.log(this.state);
    this.setState({ [name]: value });
  };

  render() {
    const { name, password } = this.state;
    if (this.props.loggedIn) {
      return(
        <div>
          <p>您已成功登录</p>
          <Link to="/">返回首页开始实验</Link>
        </div>
      );
    }
    if (this.state.loggedIn === 1) {
      return(
        <div>
          <p>登录中。。。</p>
          <p>请耐心等候</p>
        </div>
      );
    }
    return (
      <div>
        <h1  className="login-title">登录</h1>
        {this.state.loggedIn === -1 &&
          <p  style={{"color": "red"}}>***密码错误，请重新输入</p>
        }
        {this.state.loggedIn === -2 &&
          <p  style={{"color": "red"}}>***用户名不存在，请注册或联系管理员</p>
        }
        <form onSubmit={e => { e.preventDefault(); }}>
          <label className="label">用户名</label>
          <input
            className="input"
            type="text"
            name="name"
            value={name}
            onChange={this.updateField}
          ></input>
          <label className="label">密码</label>
          <input
            className="input"
            type="password"
            name="password"
            value={password}
            onChange={this.updateField}
          ></input>

          <button className="button" onClick={() => this.handleSubmit()}>登录</button>
        </form>
        <Link to="/register"><p>新用户？请前往注册</p></Link>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <p>忘记密码或者遇到其他登录问题，请及时联系管理员Jenny。微信：ljy1297745191</p>
      </div>
    );
  }
}

export default Login;
