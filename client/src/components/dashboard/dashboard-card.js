import React, { Component } from "react";

class DashboardCard extends Component {
  render() {
    return (
      <div className="dashboard__cards">
        <div className="card">
          <div className="card__title">
            <span>Todo</span>
            <span>
              <i className="fas fa-edit" />
              <i className="fas fa-trash-alt" />
            </span>
          </div>

          <div className="card__list clearfix">
            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Beatae nemo aspernatur vel sapiente corporis impedit, harum voluptatum tempora quasi laborum facilis molestias, tenetur </p>
            <i className="fas fa-trash-alt" />
          </div>

          <div className="card__list clearfix">
            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Beatae nemo aspernatur vel sapiente corporis impedit, harum voluptatum tempora quasi laborum facilis molestias, tenetur </p>
            <i className="fas fa-trash-alt" />
          </div>
        </div>
      </div>
    );
  }
}

export default DashboardCard;
