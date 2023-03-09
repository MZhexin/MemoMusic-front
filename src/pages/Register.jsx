import React, { Component } from "react";
import Idm from "../services/Idm";
import "../css/common.css";
import {Link} from 'react-router-dom';

class Register extends Component {
  state = {
    uname: "",
    password: "",
    repwd: "",
    utype: 0,
    profession: "",
    age: 0,
    gender: 0,
    expertise: 0,
    love_level: 0,
    submit: 0,
    success: 0
  };

  handleSubmit = e => {
    const { uname, password, repwd, utype, profession, age, gender, expertise, love_level } = this.state;
    this.setState({success: 1});
    if (uname !== "" && password !== "" && password === repwd && utype !== 0 && profession !== "" && age !== 0 && gender !== 0 && expertise !== 0 && love_level !== 0) {
      Idm.register(uname, password, utype, profession, age, gender, expertise, love_level)
        .then(response => {
          //console.log(response);
          if (response.data === "User Already Exist!") {
            this.setState({success: -1});
          }else{
            this.setState({success: 2});
          }
        })
        .catch(error => console.log(error));
    }
  };

  updateField = ({ target }) => {
    const { name, value } = target;

    this.setState({ [name]: value });
  };

  selectGender = (e) => {
    this.setState({gender: e.target.value});
  }

  selectUType = (e) => {
    this.setState({utype: e.target.value});
  }

  selectAge = (e) => {
    this.setState({age: e.target.value});
  }

  selectExpertise = (e) => {
    this.setState({expertise: e.target.value});
  }

  selectLovelevel = (e) => {
    this.setState({love_level: e.target.value});
  }

  render() {
    const { uname, password, repwd, utype, profession, age, gender, expertise, love_level, submit, success } = this.state;
    if (success === 2) {
      return(
        <div>
          <p>您已成功注册</p>
          <p><Link to="/faq">点此阅读实验介绍</Link></p>
          <p><Link to="/login">点此登录开始实验</Link></p>
        </div>
      );
    }
    if (success === 1) {
      return(
        <div>
          <p>注册中。。。</p>
          <p>请耐心等候</p>
        </div>
      );
    }
    return (
      <div>
        <h1 className="login-title">注册</h1>
        {success === -1 &&
          <p  style={{"color": "red"}}>***该用户名已被占用</p>
        }
        {uname === "" && submit === 1 &&
          <p  style={{"color": "red"}}>***请填写您的用戶名</p>
        }
        {password === "" && submit === 1 &&
          <p  style={{"color": "red"}}>***请填写您的密码</p>
        }
        {password !== repwd && submit === 1 &&
          <p  style={{"color": "red"}}>***密码不匹配，请重新输入</p>
        }
        {profession === "" && submit === 1 &&
          <p  style={{"color": "red"}}>***请填写您的职业</p>
        }
        {gender === 0 && submit === 1 &&
          <p  style={{"color": "red"}}>***请选择您的性别</p>
        }
        {age === 0 && submit === 1 &&
          <p  style={{"color": "red"}}>***请选择您的年龄</p>
        }
        {utype === 0 && submit === 1 &&
          <p  style={{"color": "red"}}>***请选择您喜爱的音乐类型</p>
        }
        {expertise === 0 && submit === 1 &&
          <p  style={{"color": "red"}}>***请选择您受过专业训练的程度</p>
        }
        {love_level === 0 && submit === 1 &&
          <p  style={{"color": "red"}}>***请选择您喜爱音乐的程度</p>
        }
        <form  onSubmit={e => { e.preventDefault(); }}>
          <label className="label">用户名</label>
          <input
            className="input"
            type="text"
            name="uname"
            value={uname}
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
          <label className="label">确认密码</label>
          <input
            className="input"
            type="password"
            name="repwd"
            value={repwd}
            onChange={this.updateField}
          ></input>
          <label className="label">职业</label>
          <input
            className="input"
            type="text"
            name="profession"
            value={profession}
            onChange={this.updateField}
          ></input>
          <br />
          <label className="label" style={{display: "inline"}}>年龄:</label>
          <select value={age} onChange={this.selectAge} style={{display: "inline"}}>
            <option value={0}> （空）</option>
            <option value={1}> 10岁-19岁</option>
            <option value={2}> 20岁-29岁</option>
            <option value={3}> 30岁-39岁</option>
            <option value={4}> 40岁-49岁</option>
            <option value={5}> 50岁-60岁</option>
            <option value={6}> 61岁及以上</option>
          </select>
          <br />
          <br />
          <label className="label" style={{display: "inline"}}>性别:</label>
          <select value={gender} onChange={this.selectGender} style={{display: "inline"}}>
            <option value={0}> （空）</option>
            <option value={1}> 男</option>
            <option value={2}> 女</option>
          </select>
          <br />
          <br />
          <label className="label" style={{display: "inline"}}>最喜欢哪种音乐类型:</label>
          <select value={utype} onChange={this.selectUType} style={{display: "inline"}}>
            <option value={0}> （空）</option>
            <option value={1}> 古典音乐</option>
            <option value={2}> 流行乐</option>
            <option value={3}> 雅尼音乐</option>
          </select>
          <br />
          <br />
          <label className="label" style={{display: "inline"}}>有无专业训练:</label>
          <select value={expertise} onChange={this.selectExpertise} style={{display: "inline"}}>
            <option value={0}> （空）</option>
            <option value={1}> 没有</option>
            <option value={2}> 上过兴趣班</option>
            <option value={3}> 受过专业培训</option>
          </select>
          <br />
          <br />
          <label className="label" style={{display: "inline"}}>喜欢音乐的程度:</label>
          <select value={love_level} onChange={this.selectLovelevel} style={{display: "inline"}}>
            <option value={0}> （空）</option>
            <option value={1}> 不太爱听音乐</option>
            <option value={2}> 一般般</option>
            <option value={3}> 比较爱听音乐</option>
            <option value={4}> 非常爱听音乐</option>
            <option value={4}> 某种音乐的狂热爱好者</option>
          </select>
          <button className="button" onClick={() => this.handleSubmit()}>注册</button>
        </form>
        <Link to="/login"><p>已有账号？点此登录</p></Link>
      </div>
    );
  }
}

export default Register;
