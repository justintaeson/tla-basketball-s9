const SHEET_ID = "11R6D2gHsdNN6fMpXCITRrQg7DmUhhmzHCiMBOVQmMUU";
const SHEET_TITLE =
  "TLA Basketball - 2023 League - Season 9 - Scores and Stats (DK)";

export const createBoxScore = async (week, game) => {
  console.log(week, game);
  const SHEET_RANGE = "W" + week + "G" + game + "!A4:U50";
  const FULL_URL =
    "https://docs.google.com/spreadsheets/d/" +
    SHEET_ID +
    "/gviz/tq?sheet=" +
    SHEET_TITLE +
    "&range=" +
    SHEET_RANGE;

  const res = await fetch(FULL_URL);
  const rep = await res.text();
  const data = JSON.parse(rep.substring(47, rep.length - 2));
  const boxScore = data.table.rows
    .filter((row) => row.c[1]?.v && row.c[1]?.v !== "Name")
    .map((array) => {
      const playerObject = {};
      playerObject.name = array.c[1]?.v || "-";
      playerObject.fg_made = (array.c[2]?.v || 0) + (array.c[5]?.v || 0);
      playerObject.fg_attempts = (array.c[3]?.v || 0) + (array.c[6]?.v || 0);
      playerObject.fg_percentage = array.c[10]?.f;

      playerObject.three_made = array.c[5]?.v || 0;
      playerObject.three_attempts = array.c[6]?.v || 0;
      playerObject.three_percentage = isNaN(
        (playerObject.three_made / playerObject.three_attempts) * 100
      )
        ? "0.00%"
        : ((playerObject.three_made / playerObject.three_attempts) * 100)
            .toFixed(2)
            .toString() + "%";
      playerObject.ft_made = array.c[11]?.v || 0;
      playerObject.ft_attempts = array.c[12]?.v || 0;
      playerObject.ft_percentage = array.c[14]?.f;
      playerObject.points = array.c[15]?.v || 0;
      playerObject.fouls = array.c[20]?.v || 0;

      return playerObject;
    });
  return boxScore;
};

export const calculateTotals = (data) => {
  const teams = [data.slice(0, 10), data.slice(10)];
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
        ((totalStats.fg_made / totalStats.fg_attempts) * 100).toFixed(2) + "%";
    }
    if (totalStats.three_attempts > 0) {
      totalStats.three_percentage =
        ((totalStats.three_made / totalStats.three_attempts) * 100).toFixed(2) +
        "%";
    }
    if (totalStats.ft_attempts > 0) {
      totalStats.ft_percentage =
        ((totalStats.ft_made / totalStats.ft_attempts) * 100).toFixed(2) + "%";
    }

    return totalStats;
  });
};

export const getPlayerTotals = async () => {
  const SHEET_RANGE = "Player Total Stats!A1:J101";
  const FULL_URL =
    "https://docs.google.com/spreadsheets/d/" +
    SHEET_ID +
    "/gviz/tq?sheet=" +
    SHEET_TITLE +
    "&range=" +
    SHEET_RANGE;

  const res = await fetch(FULL_URL);
  const rep = await res.text();
  const data = JSON.parse(rep.substring(47, rep.length - 2));

  const playerTotals = data.table.rows.map((array) => {
    const playerObject = {};
    playerObject.team = array.c[0].v;
    playerObject.name = array.c[1].v;
    playerObject.games_played = array.c[2].v;
    playerObject.points = array.c[3].v;
    playerObject.two_made = array.c[4].v;
    playerObject.two_attempts = array.c[5].v;
    playerObject.three_made = array.c[6].v;
    playerObject.three_attempts = array.c[7].v;
    playerObject.ft_made = array.c[8].v;
    playerObject.ft_attempts = array.c[9].v;
    return playerObject;
  });
  return playerTotals;
};

export const getTeamTotals = async () => {};
