// import React from 'react';
// import { createOrderedArray, getSum, formatStats, gamesPlayed } from '../data/players';
// import { teams } from '../data/teams';

// export default class PlayerStats extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       page: '1'
//     };
//     this.handleClick = this.handleClick.bind(this);
//   }

//   handleClick(event) {
//     this.setState({
//       page: event.target.innerText
//     });
//   }

//   render() {
//     const orderedArray = createOrderedArray();
//     const tableContent = orderedArray.map((player) => {
//       const currentIndex = orderedArray.indexOf(player);
//       if (currentIndex >= this.state.page * 10 - 10 && currentIndex < this.state.page * 10) {
//         return (
//           <tr key={player.name}>
//             <td>{orderedArray.indexOf(player) + 1}</td>
//             <td>{player.name}</td>
//             <td>{player.team}</td>
//             <td>{gamesPlayed(player.twoMakes)}</td>
//             <td className="player-points">
//               {formatStats(getSum(player.points) / gamesPlayed(player.points)).slice(0, 4)}
//             </td>
//             <td>
//               {getSum(player.twoMakes) +
//                 getSum(player.threeMakes) +
//                 '/' +
//                 (getSum(player.twoAttempts) + getSum(player.threeAttempts))}
//             </td>

//             <td>
//               {formatStats(
//                 ((getSum(player.twoMakes) + getSum(player.threeMakes)) /
//                   (getSum(player.twoAttempts) + getSum(player.threeAttempts))) *
//                   100
//               )}
//             </td>
//             <td>{formatStats((getSum(player.threeMakes) / getSum(player.threeAttempts)) * 100)}</td>
//             <td>{formatStats((getSum(player.ftMakes) / getSum(player.ftAttempts)) * 100)}</td>
//           </tr>
//         );
//       }
//       return null;
//     });

//     const statFilter = () => {
//       const filterNumbers = teams.map((team) => {
//         if ((teams.indexOf(team) + 1).toString() === this.state.page) {
//           return (
//             <p className="stat-filter yellow" onClick={this.handleClick}>
//               {this.state.page}
//             </p>
//           );
//         } else {
//           return (
//             <p className="stat-filter" onClick={this.handleClick}>
//               {teams.indexOf(team) + 1}
//             </p>
//           );
//         }
//       });
//       return filterNumbers;
//     };

//     return (
//       <>
//         <div className="row">
//           <h1 className="stats-header">League Leaders</h1>
//         </div>
//         <table className="justify-center">
//           <tbody>
//             <tr>
//               <th className="player-stats-header">RANK</th>
//               <th className="player-stats-header">PLAYER</th>
//               <th className="player-stats-header">TEAM</th>
//               <th className="player-stats-header">GP</th>
//               <th className="player-stats-header">PTS</th>
//               <th className="player-stats-header">FG</th>
//               <th className="player-stats-header">FG%</th>
//               <th className="player-stats-header">3P%</th>
//               <th className="player-stats-header">FT%</th>
//             </tr>
//             {tableContent}
//           </tbody>
//         </table>
//         <div className="row justify-center">{statFilter()}</div>
//       </>
//     );
//   }
// }
