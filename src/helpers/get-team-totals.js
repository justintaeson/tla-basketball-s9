import * as google_sheets from "./constants";

export const getTeamTotals = async () => {
  const sheet_range = "Team Total Stats!A1:G12";
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
  const teamTotals = data.table.rows.map((array) => {
    const teamObject = {};
    teamObject.name = array.c[0].v;
    teamObject.games_played = array.c[1].v;
    teamObject.wins = array.c[2].v;
    teamObject.losses = array.c[3].v;
    teamObject.ppg = array.c[4]?.v || 0;
    teamObject.papg = array.c[5].v;
    teamObject.pd = array.c[6]?.v || 0;
    return teamObject;
  });
  return teamTotals;
};
