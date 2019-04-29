export function getCalculatePrice(start, end, price) {
  let diff = end - start
  let vMinute = diff / 1000 / 60
  let totalPrice = Math.round(price * (Math.floor(vMinute / 60) + ((vMinute % 60) / 60) ) * 100 ) / 100 
  return totalPrice
}

export function getCalculateHours(start, end) {
  let diff = end - start
  let vHour = Math.floor(diff / 1000 / 60 / 60)  
  return vHour
}

export function getCalculateDay(start, end) {
  let diff = end - start
  let vHour = Math.floor(diff / 1000 / 60 / 60)  
  let vDay = vHour / 24
  return vDay
}

export function fixedNumber(numb) {
  return numb.toFixed(2)
}