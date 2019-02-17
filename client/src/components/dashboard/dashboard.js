import React, { Component } from "react";
import { connect } from "react-redux";
import "./dashboard.scss";
import DashboardNav from "./dashboard-nav";
import DashboardCard from "./dashboard-card";

class Dashboard extends Component {
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

export default connect(mapStateToProps)(Dashboard);
