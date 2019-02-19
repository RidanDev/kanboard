import React, { Component } from "react";
import { connect } from "react-redux";
import { deleteUserTask, editUserTask } from "../actions/dashboard.action";
import CreateTask from "./dashboard-task";
import ProcessTitle from "./dashboard-process";

class DashboardCard extends Component {
  deleteTask = (processId, taskId) => {
    this.props.deleteUserTask(processId, taskId);
  };

  onDragStart = (event, taskId) => {
    event.dataTransfer.setData("text", taskId);
  };

  onDragOver = event => {
    event.preventDefault();
  };

  onDrop = (event, processId) => {
    event.preventDefault();

    let taskId = event.dataTransfer.getData("text");
    this.props.editUserTask(processId, taskId);
  };

  render() {
    let { processes } = this.props;

    return (
      <div className="dashboard__cards">
        {processes.map(process => (
          <div className="card" key={process._id} onDrop={e => this.onDrop(e, process._id)} onDragOver={this.onDragOver}>
            <div className="card__title">
              <ProcessTitle title={process.title} processId={process._id} />
            </div>

            {process.tasks.map(eachTask => (
              <div className="card__list clearfix" key={eachTask._id} draggable onDragStart={e => this.onDragStart(e, eachTask._id)}>
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
  deleteUserTask: (processId, taskId) => dispatch(deleteUserTask(processId, taskId)),
  editUserTask: (processId, taskId) => dispatch(editUserTask(processId, taskId))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DashboardCard);
