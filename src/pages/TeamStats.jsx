import React from "react";
import { getTeamTotals } from "../helpers/get-team-totals";

export default class TeamStats extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: "general",
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
    getTeamTotals()
      .then((teamStatsData) => {
        this.setState({ team_stats: teamStatsData, isLoading: false });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  render() {
    if (this.state.isLoading) {
      return <div className="loader"></div>;
    }

    let sortedTeamStats = this.state.team_stats.sort((a, b) => {
      if (a.wins === b.wins) {
        if (a.losses === b.losses) {
          if (a.pd === b.pd) {
            return b.ppg - a.ppg;
          }
          return b.pd - a.pd;
        }
        return a.losses - b.losses; // team with the least amount of losses should be at the top
      } else {
        return b.wins - a.wins;
      }
    });

    let teamStats = sortedTeamStats.map((team, index) => {
      return (
        <tr>
          <td>{index + 1}</td>
          <td>{team.name}</td>
          <td>{team.games_played}</td>
          <td>{team.wins}</td>
          <td>{team.losses}</td>
          <td>{team.ppg.toFixed(1)}</td>
          <td>{team.papg.toFixed(1)}</td>
          <td>{team.pd.toFixed()}</td>
        </tr>
      );
    });

    return (
      <>
        <table>
          <caption className="team-name">Teams</caption>
          <tbody>
            <tr>
              <th className="stat-heading">Rank</th>
              <th className="stat-heading">Team</th>
              <th className="stat-heading">GP</th>
              <th className="stat-heading">W</th>
              <th className="stat-heading">L</th>
              <th className="stat-heading">PPG</th>
              <th className="stat-heading">PAPG</th>
              <th className="stat-heading">PD</th>
            </tr>
            {teamStats}
          </tbody>
        </table>
      </>
    );
  }
}
