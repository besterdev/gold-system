export const toFormatString = (number: number): string => {
  return number.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',')
}

export const rowOfPage = (page: number, dataCount: number, totalCount: number) => {
  let count = 0
  if (dataCount % 10) {
    count = 10 - dataCount
  }
  return `Result ${page * 10 - 9} - ${page * 10 - count} of ${totalCount}`
}
