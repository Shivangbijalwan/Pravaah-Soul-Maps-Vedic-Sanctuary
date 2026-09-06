/**
 * Resolves lat/lng to an IANA timezone name, then converts the local birth
 * date+time to UTC — correctly accounting for historical DST rules via Luxon,
 * which is important because DST rules for a given place have often changed
 * over the decades.
 *
 * npm install geo-tz luxon
 */

import { find as findTimezone } from "geo-tz";
import { DateTime } from "luxon";

export function getTimezoneName(latitude: number, longitude: number): string {
  const zones = findTimezone(latitude, longitude);
  if (!zones.length) {
    throw new Error("Could not resolve a timezone for the given coordinates.");
  }
  return zones[0]; // e.g. "Asia/Kolkata"
}

/**
 * Converts local birth date + time into a UTC JS Date.
 * date: "YYYY-MM-DD", time: "HH:mm" (24-hour)
 */
export function toUtcDate(date: string, time: string, timezoneName: string): Date {
  const dt = DateTime.fromISO(`${date}T${time}`, { zone: timezoneName });

  if (!dt.isValid) {
    throw new Error(`Invalid date/time/timezone combination: ${dt.invalidReason}`);
  }

  return dt.toUTC().toJSDate();
}