import React, { Component } from "react";
import { func, object, string } from "prop-types";
import { Link } from "react-router-dom";
import { Col, Menu, Row } from "antd";

export class Navigation extends Component {
  state = {
    current: null
  };

  static propTypes = {
    goTo: func.isRequired,
    handleLangChange: func.isRequired,
    labels: object.isRequired,
    lang: string.isRequired
  };

  handleClick = e => {
    if (e.key === "language") {
      this.props.handleLangChange();
    } else {
      this.props.goTo("/" + e.key);
    }
    this.setState({
      current: e.key
    });
  };

  render() {
    const { labels, lang } = this.props;
    return (
      <Row className="header">
        <Col xs={16} sm={17} md={18} xl={20} className="header-title">
          <Link to={"/"}>{labels.pageTitle[lang]}</Link>
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
                src={"/images/" + lang + ".jpg"}
                alt={lang}
              />
            </Menu.Item>
            <Menu.Item key="login">{labels.menuLoginButton[lang]}</Menu.Item>
          </Menu>
        </Col>
      </Row>
    );
  }
}
