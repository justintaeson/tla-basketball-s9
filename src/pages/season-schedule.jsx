import React from "react";
import { createSchedule } from "../functions/helper-schedule";
import { GameStats } from "./game-stats";

export default class Schedule extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      week: "",
      game: 0,
      awayTeam: "",
      homeTeam: "",
      schedule: [],
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    if (event.target.innerText.includes("W")) {
      this.setState({
        week: parseInt(event.target.innerText[1]),
      });
    } else if (event.target.innerText.includes("Stats")) {
      window.location.hash = "#schedule/week" + this.state.week;
      this.setState({
        week: this.state.week,
        game: event.target.dataset.game,

        awayTeam:
          event.target.parentNode.previousElementSibling.children[1].children[0]
            .innerText,
        homeTeam:
          event.target.parentNode.previousElementSibling.children[0].children[0]
            .innerText,
      });
    }
  }

  componentDidMount() {
    createSchedule()
      .then((scheduleData) => {
        this.setState({ week: 1, schedule: scheduleData });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  render() {
    const weeks = this.state.schedule
      .map((game) => game.week)
      .filter((value, index, self) => self.indexOf(value) === index);
    let firstHalf = [];
    let secondHalf = [];
    const scheduleFilter = (row) => {
      if (row === 2) {
        secondHalf = weeks.filter((week) => week > 5);
        const filterNumbers = secondHalf.map((week) => {
          return (
            <p
              key={week}
              className="stat-filter week-filter"
              onClick={this.handleClick}
            >
              {"W" + week}
            </p>
          );
        });
        return filterNumbers;
      } else {
        firstHalf = weeks.filter((week) => week <= 5);
        const filterNumbers = firstHalf.map((week) => {
          return (
            <p
              key={week}
              className="stat-filter week-filter"
              onClick={this.handleClick}
            >
              {"W" + week}
            </p>
          );
        });
        return filterNumbers;
      }
    };

    if (window.location.hash.slice(0, 10) === "#schedule/") {
      return <GameStats state={this.state} />;
    } else if (window.location.hash === "#schedule") {
      const schedule = this.state.schedule.map((games, index) => {
        if (games.week === this.state.week) {
          return (
            <>
              <div key={games.week + games.time} className="schedule-row">
                <div className="box flex-wrap" onClick={this.handleClick}>
                  <div className="row flex-wrap game-row">
                    <p className="game-info justify-center">
                      Week {games.week}
                    </p>
                    <p className="game-info justify-center">{games.date}</p>
                    <p className="game-info justify-center">
                      {games.time + " - " + games.court}
                    </p>
                  </div>
                  <div className="row">
                    <div className="column-one-half flex-column align-center">
                      <p className="home-content">{games.homeTeam}</p>
                      <p className="home-score">{games.homeScore}</p>
                    </div>
                    <div className="column-one-half flex-column align-center">
                      <p className="away-content">{games.awayTeam}</p>
                      <p className="away-score">{games.awayScore}</p>
                    </div>
                  </div>
                  <div className="row flex-wrap game-row">
                    <p
                      className="game-stats justify-center"
                      data-game={index + 1}
                      onClick={this.handleClick}
                    >
                      Stats
                    </p>
                  </div>
                </div>
              </div>
            </>
          );
        }

        return null;
      });

      return (
        <>
          <div className="row stat-filter-row justify-center">
            {scheduleFilter(1)}
          </div>
          <div className="row stat-filter-row justify-center">
            {scheduleFilter(2)}
          </div>
          {schedule}
        </>
      );
    }
  }
}
