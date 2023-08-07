import React from "react";
import Home from "./pages/home";
import Navbar from "./components/Navbar";
import Schedule from "./pages/Schedule";
import Teams from "./pages/teams";
import Stats from "./pages/stats";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hash: window.location.hash,
    };
  }

  componentDidMount() {
    window.addEventListener("hashchange", () => {
      this.setState({
        hash: window.location.hash,
      });
    });
  }

  render() {
    const { hash } = this.state;
    if (hash === "" || hash === "#") {
      window.onbeforeunload = function () {
        window.scrollTo(0, 0);
      };
      return (
        <>
          <Navbar />
          <Home />
        </>
      );
    }
    if (hash === "#schedule" || hash.slice(0, 10) === "#schedule/") {
      window.onbeforeunload = function () {
        window.scrollTo(0, 0);
      };
      return (
        <>
          <Navbar />
          <Schedule />
        </>
      );
    }
    if (hash === "#teams" || hash.slice(0, 7) === "#teams/") {
      window.onbeforeunload = function () {
        window.scrollTo(0, 0);
      };
      return (
        <>
          <Navbar />
          <Teams />
        </>
      );
    }
    if (hash === "#stats" || hash.slice(0, 7) === "#stats/") {
      return (
        <>
          <Navbar />
          <Stats />
        </>
      );
    }
  }
}
