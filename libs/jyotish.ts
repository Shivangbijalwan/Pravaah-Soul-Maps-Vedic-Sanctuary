/**
 * Jyotish (Vedic/sidereal astrology) calculation engine.
 *
 * Uses the free, pure-JS `ephemeris` package (Moshier algorithm) for tropical
 * planetary longitudes — no native binaries, so it deploys cleanly on Vercel's
 * serverless functions. Converts to the sidereal zodiac using the Lahiri
 * ayanamsa (the standard used in Vedic/Jyotish astrology).
 *
 * Precision note: this uses a standard approximation formula for the Lahiri
 * ayanamsa and a standard (not JPL-grade) ascendant formula. That's accurate
 * enough to place planets in the correct sign/nakshatra for interpretation
 * purposes. If you later need arc-second precision (e.g. for divisional
 * charts), swap in the Swiss Ephemeris via the `sweph` npm package — it has
 * Lahiri ayanamsa and house systems built in, at the cost of needing ephemeris
 * data files bundled with your deployment.
 *
 * npm install ephemeris
 */

const RASHIS = [
  "Aries", "Taurus", "Gemini", "Cancer", "Leo", "Virgo",
  "Libra", "Scorpio", "Sagittarius", "Capricorn", "Aquarius", "Pisces",
];

const NAKSHATRAS = [
  "Ashwini", "Bharani", "Krittika", "Rohini", "Mrigashira", "Ardra",
  "Punarvasu", "Pushya", "Ashlesha", "Magha", "Purva Phalguni", "Uttara Phalguni",
  "Hasta", "Chitra", "Swati", "Vishakha", "Anuradha", "Jyeshtha",
  "Mula", "Purva Ashadha", "Uttara Ashadha", "Shravana", "Dhanishta", "Shatabhisha",
  "Purva Bhadrapada", "Uttara Bhadrapada", "Revati",
];

const NAKSHATRA_SPAN = 360 / 27; // 13°20'
const PADA_SPAN = NAKSHATRA_SPAN / 4; // 3°20'

function toRad(deg: number) {
  return (deg * Math.PI) / 180;
}
function toDeg(rad: number) {
  return (rad * 180) / Math.PI;
}
function normalize360(deg: number) {
  return ((deg % 360) + 360) % 360;
}

function julianDay(utcDate: Date): number {
  return utcDate.getTime() / 86400000 + 2440587.5;
}

/** Lahiri ayanamsa approximation, accurate to within a few arcminutes. */
function lahiriAyanamsa(utcDate: Date): number {
  const jd = julianDay(utcDate);
  const T = (jd - 2451545.0) / 36525; // Julian centuries since J2000
  const yearsSince2000 = T * 100;
  // Reference: Lahiri ayanamsa ≈ 23.85° at J2000, precessing ~50.29"/year
  return 23.85 + yearsSince2000 * (50.2388475 / 3600);
}

function toSidereal(tropicalLongitude: number, ayanamsa: number): number {
  return normalize360(tropicalLongitude - ayanamsa);
}

function getRashi(siderealLongitude: number) {
  const index = Math.floor(siderealLongitude / 30);
  return RASHIS[index];
}

function getNakshatra(siderealLongitude: number) {
  const nakIndex = Math.floor(siderealLongitude / NAKSHATRA_SPAN);
  const positionInNak = siderealLongitude % NAKSHATRA_SPAN;
  const pada = Math.floor(positionInNak / PADA_SPAN) + 1;
  return { name: NAKSHATRAS[nakIndex], pada };
}

/** Mean lunar node (Rahu). Standard astronomical formula. Ketu = Rahu + 180°. */
function getMeanRahuTropical(utcDate: Date): number {
  const jd = julianDay(utcDate);
  const T = (jd - 2451545.0) / 36525;
  const omega = 125.0445 - 1934.1363619 * T;
  return normalize360(omega);
}

/** Ascendant (Lagna) tropical longitude via standard sidereal-time formula. */
function getAscendantTropical(utcDate: Date, latitude: number, longitude: number): number {
  const jd = julianDay(utcDate);
  const T = (jd - 2451545.0) / 36525;

  // Greenwich Mean Sidereal Time, in degrees
  let gmst =
    280.46061837 +
    360.98564736629 * (jd - 2451545.0) +
    0.000387933 * T * T -
    (T * T * T) / 38710000;
  gmst = normalize360(gmst);

  const ramc = normalize360(gmst + longitude); // Right Ascension of Midheaven

  const obliquity = 23.4393 - 0.0000004 * (jd - 2451545.0); // mean obliquity, deg
  const latRad = toRad(latitude);
  const ramcRad = toRad(ramc);
  const oblRad = toRad(obliquity);

  const y = Math.cos(ramcRad);
  const x = -(Math.sin(ramcRad) * Math.cos(oblRad) + Math.tan(latRad) * Math.sin(oblRad));

  return normalize360(toDeg(Math.atan2(y, x)));
}

export interface PlanetPosition {
  longitude: number; // sidereal, 0-360
  rashi: string;
  nakshatra: string;
  pada: number;
  degreeInSign: number; // 0-30, for display
}

export interface JyotishResult {
  ascendant: PlanetPosition;
  planets: Record<
    "sun" | "moon" | "mars" | "mercury" | "jupiter" | "venus" | "saturn" | "rahu" | "ketu",
    PlanetPosition
  >;
}

function buildPosition(tropicalLongitude: number, ayanamsa: number): PlanetPosition {
  const sidereal = toSidereal(tropicalLongitude, ayanamsa);
  const { name, pada } = getNakshatra(sidereal);
  return {
    longitude: sidereal,
    rashi: getRashi(sidereal),
    nakshatra: name,
    pada,
    degreeInSign: sidereal % 30,
  };
}

/**
 * Full Jyotish calculation for a birth moment.
 * utcDate must already be converted to UTC (see lib/timezone.ts).
 */
export async function calculateJyotish(
  utcDate: Date,
  latitude: number,
  longitude: number
): Promise<JyotishResult> {
  // Load ephemeris only when a reading is generated. This avoids executing
  // its CommonJS backend initializer while Next.js collects route config.
  const ephemeris = await import("ephemeris");
  const ayanamsa = lahiriAyanamsa(utcDate);

  const raw = ephemeris.getAllPlanets(utcDate, longitude, latitude, 0);
  const observed = raw.observed;

  const rahuTropical = getMeanRahuTropical(utcDate);
  const ketuTropical = normalize360(rahuTropical + 180);
  const ascendantTropical = getAscendantTropical(utcDate, latitude, longitude);

  return {
    ascendant: buildPosition(ascendantTropical, ayanamsa),
    planets: {
      sun: buildPosition(observed.sun.apparentLongitudeDd, ayanamsa),
      moon: buildPosition(observed.moon.apparentLongitudeDd, ayanamsa),
      mars: buildPosition(observed.mars.apparentLongitudeDd, ayanamsa),
      mercury: buildPosition(observed.mercury.apparentLongitudeDd, ayanamsa),
      jupiter: buildPosition(observed.jupiter.apparentLongitudeDd, ayanamsa),
      venus: buildPosition(observed.venus.apparentLongitudeDd, ayanamsa),
      saturn: buildPosition(observed.saturn.apparentLongitudeDd, ayanamsa),
      rahu: buildPosition(rahuTropical, ayanamsa),
      ketu: buildPosition(ketuTropical, ayanamsa),
    },
  };
}