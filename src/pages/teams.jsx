import React from "react";
import { getPlayerTotals } from "../functions/helper-stats";

export default class Teams extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      team: null,
      player_totals: [],
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    window.location.hash = "#teams/" + event.target.innerText.toLowerCase();
    this.setState({
      team: event.target.innerText,
    });
  }

  componentDidMount() {
    getPlayerTotals()
      .then((playerTotalsData) => {
        this.setState({ player_totals: playerTotalsData });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  render() {
    const teams = this.state.player_totals
      .filter((item, index) => index % 10 === 0)
      .map((team) => {
        return (
          <div
            key={team.team}
            className="teams-row justify-center"
            onClick={this.handleClick}
          >
            <div className="teams-box">
              <div className="row justify-center">{team.team}</div>
            </div>
          </div>
        );
      });
    const playersData = this.state.player_totals.map((player) => {
      const fgPercentage =
        (player.two_made + player.three_made) /
          (player.two_attempts + player.three_attempts) >=
          0 && player.games_played > 0
          ? (
              ((player.two_made + player.three_made) /
                (player.two_attempts + player.three_attempts)) *
              100
            ).toFixed(2) + "%"
          : "-";
      const threePercentage =
        player.three_made / player.three_attempts >= 0 &&
        player.games_played > 0
          ? ((player.three_made / player.three_attempts) * 100).toFixed(2) + "%"
          : "-";
      const ftPercentage =
        player.ft_made / player.ft_attempts >= 0 && player.games_played > 0
          ? ((player.ft_made / player.ft_attempts) * 100).toFixed(2) + "%"
          : "-";

      const ppg =
        player.points / player.games_played >= 0
          ? (player.points / player.games_played).toFixed(2)
          : "-";
      if (player.team === this.state.team) {
        return (
          <tr key={player.name}>
            <td>{player.name}</td>
            <td>{player.games_played}</td>
            <td>
              {player.two_made +
                player.three_made +
                "/" +
                (player.two_attempts + player.three_attempts)}
            </td>
            <td>{fgPercentage}</td>
            <td>{player.three_made + "/" + player.three_attempts}</td>
            <td>{threePercentage}</td>
            <td>{player.ft_made + "/" + player.ft_attempts}</td>
            <td>{ftPercentage}</td>
            <td>{ppg}</td>
          </tr>
        );
      } else {
        return null;
      }
    });

    if (this.state.team === null || window.location.hash === "#teams") {
      return <div className="team-container">{teams}</div>;
    } else {
      return (
        <>
          <div className="row">
            <h1 className="stats-header">{this.state.team}</h1>
          </div>
          <table className="teams-table">
            <tbody>
              <tr>
                <th className="stat-heading">PLAYER</th>
                <th className="stat-heading">GP</th>
                <th className="stat-heading">FG</th>
                <th className="stat-heading">FG%</th>
                <th className="stat-heading">3PT</th>
                <th className="stat-heading">3PT%</th>
                <th className="stat-heading">FT</th>
                <th className="stat-heading">FT%</th>
                <th className="stat-heading">PPG</th>
              </tr>
              {playersData}
            </tbody>
          </table>
        </>
      );
    }
  }
}
