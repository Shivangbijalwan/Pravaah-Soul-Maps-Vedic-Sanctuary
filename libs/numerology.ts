/**
 * Vedic numerology — pure digit-reduction math. No AI, no network calls.
 * dob is expected as "YYYY-MM-DD".
 */

function reduceToSingleDigit(n: number, keepMasterNumbers = false): number {
  while (n > 9) {
    if (keepMasterNumbers && (n === 11 || n === 22 || n === 33)) return n;
    n = String(n)
      .split("")
      .reduce((sum, d) => sum + Number(d), 0);
  }
  return n;
}

/** Mulank (root/birth number) — reduced day of the month. 1–9. */
export function getMulank(dob: string): number {
  const day = Number(dob.split("-")[2]);
  return reduceToSingleDigit(day);
}

/** Bhagyank (destiny/life path number) — reduced sum of every digit in the DOB. 1–9. */
export function getBhagyank(dob: string): number {
  const digitsOnly = dob.replace(/-/g, "");
  const sum = digitsOnly
    .split("")
    .reduce((total, d) => total + Number(d), 0);
  return reduceToSingleDigit(sum);
}

export interface NumerologyResult {
  mulank: number;
  bhagyank: number;
}

export function getNumerology(dob: string): NumerologyResult {
  return {
    mulank: getMulank(dob),
    bhagyank: getBhagyank(dob),
  };
}