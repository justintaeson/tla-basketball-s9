import React from "react";
import TLASportsLogo from "../assets/tapestry-logo.png";

export default class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      clickedOn: null,
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    if (window.location.hash === "#" + event.target.id) {
    }
    if (event.target.id === "logo") {
      window.location.hash = "";
    }
    if (event.target.id === "schedule") {
      window.location.hash = "schedule";
    }
    if (event.target.id === "teams") {
      window.location.hash = "teams";
    }
    if (event.target.id === "stats") {
      window.location.hash = "stats";
    }
  }

  render() {
    window.scroll({
      top: 0,
      behavior: "smooth",
    });
    return (
      <header id="header">
        <div id="header-row" className="row">
          <div className="column-one-fourth align-center">
            <img
              id="logo"
              src={TLASportsLogo}
              alt="TapestryLA-logo"
              onClick={this.handleClick}
            />
          </div>
          <div className="column-three-fourths align-center justify-end">
            <a
              href="/#schedule"
              id="schedule"
              className="header-links flex-nowrap"
              onClick={this.handleClick}
            >
              Schedule
            </a>
            <a
              href="/#teams"
              id="teams"
              className="header-links flex-nowrap"
              onClick={this.handleClick}
            >
              Teams
            </a>
            <a
              href="/#stats"
              id="stats"
              className="header-links flex-nowrap"
              onClick={this.handleClick}
            >
              Stats
            </a>
            <a
              href="https://www.tapestry.la/"
              id="tapestry-website"
              className="header-links flex-nowrap"
              target="_blank"
              rel="noreferrer"
            >
              Tap LA
            </a>
          </div>
        </div>
      </header>
    );
  }
}
