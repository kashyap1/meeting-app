const TOTAL_DAYS_TO_DISPLAY = 42;
const dt = new Date();
const getISODate = (dtOb) => {
  const dtParts = dtOb.toISOString().split('T')[0].split('-');
  return `${dtParts[2]}-${dtParts[1]}-${dtParts[0]}`;
};

const getAllDates = () => {
  dt.setDate(1);
  const day = dt.getDay();
  dt.setDate(1 - day);
  const dates = [getISODate(dt)];
  for (let i = 1; i < TOTAL_DAYS_TO_DISPLAY; i += 1) {
    dt.setDate(dt.getDate() + 1);
    dates.push(getISODate(dt));
  }
  return dates;
};

function getDatesRange(from, to) {
  const res = [from];
  const [fromD, fromM, fromY] = from.split('-');
  const dtObj = new Date(`${fromY}-${fromM}-${fromD}`);
  let i = 0;
  let updateDate = from;
  while (i < 46 && updateDate !== to) {
    dtObj.setDate(dtObj.getDate() + 1);
    i += 1;
    const [y, m, d] = dtObj.toISOString().split('T')[0].split('-');
    updateDate = `${d}-${m}-${y}`;
    res.push(updateDate);
  }
  return res;
}

export default function getSlicedDates() {
  const res = [];
  const days = getAllDates();
  let startIndex = 0;
  let endIndex = 7;
  while (endIndex <= days.length) {
    res.push(days.slice(startIndex, endIndex));
    startIndex = endIndex;
    endIndex += 7;
  }
  return res;
}

export function formatDataPerDate(data) {
  return data.reduce((acc, rec) => {
    if (rec.dates) {
      const [from, to] = rec.dates.split(',');
      if (from === to) {
        acc[from] = rec;
      } else {
        const range = getDatesRange(from, to);
        acc = range.reduce((accum, date) => {
          accum[date] = rec;
          return accum;
        }, acc);
      }
    }
    return acc;
  }, {});
}
