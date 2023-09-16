import formatPrice from 'helpers/priceFormat'

export const floorPrice = (value: number, rad: number = 100): string =>
  formatPrice(value)
