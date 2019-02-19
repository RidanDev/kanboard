import React, { Component } from "react";
import { connect } from "react-redux";
import { deleteUserTask } from "../actions/dashboard.action";
import CreateTask from "./dashboard-task";
import ProcessTitle from "./dashboard-process";

class DashboardCard extends Component {
  deleteTask = (processId, taskId) => {
    this.props.deleteUserTask(processId, taskId);
  };

  render() {
    let { processes } = this.props;

    return (
      <div className="dashboard__cards">
        {processes.map(process => (
          <div className="card" key={process._id}>
            <div className="card__title">
              <ProcessTitle title={process.title} processId={process._id} />
            </div>

            {process.tasks.map(eachTask => (
              <div className="card__list clearfix" key={eachTask._id}>
                <p>{eachTask.task} </p>
                <i className="fas fa-trash-alt" onClick={() => this.deleteTask(process._id, eachTask._id)} />
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

const mapDispatchToProps = dispatch => ({
  deleteUserTask: (processId, taskId) => dispatch(deleteUserTask(processId, taskId))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DashboardCard);
