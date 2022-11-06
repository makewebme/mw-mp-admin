// Format number for spacing
export const formatAmount = (num: number) => {
  return new Intl.NumberFormat('ru-RU').format(num)
}


//
// Format numbers, like money etc.
//

export const formatMoney = (num: number, fillDecimals: boolean = true) => {
  let formatted = new Intl.NumberFormat('ru-RU').format(num)

  if (fillDecimals && formatted !== '0') {
    const decimal = formatted.split(',')[1]
    if (!decimal?.length) formatted = formatted + ',00'
    if (decimal?.length === 1) formatted = formatted + '0'
  }

  return formatted
}


//
// Set new access token
//

export const setNewTokens = (newTokenData: { [k: string]: number | string }) => {
  const savedTokenData = localStorage.getItem('MW_MP_TOKEN_ADMIN')
  const accessCreated = new Date().valueOf()

  // If already have token data
  if (savedTokenData) {
    localStorage.setItem(
      'MW_MP_TOKEN_ADMIN',
      JSON.stringify({
        ...JSON.parse(savedTokenData),
        ...newTokenData,
        accessCreated,
      })
    )

  // or if no token data saved
  } else {
    localStorage.setItem(
      'MW_MP_TOKEN_ADMIN',
      JSON.stringify({
        ...newTokenData,
        accessCreated,
      })
    )
  }
}


//
// Get image's base64 representation
//

export const getBase64FromImage = (img: any, callback: any) => {
  const reader = new FileReader()
  reader.addEventListener('load', () => callback(reader.result))
  reader.readAsDataURL(img)
}
