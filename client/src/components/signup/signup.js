import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { signupUser } from "../actions/signup.action";

class Signup extends Component {
  state = {
    name: "",
    email: "",
    username: "",
    password: ""
  };

  componentDidMount() {
    let loggedIn = localStorage.getItem("kanboarding");
    if (loggedIn) {
      this.props.history.push("/");
    }
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    let { name, email, username, password } = this.state;
    let payload = { name, email, username, password };
    this.props.signupUser(payload);
  };

  render() {
    let { name, email, username, password } = this.state;

    return (
      <div className="form-wrapper">
        <form className="form-wrapper__form" onSubmit={this.handleSubmit}>
          <h2>Create an account</h2>
          <fieldset className="form-wrapper__fieldset">
            <div>
              <label htmlFor="name">Name</label>
              <input type="text" id="name" value={name} onChange={this.handleChange} />
            </div>

            <div>
              <label htmlFor="email">Email</label>
              <input type="email" id="email" value={email} onChange={this.handleChange} />
            </div>

            <div>
              <label htmlFor="username">Username</label>
              <input type="text" id="username" value={username} onChange={this.handleChange} />
            </div>

            <div>
              <label htmlFor="password">Password</label>
              <input type="password" id="password" value={password} onChange={this.handleChange} />
            </div>

            <button className="btn btn--primary" type="submit">
              Create New Account
            </button>

            <span>
              Or <Link to="/login">Login into your account</Link>
            </span>
          </fieldset>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  signupUser: payload => dispatch(signupUser(payload))
});

export default connect(
  null,
  mapDispatchToProps
)(Signup);
