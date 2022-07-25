const SECOND_IN_MS = 1000;
const HOUR_IN_MINUTES = 60;
const MINUTE_IN_SECONDS = 60;

export const hourToMs = (hour: number) => {
  const minutes = hourToMin(hour);
  const seconds = minuteToSecs(minutes);
  return secondsToMs(seconds);
};

const hourToMin = (hour: number): number => hour * HOUR_IN_MINUTES;

const minuteToSecs = (minutes: number): number => minutes * MINUTE_IN_SECONDS;

const secondsToMs = (seconds: number): number => seconds * SECOND_IN_MS;
