/**
 * A date string from our API looks like: 2022-09-29T23:11:45.364Z
 * This function should convert that to a relative time in the past from now.
 */

const SECOND = 1000; // In terms of miliseconds
const MINUTE = 60 * SECOND;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;
const YEAR = 365 * DAY;
const MONTH = YEAR / 12; // ~ An average month

const formatter = new Intl.RelativeTimeFormat('en', { numeric: 'auto' });

export function formatRelativeTime(dateStr: string) {
  const date = Date.parse(dateStr);
  const now = Date.now();
  const elapsedMs = date - now;
  const absoluteMs = Math.abs(elapsedMs);
  if (absoluteMs > YEAR) {
    return formatter.format(Math.round(elapsedMs / YEAR), 'year');
  }
  if (absoluteMs > MONTH) {
    return formatter.format(Math.round(elapsedMs / MONTH), 'month');
  }
  if (absoluteMs > DAY) {
    return formatter.format(Math.round(elapsedMs / DAY), 'day');
  }
  if (absoluteMs > HOUR) {
    return formatter.format(Math.round(elapsedMs / HOUR), 'hour');
  }
  if (absoluteMs > MINUTE) {
    return formatter.format(Math.round(elapsedMs / MINUTE), 'minute');
  }
  return formatter.format(Math.round(elapsedMs / 1000), 'second');
}
