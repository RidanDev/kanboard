import React, { Component } from "react";
import { connect } from "react-redux";
import { getUserProcesses } from "../actions/dashboard.action";
import "./dashboard.scss";
import DashboardNav from "./dashboard-nav";
import DashboardCard from "./dashboard-card";

class Dashboard extends Component {
  componentDidMount = () => {
    this.props.getUserProcesses();

    let loggedIn = localStorage.getItem("kanboarding");
    if (!loggedIn) {
      this.props.history.push("/login");
    }
  };

  render() {
    return (
      <div className="dashboard">
        <DashboardNav />
        <DashboardCard />
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  getUserProcesses: () => dispatch(getUserProcesses())
});

const mapStateToProps = state => ({
  error: state.dashboard.error
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard);
