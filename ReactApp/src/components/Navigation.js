import React, { Component } from "react";
import { bool, func, object, string } from "prop-types";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { Link } from "react-router-dom";
import { Col, Menu, Row } from "antd";
import { changeAppLanguage } from "../redux/actions/app";
import { logout } from '../redux/actions/auth';

export class Navigation extends Component {
  state = {
    current: null
  };

  static propTypes = {
    changeAppLanguage: func.isRequired,
    goTo: func.isRequired,
    labels: object.isRequired,
    language: string.isRequired,
    loggedIn: bool.isRequired,
    user: object.isRequired,
  };

  handleClick = e => {
    let key = null;
    if (e.key === "language") {
      this.props.changeAppLanguage();
    } else if (e.key === "logout") {
      this.props.logout();
      this.props.goTo("/");
    } else {
      this.props.goTo("/" + e.key);
      key = e.key;
    }
    this.setState({
      current: key
    });
  };

  render() {
    const { labels, language, loggedIn } = this.props;
    return (
      <Row className="header">
        <Col xs={16} sm={17} md={18} xl={20} className="header-title">
          <Link to={"/"}>{labels.pageTitle[language]}</Link>
        </Col>
        <Col xs={8} sm={7} md={6} xl={4}>
          <Menu
            className="top-menu"
            style={{ lineHeight: "72px" }}
            mode="horizontal"
            defaultSelectedKeys={["2"]}
            onClick={this.handleClick}
          >
            <Menu.Item key="language">
              <img
                className="lang-switcher"
                src={"/images/" + language + ".jpg"}
                alt={language}
              />
            </Menu.Item>
            { !loggedIn ? 
              <Menu.Item key="login">{labels.menuLoginButton[language]}</Menu.Item> : 
              <Menu.Item key="logout">{labels.menuLogoutButton[language]}</Menu.Item> }
          </Menu>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = state => ({
  labels: state.app.labels,
  language: state.app.language,
  loggedIn: state.app.loggedIn,
  user: state.app.user,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  changeAppLanguage,
  goTo: (route) => push(route),
  logout,
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Navigation);