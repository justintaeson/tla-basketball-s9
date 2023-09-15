import * as google_sheets from "./constants";

export const getPlayerTotals = async () => {
  const sheet_range = "Player Total Stats!A1:J101";
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
