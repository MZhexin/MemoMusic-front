import React, { Component } from "react";
import Cookies from "js-cookie";
import Axios from "axios";

import NavBar from "./NavBar";
import Content from "./Content";

class App extends Component {
  constructor(props){
    super(props);

    this.state = {
      loggedIn: false,
      name: "",
      exp_num: 0,
      u_id: -1,
      v: -1,
      a: -1,
      music_num: -1,
      startDate: null,
      endDate: null,
      mname: "",
      murl: "",
      mtype: 0,
      mid: -1
    };

  }

  handleLogIn = (name, u_id, exp_num, music_num, v, a, datetime, mname, mid, murl) => {
    //console.log("handleLogIn");
    this.setState({ loggedIn: true });
    this.setState({ name: name });
    this.setState({ exp_num: exp_num });
    this.setState({ u_id: u_id });
    //console.log(datetime);
    this.setState({startDate: new Date(datetime.replace(' ','T') + 'Z')});
    var date = new Date(datetime.replace(' ','T') + 'Z');
    date.setDate(date.getDate() + 6);
    this.setState({endDate: date});
    if (music_num !== 0) {
      this.setState({ music_num: music_num });
      this.setState({ v: v });
      this.setState({ a: a });
      this.setState({ murl: murl });
      this.setState({ mid: mid });
      this.setState({ mname: mname });
    }
    //console.log(this.state.loggedIn);
  };

  handleLogOut = () => {
    const { common } = Axios.defaults.headers;

    Cookies.remove("email");
    Cookies.remove("session_id");

    delete common["email"];
    delete common["session_id"];

    this.setState({ loggedIn: false });
  };

  render() {
    return (
      <div className="app">
        <NavBar handleLogOut={this.handleLogOut} loggedIn={this.state.loggedIn} name={this.state.name} />
        <Content handleLogOut={this.handleLogOut} handleLogIn={this.handleLogIn} loggedIn={this.state.loggedIn} expNum={this.state.exp_num} uId={this.state.u_id} musicNum={this.state.music_num} v={this.state.v} a={this.state.a} startDate={this.state.startDate} endDate={this.state.endDate} murl={this.state.murl} mid={this.state.mid} mname={this.state.mname}/>
      </div>
    );
  }
}

export default App;
