const isGoodCardNumber = (cardNumber: string) => {
  // Check if a card number in string is valid
  // Source: https://en.wikipedia.org/wiki/Luhn_algorithm
  let alt = false
  let total = 0

  for (let i = cardNumber.length - 1; i >= 0; i--) {
    let digit = parseInt(cardNumber[i])

    if (alt) {
      digit = digit * 2
      if (digit > 9) {
        digit -= 9
      }
    }
    total += digit
    alt = !alt
  }
  return total % 10 == 0
}

export { isGoodCardNumber }
