import * as google_sheets from "./constants";

export const createBoxscore = async (week, game) => {
  const sheet_range = "W" + week + "G" + game + "!A4:U50";
  const full_url =
    google_sheets.base_url +
    google_sheets.sheet_id +
    "/gviz/tq?sheet=" +
    google_sheets.sheet_title +
    "&range=" +
    sheet_range;

  const res = await fetch(full_url);
  const rep = await res.text();
  const data = JSON.parse(rep.substring(47, rep.length - 2));
  const boxscore = data.table.rows
    .filter((row) => row.c[1]?.v && row.c[1]?.v !== "Name")
    .map((array) => {
      const playerObject = {};
      playerObject.name = array.c[1]?.v || "-";
      playerObject.fg_made = (array.c[2]?.v || 0) + (array.c[5]?.v || 0);
      playerObject.fg_attempts = (array.c[3]?.v || 0) + (array.c[6]?.v || 0);
      playerObject.fg_percentage = isNaN(
        playerObject.fg_made / playerObject.fg_attempts
      )
        ? "0.0%"
        : ((playerObject.fg_made / playerObject.fg_attempts) * 100)
            .toFixed(1)
            .toString() + "%";
      playerObject.three_made = array.c[5]?.v || 0;
      playerObject.three_attempts = array.c[6]?.v || 0;
      playerObject.three_percentage = isNaN(
        (playerObject.three_made / playerObject.three_attempts) * 100
      )
        ? "0.0%"
        : ((playerObject.three_made / playerObject.three_attempts) * 100)
            .toFixed(1)
            .toString() + "%";
      playerObject.ft_made = array.c[11]?.v || 0;
      playerObject.ft_attempts = array.c[12]?.v || 0;
      playerObject.ft_percentage = isNaN(
        playerObject.ft_made / playerObject.ft_attempts
      )
        ? "0.0%"
        : ((playerObject.ft_made / playerObject.ft_attempts) * 100)
            .toFixed(1)
            .toString() + "%";
      playerObject.points = array.c[15]?.v || 0;
      playerObject.fouls = array.c[20]?.v || 0;

      return playerObject;
    });

  return boxscore;
};
