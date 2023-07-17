import React from 'react';
import Home from './pages/home';
import NavBar from './navbar';
import Schedule from './pages/season-schedule';
import Teams from './pages/teams';
import Stats from './pages/stats';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hash: window.location.hash
    };
  }

  componentDidMount() {
    console.log(window.location.hash);
    window.addEventListener('hashchange', () => {
      this.setState({
        hash: window.location.hash
      });
    });
  }

  render() {
    const { hash } = this.state;
    if (hash === '' || hash === '#') {
      window.onbeforeunload = function () {
        window.scrollTo(0, 0);
      };
      return (
        <>
          <NavBar />
          <Home />
        </>
      );
    }
    if (hash === '#schedule' || hash.slice(0, 10) === '#schedule/') {
      window.onbeforeunload = function () {
        window.scrollTo(0, 0);
      };
      return (
        <>
          <NavBar />
          <Schedule />
        </>
      );
    }
    if (hash === '#teams' || hash.slice(0, 7) === '#teams/') {
      window.onbeforeunload = function () {
        window.scrollTo(0, 0);
      };
      return (
        <>
          <NavBar />
          <Teams />
        </>
      );
    }
    if (hash === '#stats' || hash.slice(0, 7) === '#stats/') {
      return (
        <>
          <NavBar />
          <Stats />
        </>
      );
    }
  }
}
