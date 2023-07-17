import React from 'react';
import TeamStatsFilter from './team-stat-filter';

export default class TeamStats extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 'general'
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    this.setState({
      page: event.target.innerText
    });
  }

  render() {
    const data = () => {
      if (this.state.page === 'general') {
        return (
          <>
            <div className="row justify-center">
              <p className="stat-filter team-stat-filter yellow" onClick={this.handleClick}>
                general
              </p>
              <p className="stat-filter team-stat-filter" onClick={this.handleClick}>
                offense
              </p>
              <p className="stat-filter team-stat-filter" onClick={this.handleClick}>
                defense
              </p>
            </div>
            <table>
              <tbody>
                <tr>
                  <th className="stat-heading">SEED</th>
                  <th className="stat-heading">TEAM</th>
                  <th className="stat-heading">GP</th>
                  <th className="stat-heading">W-L</th>
                  <th className="stat-heading">PTS</th>
                  <th className="stat-heading">PTS ALLOWED</th>
                  <th className="stat-heading">PT DIFF</th>
                </tr>
                <TeamStatsFilter state={this.state} />
              </tbody>
            </table>
          </>
        );
      }

      if (this.state.page === 'offense') {
        return (
          <>
            <div className="row justify-center">
              <p className="stat-filter team-stat-filter" onClick={this.handleClick}>
                general
              </p>
              <p className="stat-filter team-stat-filter yellow" onClick={this.handleClick}>
                offense
              </p>
              <p className="stat-filter team-stat-filter" onClick={this.handleClick}>
                defense
              </p>
            </div>
            <table>
              <tbody>
                <tr>
                  <th className="stat-heading">TEAM</th>
                  <th className="stat-heading">PTS</th>
                  <th className="stat-heading">FG</th>
                  <th className="stat-heading">FG%</th>
                  <th className="stat-heading">3P</th>
                  <th className="stat-heading">3P%</th>
                  <th className="stat-heading">FT</th>
                  <th className="stat-heading">FT%</th>
                </tr>
                <TeamStatsFilter state={this.state} />
              </tbody>
            </table>
          </>
        );
      }

      if (this.state.page === 'defense') {
        return (
          <>
            <div className="row justify-center">
              <p className="stat-filter team-stat-filter" onClick={this.handleClick}>
                general
              </p>
              <p className="stat-filter team-stat-filter" onClick={this.handleClick}>
                offense
              </p>
              <p className="stat-filter team-stat-filter yellow" onClick={this.handleClick}>
                defense
              </p>
            </div>
            <table>
              <tbody>
                <tr>
                  <th className="stat-heading">TEAM</th>
                  <th className="stat-heading">PTS ALLOWED</th>
                  <th className="stat-heading">Opp FG</th>
                  <th className="stat-heading">Opp FG%</th>
                  <th className="stat-heading">Opp 3P</th>
                  <th className="stat-heading">Opp 3P%</th>
                  <th className="stat-heading">Opp FT</th>
                  <th className="stat-heading">Opp FT%</th>
                </tr>
                <TeamStatsFilter state={this.state} />
              </tbody>
            </table>
          </>
        );
      }
    };

    return <>{data()}</>;
  }
}
