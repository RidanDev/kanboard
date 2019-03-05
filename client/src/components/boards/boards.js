import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getUserBoard, createUserBoard, deleteUserBoard } from "../actions/board.action";
import { logoutUser } from "../actions/login.action";
import "./boards.scss";

class Boards extends Component {
  state = {
    name: "",
    formOpen: false
  };
  componentDidMount() {
    let loggedIn = localStorage.getItem("kanboarding");
    if (!loggedIn) {
      this.props.history.push("/login");
    }

    this.props.getUserBoards();
  }

  handleChange = e => {
    this.setState({
      name: e.target.value
    });
  };

  createBoard = e => {
    e.preventDefault();

    this.props.createUserBoard({ name: this.state.name });
    this.setState({ name: "", formOpen: false });
  };

  handleClick = boardId => {
    this.props.history.push(`/boards/${boardId}`);
  };

  toggleOpen = () => {
    this.setState(state => ({
      formOpen: !state.formOpen
    }));
  };

  render() {
    let { userBoards } = this.props;
    let { name, formOpen } = this.state;

    return (
      <div className="board">
        <nav className="nav nav--top">
          <div className="nav__logo">
            <Link to="/boards">#Kanboard</Link>
          </div>
          <div className="nav__user">
            <span>Welcome User!</span>
            <span onClick={() => this.props.logoutUser()}>logout</span>
          </div>
        </nav>

        <section className="board__content">
          <header>Personal Boards</header>

          <aside>
            {userBoards.map(board => (
              <span className="board__card" key={board._id}>
                <span onClick={() => this.handleClick(board._id)}>{board.name}</span>
                <span className="board__card--delete" onClick={() => this.props.deleteUserBoard(board._id)}>
                  Delete
                </span>
              </span>
            ))}

            {formOpen ? (
              <span className="board__card board__card--form">
                <form onSubmit={this.createBoard}>
                  <textarea value={name} onChange={this.handleChange} autoFocus />
                  <button type="submit">Create Board</button>
                  <button onClick={this.toggleOpen}>Cancel</button>
                </form>
              </span>
            ) : (
              <span className="board__card" onClick={this.toggleOpen}>
                Create a board
              </span>
            )}
          </aside>
        </section>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  getUserBoards: () => dispatch(getUserBoard()),
  createUserBoard: details => dispatch(createUserBoard(details)),
  deleteUserBoard: boardId => dispatch(deleteUserBoard(boardId)),
  logoutUser: () => dispatch(logoutUser())
});

const mapStateToProps = state => ({
  userBoards: state.dashboard.boards
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Boards);
