import React, { Component } from "react";

class DashboardNav extends Component {
  state = {
    isOpen: false
  };

  toggleOpen = () => {
    this.setState(state => ({
      isOpen: !state.isOpen
    }));
  };

  render() {
    let { isOpen } = this.state;

    return (
      <div className="dashboard__navigation">
        <div>
          {isOpen ? <i className="fas fa-minus" onClick={this.toggleOpen} /> : <i className="fas fa-plus" onClick={this.toggleOpen} />}
          {isOpen && (
            <aside className="input">
              <input type="text" placeholder="Add a Process" />
              <button className="btn--secondary">Create</button>
            </aside>
          )}
        </div>
        <span>User</span>
      </div>
    );
  }
}

export default DashboardNav;
