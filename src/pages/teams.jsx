import React from "react";
import { getPlayerTotals } from "../helpers/get-player-totals";

export default class Teams extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      team: null,
      player_totals: [],
      isLoading: true,
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
        this.setState({ player_totals: playerTotalsData, isLoading: false });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  render() {
    if (this.state.isLoading) {
      return <div className="loader"></div>;
    }

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
              <div className="row justify-center touch-target">{team.team}</div>
            </div>
          </div>
        );
      });

    const playersData = this.state.player_totals.map((player) => {
      let fgPercentage = !isNaN(
        (player.two_made + player.three_made) /
          (player.two_attempts + player.three_attempts)
      )
        ? (
            ((player.two_made + player.three_made) /
              (player.two_attempts + player.three_attempts)) *
            100
          ).toFixed(1) + "%"
        : "-";
      const threePercentage =
        player.three_made / player.three_attempts >= 0 &&
        player.games_played > 0
          ? ((player.three_made / player.three_attempts) * 100).toFixed(1) + "%"
          : "-";
      const ftPercentage =
        player.ft_made / player.ft_attempts >= 0 && player.games_played > 0
          ? ((player.ft_made / player.ft_attempts) * 100).toFixed(1) + "%"
          : "-";

      const ppg =
        player.points / player.games_played >= 0
          ? (player.points / player.games_played).toFixed(1)
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

    const teamTotals = (playersData, team) => {
      let total = playersData
        .filter((playerTotal) => playerTotal.team === team)
        .reduce(
          (acc, player) => {
            acc.games_played = Math.max(acc.games_played, player.games_played);
            acc.two_made += player.two_made;
            acc.two_attempts += player.two_attempts;
            acc.three_made += player.three_made;
            acc.three_attempts += player.three_attempts;
            acc.ft_made += player.ft_made;
            acc.ft_attempts += player.ft_attempts;
            acc.points += player.points;
            return acc;
          },
          {
            games_played: 0,
            two_made: 0,
            two_attempts: 0,
            three_made: 0,
            three_attempts: 0,
            ft_made: 0,
            ft_attempts: 0,
            points: 0,
          }
        );

      let fg =
        total.two_made +
        total.three_made +
        "/" +
        (total.two_attempts + total.three_attempts);
      let fg_percentage =
        (
          ((total.two_made + total.three_made) /
            (total.two_attempts + total.three_attempts)) *
          100
        ).toFixed(2) + "%";

      let three_percentage =
        ((total.three_made / total.three_attempts) * 100).toFixed(2) + "%";
      let ft_percentage =
        ((total.ft_made / total.ft_attempts) * 100).toFixed(2) + "%";
      let ppg = (total.points / total.games_played).toFixed(2);

      return (
        <tr className="totals-row">
          <td>Total</td>
          <td>{total.games_played}</td>
          <td>{fg}</td>
          <td>{fg_percentage}</td>
          <td>{total.three_made + "/" + total.three_attempts}</td>
          <td>{three_percentage}</td>
          <td>{total.ft_made + "/" + total.ft_attempts}</td>
          <td>{ft_percentage}</td>
          <td>{ppg}</td>
        </tr>
      );
    };

    if (this.state.team === null || window.location.hash === "#teams") {
      return <div className="team-container">{teams}</div>;
    } else {
      return (
        <>
          <table className="teams-table">
            <caption className="team-name">{this.state.team}</caption>
            <tbody>
              <tr>
                <th className="stat-heading">Player</th>
                <th className="stat-heading">GP</th>
                <th className="stat-heading">FG</th>
                <th className="stat-heading">FG%</th>
                <th className="stat-heading">3PT</th>
                <th className="stat-heading">3PT%</th>
                <th className="stat-heading">FT</th>
                <th className="stat-heading">FT%</th>
                <th className="stat-heading">PTS</th>
              </tr>
              {playersData}
              {teamTotals(this.state.player_totals, this.state.team)}
            </tbody>
          </table>
        </>
      );
    }
  }
}
