import * as google_sheets from "./constants";

export const createSchedule = async () => {
  const range = "Schedule!A3:S49";
  const full_url =
    google_sheets.base_url +
    google_sheets.sheet_id +
    "/gviz/tq?sheet=" +
    google_sheets.sheet_title +
    "&range=" +
    range;

  const res = await fetch(full_url);
  const rep = await res.text();
  const data = JSON.parse(rep.substring(47, rep.length - 2));

  return data.table.rows.map((row) => {
    const week = row.c[0].v;
    const date = row.c[1].f;
    const time = row.c[2].v;
    const court = row.c[3].v;
    const homeTeam = row.c[4].v;
    const homeScore = row.c[5]?.v || "-";
    const awayScore = row.c[6]?.v || "-";
    const awayTeam = row.c[7].v;
    const game = row.c[8].v || "-";

    return {
      week,
      date,
      time,
      court,
      homeTeam,
      homeScore,
      awayScore,
      awayTeam,
      game,
    };
  });
};
