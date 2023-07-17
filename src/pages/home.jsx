import React from "react";
import BasketballStockFootage from "../assets/tapestry_basketball_2022.mp4";

export default class Home extends React.Component {
  render() {
    return (
      <main id="main overlay-hidden height-vh">
        <div id="video-row" className="row justify-center">
          <video id="about-video" autoPlay loop muted>
            <source src={BasketballStockFootage} type="video/mp4" />
          </video>
          <h1 id="tapestry-la" className="home-text">
            Tapestry LA
          </h1>
          <h1 id="basketball-league" className="home-text">
            Basketball League
          </h1>
          <h1 id="season-8" className="home-text">
            Season 9
          </h1>
        </div>
      </main>
    );
  }
}
