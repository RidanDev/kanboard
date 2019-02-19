import React, { Component } from "react";
import { connect } from "react-redux";
import { capitalize } from "../../config";
import { deleteUserProcess, editUserProcess } from "../actions/dashboard.action";

class ProcessTitle extends Component {
  state = {
    title: this.props.title,
    titleOpen: false
  };

  handleChange = e => {
    this.setState({
      title: capitalize(e.target.value)
    });
  };

  handleClose = () => {
    this.setState({
      titleOpen: false
    });
  };

  handleOpen = () => {
    this.setState({
      titleOpen: true
    });
  };

  handleSave = () => {
    this.handleClose();
    let details = { title: this.state.title };
    this.props.editUserProcess(this.props.processId, details);
  };

  render() {
    let { title, titleOpen } = this.state;

    let titleContent = titleOpen ? (
      <>
        <span>
          <input type="text" placeholder="enter process title" value={title} onChange={this.handleChange} autoFocus />
        </span>
        <span>
          <i className="far fa-save" onClick={this.handleSave} />
          <i className="fas fa-times" onClick={this.handleClose} />
        </span>
      </>
    ) : (
      <>
        <span>{title}</span>
        <span>
          <i className="fas fa-edit" onClick={this.handleOpen} />
          <i className="fas fa-trash-alt" onClick={() => this.props.deleteUserProcess(this.props.processId)} />
        </span>
      </>
    );

    return titleContent;
  }
}

const mapDispatchToProps = dispatch => ({
  deleteUserProcess: processId => dispatch(deleteUserProcess(processId)),
  editUserProcess: (processId, details) => dispatch(editUserProcess(processId, details))
});

export default connect(
  null,
  mapDispatchToProps
)(ProcessTitle);
