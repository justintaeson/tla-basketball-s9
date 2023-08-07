export const calculateGameTotals = (player_data) => {
  let teams = [player_data.slice(0, 10), player_data.slice(10)];

  if (player_data[8]?.name === "Robin Choi") {
    teams = [player_data.slice(0, 9), player_data.slice(9)];
  }

  return teams.map((team) => {
    const totalStats = {
      name: "Total",
      fg_made: 0,
      fg_attempts: 0,
      fg_percentage: "0.00%",
      three_made: 0,
      three_attempts: 0,
      three_percentage: "0.00%",
      ft_made: 0,
      ft_attempts: 0,
      ft_percentage: "0.00%",
      points: 0,
      fouls: 0,
    };

    team.forEach((player) => {
      totalStats.fg_made +=
        typeof player.fg_made === "number" ? player.fg_made : 0;
      totalStats.fg_attempts +=
        typeof player.fg_attempts === "number" ? player.fg_attempts : 0;
      totalStats.three_made +=
        typeof player.three_made === "number" ? player.three_made : 0;
      totalStats.three_attempts +=
        typeof player.three_attempts === "number" ? player.three_attempts : 0;
      totalStats.ft_made +=
        typeof player.ft_made === "number" ? player.ft_made : 0;
      totalStats.ft_attempts +=
        typeof player.ft_attempts === "number" ? player.ft_attempts : 0;
      totalStats.points +=
        typeof player.points === "number" ? player.points : 0;
      totalStats.fouls += typeof player.fouls === "number" ? player.fouls : 0;
    });

    if (totalStats.fg_attempts > 0) {
      totalStats.fg_percentage =
        ((totalStats.fg_made / totalStats.fg_attempts) * 100).toFixed(1) + "%";
    }
    if (totalStats.three_attempts > 0) {
      totalStats.three_percentage =
        ((totalStats.three_made / totalStats.three_attempts) * 100).toFixed(1) +
        "%";
    }
    if (totalStats.ft_attempts > 0) {
      totalStats.ft_percentage =
        ((totalStats.ft_made / totalStats.ft_attempts) * 100).toFixed(1) + "%";
    }

    return totalStats;
  });
};
