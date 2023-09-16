const formatPrice = (price: number) => {
  const formatter = new Intl.NumberFormat('ja-JP', {})

  return formatter.format(price)
}

export default formatPrice
