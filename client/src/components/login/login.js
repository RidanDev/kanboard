import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { loginUser } from "../actions/login.action";

class Login extends Component {
  constructor() {
    super();
  }

  state = {
    email: "",
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
    let { email, password } = this.state;
    let payload = { email, password };
    this.props.loginUser(payload);
  };

  render() {
    let { email, password } = this.state;

    return (
      <div className="form-wrapper">
        <form className="form-wrapper__form" onSubmit={this.handleSubmit}>
          <h2>Login To Your Account</h2>
          <fieldset className="form-wrapper__fieldset">
            <div>
              <label htmlFor="email">Email</label>
              <input type="email" id="email" value={email} onChange={this.handleChange} required />
            </div>

            <div>
              <label htmlFor="password">Password</label>
              <input type="password" id="password" value={password} onChange={this.handleChange} required />
            </div>

            <button className="btn btn--primary" type="submit">
              Login
            </button>
            <span>
              No account? <Link to="/signup">register a new account</Link>
            </span>
          </fieldset>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  loginUser: payload => dispatch(loginUser(payload))
});

const mapStateToProps = state => ({
  loggedIn: state.login.loggedIn,
  user: state.login.user
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
