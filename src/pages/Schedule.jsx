import React from "react";
import { createSchedule } from "../helpers/get-schedule";
import { GameStats } from "./GameStats";

export default class Schedule extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      week: "",
      game: 0,
      awayTeam: "",
      homeTeam: "",
      schedule: [],
      isLoading: true,
      weekGameCounts: {},
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

    return null;
  }

  componentDidMount() {
    createSchedule()
      .then((scheduleData) => {
        const weekGameCounts = {};
        scheduleData.forEach((game) => {
          weekGameCounts[game.week] = (weekGameCounts[game.week] || 0) + 1;
        });

        this.setState({
          week: 9,
          schedule: scheduleData,
          isLoading: false,
          weekGameCounts,
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
      let gameID = 0;
      let previousWeek = null;

      const schedule = this.state.schedule.map((games, index) => {
        const currentWeekGameCount = this.state.weekGameCounts[games.week] || 0;

        if (games.week !== previousWeek) {
          gameID = 0;
          previousWeek = games.week;
        }

        gameID = (gameID % currentWeekGameCount) + 1;

        if (games.week === this.state.week) {
          if (games.awayTeam === "Open Gym") {
            return (
              <>
                <div key={games.week + games.time} className="schedule-row">
                  <div className="box flex-wrap">
                    <div className="row flex-wrap game-row">
                      <p className="game-info justify-center">
                        Week {games.week}
                      </p>
                      <p className="game-info justify-center">{games.date}</p>
                      <p className="game-info justify-center">
                        {games.time + " - " + games.court}
                      </p>
                    </div>
                    <div className="row justify-center">
                      <div className="column-one-half flex-column align-center">
                        <p className="away-content">{games.awayTeam}</p>
                      </div>
                    </div>
                    <div className="row flex-wrap game-row"></div>
                  </div>
                </div>
              </>
            );
          }
          return (
            <>
              <div key={games.week + games.time} className="schedule-row">
                <div className="box flex-wrap">
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
                      data-game={gameID}
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
