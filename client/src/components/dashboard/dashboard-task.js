import React, { Component } from "react";
import { connect } from "react-redux";
import { createUserTask } from "../actions/dashboard.action";

class CreateTask extends Component {
  state = {
    taskOpen: false,
    task: ""
  };

  handleChange = e => {
    this.setState({
      task: e.target.value
    });
  };

  toggleOpen = () => {
    this.setState(state => ({
      taskOpen: !state.taskOpen,
      task: ""
    }));
  };

  createTask = e => {
    e.preventDefault();
    let task = { task: this.state.task };
    this.props.createTask(task, this.props.processId);
    this.setState({
      taskOpen: false
    });
  };

  render() {
    let { taskOpen, task } = this.state;

    return (
      <div className="tasker">
        {taskOpen && (
          <form onSubmit={this.createTask} className="tasker__form">
            <textarea name="task" id="task" value={task} onChange={this.handleChange} autoFocus />
            <button className="btn btn--secondary" type="submit">
              Create task
            </button>
          </form>
        )}
        <span onClick={this.toggleOpen}>{taskOpen ? "Close" : "Add a task"}</span>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  createTask: (task, processId) => dispatch(createUserTask(task, processId))
});

export default connect(
  null,
  mapDispatchToProps
)(CreateTask);
