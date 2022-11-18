import { format, formatDistance } from "date-fns";

export const getCurrentGmtDate = (): number => {
  return Date.now() + new Date().getTimezoneOffset() * 60 * 1000;
};

export const getLocalDate = (date: number) =>
  date - new Date().getTimezoneOffset() * 60 * 1000;

export const isYearPassed = (comparedDate: number) => {
  const currentYear = Number(format(Date.now(), "yyyy"));
  const comparedYear = Number(format(getLocalDate(comparedDate), "yyyy"));
  return currentYear - comparedYear > 0;
};
export const isMonthPassed = (comparedDate: number) => {
  const currentMonth = Number(format(Date.now(), "M"));
  const comparedMonth = Number(format(getLocalDate(comparedDate), "M"));
  if (isYearPassed(comparedDate)) return true;
  return currentMonth - comparedMonth > 0;
};
export const isDayPassed = (comparedDate: number) => {
  const currentDay = Number(format(Date.now(), "dd"));
  const comparedDay = Number(format(getLocalDate(comparedDate), "dd"));
  if (isMonthPassed(comparedDate)) return true;
  return currentDay - comparedDay > 0;
};
export const isHourPassed = (comparedDate: number) =>
  Date.now() - getLocalDate(comparedDate) > 60 * 60 * 1000;
export const isMinutePassed = (comparedDate: number) =>
  Date.now() - getLocalDate(comparedDate) > 60 * 1000;

export const formatDate = (date: number): string => {
  if (isYearPassed(date)) return format(date, "MMM d yyyy");
  if (isDayPassed(date)) return format(date, "MMM d 'at' HH:mm");
  if (isHourPassed(date)) return format(date, "HH:mm");
  return formatDistance(date, Date.now(), {
    addSuffix: true,
    includeSeconds: true,
  });
};
