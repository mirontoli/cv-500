import React, { Component } from "react";
import { array, bool, func, object, string } from "prop-types";
import { Route, Redirect, Switch, withRouter } from "react-router-dom";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { getState } from "../redux/actions/app";
import { Spin, Icon } from "antd";
import Navigation from "../components/Navigation";
import { SearchBlock } from "../components/SearchBlock";
import { ItemList } from "../components/ItemList";
import Login from "../components/Login";
import { Footer } from "../components/Footer";
import EditArticle from "../components/EditForm/EditArticle";
import { Aux, filterListData } from "../utils/utils";

class App extends Component {
  state = {
    currentPage: 1,
    dataSource: [],
    num: 0,
    searchString: ""
  };

  static propTypes = {
    appLoaded: bool.isRequired,
    data: array.isRequired,
    error: string.isRequired,
    fetching: bool.isRequired,
    getState: func.isRequired,
    labels: object.isRequired,
    language: string.isRequired,
    location: object.isRequired,
    loggedIn: bool.isRequired,
    user: object.isRequired
  };

  /* method gets state and articles on app start */
  componentDidMount() {
    this.props.getState();
  }

  componentWillReceiveProps(nextProps) {
    const { dataSource, num } = filterListData(nextProps.data);
    this.setState({
      dataSource,
      num
    });
  }

  /* method changes search string and filters data by it  */
  handleChange = term => {
    const { dataSource, num } = filterListData(this.props.data, term);
    this.setState({ searchString: term, dataSource, num });
  };

  /* method changes page number and filters data by it */
  handleChangePage = page => {
    const term = this.state.searchString;
    const { dataSource, num } = filterListData(this.props.data, term, page);
    this.setState({ currentPage: page, dataSource, num });
  };

  render() {
    const { currentPage, dataSource, num, searchString } = this.state;
    const {
      appLoaded,
      fetching,
      labels,
      language,
      location,
      loggedIn
    } = this.props;
    const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;
    const url = location.pathname.split("/");
    if (appLoaded) {
      if (loggedIn) {
        if (url[1] === "login") {
          /* authorized users has not access to /login */
          return <Redirect to="/" />;
        }
      } else {
        if (location.pathname !== "/" && url[1] !== "login") {
          /* guests has access only to / and /login */
          return <Redirect to="/login" />;
        }
      }
    }
    const pagination = {
      pageSize: 10,
      current: currentPage,
      total: num,
      onChange: page => this.handleChangePage(page)
    };
    return (
      <div className="container">
        {appLoaded ? (
          <Aux>
            <Navigation />
            {url[1] !== "login" && url[1] !== "edit" ? (
              <SearchBlock
                searchString={searchString}
                handleChange={this.handleChange}
              />
            ) : null}
            <Switch>
              <Route exact path="/login" component={Login} />
              <Route
                exact
                path="/edit/:id"
                render={props => <EditArticle {...props} />}
              />
              <Route
                path="/"
                render={props => (
                  <ItemList
                    {...props}
                    pagination={pagination}
                    dataSource={dataSource}
                    loading={fetching}
                    loggedIn={loggedIn}
                  />
                )}
              />
            </Switch>
            <Footer
              text={labels.pageFooter[language]}
              date={new Date().getFullYear()}
            />
          </Aux>
        ) : (
          <Spin
            style={{ width: "100%", textAlign: "center" }}
            indicator={antIcon}
          />
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  appLoaded: state.app.appLoaded,
  data: state.app.data,
  error: state.app.error,
  fetching: state.app.fetching,
  labels: state.app.labels.app,
  language: state.app.language,
  loggedIn: state.app.loggedIn,
  user: state.app.user
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getState
    },
    dispatch
  );

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
