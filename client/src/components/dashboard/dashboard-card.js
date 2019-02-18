import React, { Component } from "react";
import { connect } from "react-redux";
import { getUserProcesses } from "../actions/dashboard.action";
import CreateTask from "./dashboard-task";

class DashboardCard extends Component {
  render() {
    let { processes } = this.props;

    return (
      <div className="dashboard__cards">
        {processes.map(process => (
          <div className="card" key={process._id}>
            <div className="card__title">
              <span>{process.title}</span>
              <span>
                <i className="fas fa-edit" />
                <i className="fas fa-trash-alt" />
              </span>
            </div>

            {process.tasks.map(eachTask => (
              <div className="card__list clearfix" key={eachTask._id}>
                <p>{eachTask.task} </p>
                <i className="fas fa-trash-alt" />
              </div>
            ))}

            <CreateTask processId={process._id} />
          </div>
        ))}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  processes: state.dashboard.processes
});

/* const mapDispatchToProps = dispatch => ({
  getUserProcesses: () => dispatch(getUserProcesses())
}); */

export default connect(
  mapStateToProps
  // mapDispatchToProps
)(DashboardCard);
