import React from "react";
import TeamStats from "./TeamStats";
import PlayerStats from "./PlayerStats";
export default class Stats extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      statType: null,
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    if (event.target.innerText) {
      window.location.hash = "#stats/" + event.target.innerText.toLowerCase();
      this.setState({
        statType: event.target.innerText,
      });
    }
  }

  componentDidMount() {
    window.addEventListener("hashchange", () => {
      if (window.location.hash === "#stats") {
        this.setState({
          statType: null,
        });
      }
    });
  }

  render() {
    if (this.state.statType === "Teams") {
      return <TeamStats />;
    }
    if (this.state.statType === "Players") {
      return <PlayerStats />;
    }
    return (
      <div className="stats-container">
        <div
          id="stat-type-team"
          className="row justify-center"
          onClick={this.handleClick}
        >
          <div className="stat-type">Teams</div>
        </div>
        <div
          id="stat-type-player"
          className="row justify-center"
          onClick={this.handleClick}
        >
          <div className="stat-type">Players</div>
        </div>
      </div>
    );
  }
}
