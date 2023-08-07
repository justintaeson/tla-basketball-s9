import React from "react";
import { createBoxscore } from "../helpers/get-boxscore";
import { calculateGameTotals } from "../helpers/calculate-game-totals";

export class GameStats extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      week: this.props.state.week,
      game: this.props.state.game,
      home_team: this.props.state.homeTeam,
      away_team: this.props.state.awayTeam,
      box_score: [],
      isLoading: true,
    };
  }

  componentDidMount() {
    createBoxscore(this.state.week, this.state.game)
      .then((boxScoreData) => {
        this.setState({ box_score: boxScoreData, isLoading: false });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  render() {
    const renderPlayerRows = (teamType) => {
      let team = this.state.home_team;
      let startIndex = 0;
      let endIndex = 10;

      let totals = calculateGameTotals(this.state.box_score)[0];
      if (team === "GangGang") {
        endIndex = 9;
      }

      if (this.state.isLoading) {
        return <div className="loader"></div>;
      }

      if (teamType === "away") {
        startIndex = this.state.box_score.length - 10;
        endIndex = this.state.box_score.length;
        team = this.state.away_team;
        totals = calculateGameTotals(this.state.box_score)[1];
        if (team === "GangGang") {
          startIndex = this.state.box_score.length - 9;
        }
      }

      return (
        <table>
          <caption className="team-name">{team}</caption>
          <tbody>
            <tr>
              <th className="stat-heading">Player</th>
              <th className="stat-heading">FG</th>
              <th className="stat-heading">FG%</th>
              <th className="stat-heading">3P</th>
              <th className="stat-heading">3P%</th>
              <th className="stat-heading">FT</th>
              <th className="stat-heading">FT%</th>
              <th className="stat-heading">PF</th>
              <th className="stat-heading">PTS</th>
            </tr>
            {this.state.box_score.slice(startIndex, endIndex).map((player) => (
              <tr key={player.name}>
                <td>{player.name}</td>
                <td>{player.fg_made + "/" + player.fg_attempts}</td>
                <td>{player.fg_percentage}</td>
                <td>{player.three_made + "/" + player.three_attempts}</td>
                <td>{player.three_percentage}</td>
                <td>{player.ft_made + "/" + player.ft_attempts}</td>
                <td>{player.ft_percentage}</td>
                <td>{player.fouls}</td>
                <td>{player.points}</td>
              </tr>
            ))}
            <tr className="totals-row">
              <td>{totals.name}</td>
              <td>{totals.fg_made + "/" + totals.fg_attempts}</td>
              <td>{totals.fg_percentage}</td>
              <td>{totals.three_made + "/" + totals.three_attempts}</td>
              <td>{totals.three_percentage}</td>
              <td>{totals.ft_made + "/" + totals.ft_attempts}</td>
              <td>{totals.ft_percentage}</td>
              <td>{totals.fouls}</td>
              <td>{totals.points}</td>
            </tr>
          </tbody>
        </table>
      );
    };

    // Usage example:
    const homePlayerRows = renderPlayerRows("home");
    const awayPlayerRows = renderPlayerRows("away");

    return (
      <>
        {homePlayerRows}
        {awayPlayerRows}
      </>
    );
  }
}
