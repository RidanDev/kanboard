import React, { Component } from "react";
import { connect } from "react-redux";
import { createUserProcess, getUserProcesses } from "../actions/dashboard.action";

class DashboardNav extends Component {
  state = {
    isOpen: false,
    process: ""
  };

  toggleOpen = () => {
    this.setState(state => ({
      isOpen: !state.isOpen
    }));
  };

  handleChange = e => {
    this.setState({
      process: e.target.value
    });
  };

  createProcess = e => {
    e.preventDefault();
    let process = { title: this.state.process };

    this.props.createProcess(process);
    this.setState({
      isOpen: false
    });
  };

  render() {
    let { isOpen, process } = this.state;

    return (
      <div className="dashboard__navigation">
        <div>
          {isOpen ? <i className="fas fa-minus" onClick={this.toggleOpen} /> : <i className="fas fa-plus" onClick={this.toggleOpen} />}
          {isOpen && (
            <form onSubmit={this.createProcess} className="input">
              <input type="text" placeholder="Add a Process" value={process} onChange={this.handleChange} required />
              <button className="btn--secondary" type="submit">
                Create
              </button>
            </form>
          )}
        </div>
        <span>User</span>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  createProcess: process => dispatch(createUserProcess(process)),
  getUserProcess: () => dispatch(getUserProcesses())
});

export default connect(
  null,
  mapDispatchToProps
)(DashboardNav);
