const SHEET_ID = "11R6D2gHsdNN6fMpXCITRrQg7DmUhhmzHCiMBOVQmMUU";
const SHEET_TITLE =
  "TLA Basketball - 2023 League - Season 9 - Scores and Stats (DK)";
const SHEET_RANGE = "Schedule!A3:S39";

const FULL_URL =
  "https://docs.google.com/spreadsheets/d/" +
  SHEET_ID +
  "/gviz/tq?sheet=" +
  SHEET_TITLE +
  "&range=" +
  SHEET_RANGE;

export const createSchedule = async () => {
  const res = await fetch(FULL_URL);
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
