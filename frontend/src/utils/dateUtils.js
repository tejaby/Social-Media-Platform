// libraries
import {
  format,
  differenceInSeconds,
  differenceInMinutes,
  differenceInHours,
  differenceInDays,
  differenceInMonths,
  differenceInYears,
} from "date-fns";

export const formatDate = (date) => {
  return format(new Date(date), "dd MMMM yyyy");
};

export const formatTimeAgo = (date) => {
  const seconds = differenceInSeconds(new Date(), date);
  if (seconds < 60) {
    return `${seconds} segundo${seconds === 1 ? "" : "s"}`;
  }

  const minutes = differenceInMinutes(new Date(), date);
  if (minutes < 60) {
    return `${minutes} minuto${minutes === 1 ? "" : "s"}`;
  }

  const hours = differenceInHours(new Date(), date);
  if (hours < 24) {
    return `${hours} hora${hours === 1 ? "" : "s"}`;
  }

  const days = differenceInDays(new Date(), date);
  if (days < 30) {
    return `${days} dia${days === 1 ? "" : "s"}`;
  }

  const months = differenceInMonths(new Date(), date);
  if (months < 12) {
    return `${months} mes${months === 1 ? "" : "es"}`;
  }

  const years = differenceInYears(new Date(), date);
  return `${years} año${years === 1 ? "" : "s"}`;
};
