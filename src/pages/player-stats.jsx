import React from "react";

import { getPlayerTotals } from "../functions/helper-stats";
export default class PlayerStats extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 1,
      isLoading: true,
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    this.setState({
      page: event.target.innerText,
    });
  }

  componentDidMount() {
    getPlayerTotals()
      .then((playerTotalsData) => {
        let sorted_player_totals = playerTotalsData
          .map((player) => ({
            ...player,
            ppg: player.games_played ? player.points / player.games_played : 0,
          }))
          .sort((a, b) => {
            if (b.ppg === a.ppg) {
              return (
                (b.two_made + b.three_made) /
                  (b.two_attempts + b.three_attempts) -
                (a.two_made + a.three_made) /
                  (a.two_attempts + a.three_attempts)
              ); // sort by fg% if ppg is the same
            } else {
              return b.ppg - a.ppg; // sort by ppg otherwise
            }
          });

        this.setState({
          player_totals: sorted_player_totals,
          isLoading: false,
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  render() {
    if (this.state.isLoading) {
      return <div className="loader"></div>;
    }

    let playerStats = this.state.player_totals
      .slice(0, 50)
      .map((player, index) => {
        let ppg = !isNaN(player.points / player.games_played)
          ? (player.points / player.games_played).toFixed(1)
          : "-";
        let fg_percentage = !isNaN(
          (player.two_made + player.three_made) /
            (player.two_attempts + player.three_attempts)
        )
          ? (
              ((player.two_made + player.three_made) /
                (player.two_attempts + player.three_attempts)) *
              100
            ).toFixed(1) + "%"
          : "-";
        let three_percentage = !isNaN(player.three_made / player.three_attempts)
          ? ((player.three_made / player.three_attempts) * 100).toFixed(1) + "%"
          : "-";

        let ft_percentage = !isNaN(player.ft_made / player.ft_attempts)
          ? ((player.ft_made / player.ft_attempts) * 100).toFixed(1) + "%"
          : "-";
        return (
          <tr>
            <td>{index + 1}</td>
            <td>{player.name}</td>
            <td>{player.team}</td>
            <td>{player.games_played}</td>
            <td>{ppg}</td>
            <td>
              {player.two_made +
                player.three_made +
                "/" +
                (player.two_attempts + player.three_attempts)}
            </td>
            <td>{fg_percentage}</td>
            <td>{player.three_made + "/" + player.three_attempts}</td>
            <td>{three_percentage}</td>
            <td>{player.ft_made + "/" + player.ft_attempts}</td>
            <td>{ft_percentage}</td>
          </tr>
        );
      });
    return (
      <>
        <table className="justify-center">
          <caption className="team-name">Players</caption>
          <tbody>
            <tr>
              <th className="player-stats-header">Rank</th>
              <th className="player-stats-header">Player</th>
              <th className="player-stats-header">Team</th>
              <th className="player-stats-header">GP</th>
              <th className="player-stats-header">PTS</th>
              <th className="player-stats-header">FG</th>
              <th className="player-stats-header">FG%</th>
              <th className="player-stats-header">3P</th>
              <th className="player-stats-header">3P%</th>
              <th className="player-stats-header">FT</th>
              <th className="player-stats-header">FT%</th>
            </tr>
            {playerStats}
          </tbody>
        </table>
        <div className="row justify-center">{}</div>
      </>
    );
  }
}
