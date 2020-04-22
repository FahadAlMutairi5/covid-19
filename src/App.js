import React, { Component } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import * as actionCreators from "./store/actions/";
import Home from "./components/Home";
import Detail from "./components/Detail";


class App extends Component {
  timer = "";
  async componentDidMount(){
    await this.props.fetchReports()
    this.timer = setInterval(
      () =>
      this.props.fetchReports(),300000
    );
    
  }
  componentWillUnmount(){
    clearInterval(this.timer);
  }
  render() {
    return (
      <div style={{direction:"rtl"}}>
        <Switch>
          <Route path="/Home" component={Home}/>
          <Route path="/Detail" component={Detail}/>
          <Redirect to="/Home"/>
        </Switch>
      </div>
    );
  }
}


const mapDispatchToProps = dispatch => ({
  fetchReports: () =>
    dispatch(actionCreators.fetchReports())
});
export default connect(
  null,
  mapDispatchToProps
)(App);
