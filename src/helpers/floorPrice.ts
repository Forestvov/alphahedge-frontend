export const floorPrice = (value: number, rad: number = 100): number =>
  parseInt(String(value * rad), 10) / rad
