const getTwoCharacters = (number) => (String(number).length === 1 ? `0${number}` : String(number));

export const getDateTime = (date) => ({
  hours: getTwoCharacters(date.getHours()),
  minutes: getTwoCharacters(date.getMinutes()),
  seconds: getTwoCharacters(date.getSeconds()),
  day: getTwoCharacters(date.getDate()),
  month: getTwoCharacters(date.getMonth() + 1),
  year: date.getFullYear(),
});

export const getDateTimeString = (date) => {
  const dateTime = getDateTime(date);
  const {
    hours, minutes, seconds, day, month, year,
  } = dateTime;
  return `${hours}:${minutes}:${seconds} ${day}.${month}.${year}`;
};

export const getDifferenceTimeInMinutesToString = (date1, date2) => {
  const differenceTimeInSeconds = Math.floor(Math.abs((date1 - date2) / 1000));
  return `${Math.floor(differenceTimeInSeconds / 60)} минут(ы) ${differenceTimeInSeconds % 60} секунд`;
};
