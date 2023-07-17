// import React from 'react';
// import { formatStats, getTeamStats } from '../data/players';
// import { getOpposingStats, getPointDifferential } from '../data/schedule';
// import { getGamesPlayed, getWins, teams } from '../data/teams';

// export default class TeamStatsFilter extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {};
//   }

//   render() {
//     const teamData = teams.map((team) => {
//       if (this.props.state.page === 'general') {
//         return (
//           <tr key={team.team}>
//             <td>{teams.indexOf(team) + 1}</td>
//             <td>{team.team}</td>
//             <td>{getGamesPlayed(team.team)}</td>
//             <td className="team-wins">
//               {getWins(team.team) + '-' + (getGamesPlayed(team.team) - getWins(team.team))}
//             </td>
//             <td>{getPointDifferential(team.team).pointsFor}</td>
//             <td>{getPointDifferential(team.team).pointsAgainst}</td>
//             <td>
//               {getPointDifferential(team.team).pointsFor -
//                 getPointDifferential(team.team).pointsAgainst}
//             </td>
//           </tr>
//         );
//       }

//       if (this.props.state.page === 'offense') {
//         return (
//           <tr key={team.team}>
//             <td>{team.team}</td>
//             <td>{getPointDifferential(team.team).pointsFor}</td>
//             <td>
//               {getTeamStats(team.team).twoMakes +
//                 getTeamStats(team.team).threeMakes +
//                 '/' +
//                 (getTeamStats(team.team).twoAttempts + getTeamStats(team.team).threeAttempts)}
//             </td>
//             <td>
//               {formatStats(
//                 ((getTeamStats(team.team).twoMakes + getTeamStats(team.team).threeMakes) /
//                   (getTeamStats(team.team).twoAttempts + getTeamStats(team.team).threeAttempts)) *
//                   100
//               )}
//             </td>
//             <td>
//               {getTeamStats(team.team).threeMakes + '/' + getTeamStats(team.team).threeAttempts}
//             </td>
//             <td>
//               {formatStats(
//                 (getTeamStats(team.team).threeMakes / getTeamStats(team.team).threeAttempts) * 100
//               )}
//             </td>
//             <td>{getTeamStats(team.team).ftMakes + '/' + getTeamStats(team.team).ftAttempts}</td>
//             <td>
//               {formatStats(
//                 (getTeamStats(team.team).ftMakes / getTeamStats(team.team).ftAttempts) * 100
//               )}
//             </td>
//           </tr>
//         );
//       }

//       if (this.props.state.page === 'defense') {
//         return (
//           <tr key={team.team}>
//             <td>{team.team}</td>
//             <td>{getPointDifferential(team.team).pointsAgainst}</td>
//             <td>
//               {getOpposingStats(team.team).twoMakes +
//                 getOpposingStats(team.team).threeMakes +
//                 '/' +
//                 (getOpposingStats(team.team).twoAttempts +
//                   getOpposingStats(team.team).threeAttempts)}
//             </td>
//             <td>
//               {(
//                 ((getOpposingStats(team.team).twoMakes + getOpposingStats(team.team).threeMakes) /
//                   (getOpposingStats(team.team).twoAttempts +
//                     getOpposingStats(team.team).threeAttempts)) *
//                 100
//               ).toFixed(2) + '%'}
//             </td>
//             <td>
//               {getOpposingStats(team.team).threeMakes +
//                 '/' +
//                 getOpposingStats(team.team).threeAttempts}
//             </td>
//             <td>
//               {(
//                 (getOpposingStats(team.team).threeMakes /
//                   getOpposingStats(team.team).threeAttempts) *
//                 100
//               ).toFixed(2) + '%'}
//             </td>
//             <td>
//               {getOpposingStats(team.team).ftMakes + '/' + getOpposingStats(team.team).ftAttempts}
//             </td>
//             <td>
//               {(
//                 (getOpposingStats(team.team).ftMakes / getOpposingStats(team.team).ftAttempts) *
//                 100
//               ).toFixed(2) + '%'}
//             </td>
//           </tr>
//         );
//       }
//       return null;
//     });
//     return teamData;
//   }
// }
