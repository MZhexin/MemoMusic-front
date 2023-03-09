import React, { Component } from "react";
import { NavLink, Link } from "react-router-dom";
import {Navbar, Nav} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import "./css/style.css";

class NavBar extends Component {
  render() {
    const { handleLogOut, loggedIn, name } = this.props;
    return (
      <Navbar style={{background: "#141a20"}} variant="dark" expand="lg">
        <Link to="/"><Navbar.Brand>音乐推荐实验</Navbar.Brand></Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <NavLink to="/faq" className="navbar-nav nav-link mr-auto" style={{"color": "#999999"}}>
              项目介绍
          </NavLink>
          <Nav>
            {!loggedIn &&
                <NavLink to="/login" className="nav-link">
                  登录
                </NavLink>
            }
            {!loggedIn &&
              <NavLink to="/register" className="nav-link">
                注册
              </NavLink>
            }
            {loggedIn &&
                <Nav.Link>{"你好，"+name}</Nav.Link>
            }
            {loggedIn &&
                <Nav.Link onClick={() => handleLogOut()}>退出</Nav.Link>
            }
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default NavBar;
