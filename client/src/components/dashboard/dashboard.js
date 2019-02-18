import React, { Component } from "react";
import { connect } from "react-redux";
import { getUserProcesses } from "../actions/dashboard.action";
import "./dashboard.scss";
import DashboardNav from "./dashboard-nav";
import DashboardCard from "./dashboard-card";

class Dashboard extends Component {
  componentDidMount = () => {
    this.props.getUserProcesses();
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

const mapStateToProps = state => {
  return {
    dashboard: state.dashboard
  };
};

const mapDispatchToProps = dispatch => ({
  getUserProcesses: () => dispatch(getUserProcesses())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard);
