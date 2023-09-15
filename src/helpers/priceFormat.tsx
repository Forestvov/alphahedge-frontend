const formatPrice = (price: number, currency: string) => {
  const formatter = new Intl.NumberFormat('ru-RU', {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  })

  return formatter.format(price).slice(0, -2)
}

export default formatPrice
