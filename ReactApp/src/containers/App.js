import React, { Component } from 'react';
import { array, bool, func, object, string } from 'prop-types';
import { Route, Redirect, Switch, withRouter } from "react-router-dom";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { push } from 'react-router-redux';
import { changeAppLanguage, getState } from "../redux/actions/app";
import { Navigation } from '../components/Navigation';
import { SearchBlock } from '../components/SearchBlock';
import { ItemList } from '../components/ItemList';
import { Login } from '../components/Login';
import { Footer } from '../components/Footer';
import { filterListData } from '../utils/utils';

class App extends Component {
  state = {
    currentPage: 1,
    dataSource: [],
    num: 0,
    searchString: '',
  };

  static propTypes = {
    changeAppLanguage: func.isRequired,
    data: array.isRequired,
    fetching: bool.isRequired,
    getState: func.isRequired,
    goTo: func.isRequired,
    labels: object.isRequired,
    language: string.isRequired,
    location: object.isRequired,
    loggedIn: bool.isRequired,
    user: object.isRequired,
  }

  /* method gets state and articles on app start */
  componentDidMount() {
    this.props.getState();
  }

  componentWillReceiveProps(nextProps) {
    const { dataSource, num } = filterListData(nextProps.data);
    this.setState({
      dataSource,
      num,
    });
  }

  /* method changes search string and filters data by it  */
  handleChange = (term) => {
    const { dataSource, num } = filterListData(this.props.data, term);
    this.setState({ searchString: term, dataSource, num });
  }

  /* method changes page number and filters data by it */
  handleChangePage = (page) => {
    const term = this.state.searchString;
    const { dataSource, num } = filterListData(this.props.data, term, page);
    this.setState({ currentPage: page, dataSource, num });
  }

  render() {
    const { currentPage, dataSource, num, searchString } = this.state;
    const { changeAppLanguage, fetching, goTo, labels, language, location, loggedIn } = this.props;
    if (loggedIn) {
      if (location.pathname === '/login') {
        /* authorized users has not access to /login */
        return <Redirect to='/' />;
      }
    } else {
      if (location.pathname !== '/' && location.pathname !== '/login') {
        /* guests has access only to / and /login */
        return <Redirect to='/login' />;
      }
    }
    const pagination = {
      pageSize: 10,
      current: currentPage,
      total: num,
      onChange: (page => this.handleChangePage(page)),
    };
    return (
      <div className="container">
        <Navigation labels={labels} language={language} handleLangChange={changeAppLanguage} goTo={goTo} />
        <SearchBlock searchString={searchString} handleChange={this.handleChange} />
        <Switch>
          <Route exact path="/login" render={(props) => <Login {...props} labels={labels} language={language} />}/>
          <Route path="/" render={(props) => <ItemList {...props} pagination={pagination} dataSource={dataSource} loading={fetching} />}/>
        </Switch>
        <Footer text={labels.pageFooter[language]} date={new Date().getFullYear()} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  data: state.app.data,
  error: state.app.error,
  fetching: state.app.fetching,
  labels: state.app.labels,
  language: state.app.language,
  loggedIn: state.app.loggedIn,
  user: state.app.user,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      changeAppLanguage,
      getState,
      goTo: (route) => push(route),
    },
    dispatch
  );

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));