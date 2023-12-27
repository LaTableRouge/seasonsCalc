/*
 * Sources :
 * https://gist.github.com/derickr/f32dd7a05d5c0a099db4e449111f5ccd
 * https://www.agopax.it/Libri_astronomia/pdf/Astronomical%20Algorithms.pdf
 * */
const degsToRads = (deg) => (deg * Math.PI) / 180.0

/* Meeus, page 177 */
const calculateJDE0 = (year, equinox, yearTables) => {
  const table = year < 1000 ? yearTables.yearTable0 : yearTables.yearTable2000
  const y = year < 1000 ? year / 1000 : (year - 2000) / 1000
  const terms = table[equinox]

  const JDE0 = terms[0] + terms[1] * y + terms[2] * y * y + terms[3] * y * y * y + terms[4] * y * y * y * y

  return JDE0
}

/* Meeus, Table 27.C, page 179 */
const calculateS = (T) => {
  const table = [
    [485, 324.96, 1934.136],
    [203, 337.23, 32964.467],
    [199, 342.08, 20.186],
    [182, 27.85, 445267.112],
    [156, 73.14, 45036.886],
    [136, 171.52, 22518.443],
    [77, 222.54, 65928.934],
    [74, 296.72, 3034.906],
    [70, 243.58, 9037.513],
    [58, 119.81, 33718.147],
    [52, 297.17, 150.678],
    [50, 21.02, 2281.226],
    [45, 247.54, 29929.562],
    [44, 325.15, 31555.956],
    [29, 60.93, 4443.417],
    [18, 155.12, 67555.328],
    [17, 288.79, 4562.452],
    [16, 198.04, 62894.029],
    [14, 199.76, 31436.921],
    [12, 95.39, 14577.848],
    [12, 287.11, 31931.756],
    [12, 320.81, 34777.259],
    [9, 227.73, 1222.114],
    [8, 15.45, 16859.074],
  ]

  let sum = 0
  table.forEach((term) => {
    const c = term[0] * Math.cos(degsToRads(term[1] + term[2] * T))

    sum += c
  })

  return sum
}

const JDEtoTimestamp = ($JDE) => {
  let tmp = $JDE
  tmp -= 2440587.5
  tmp *= 86400

  return tmp
}

const convertToDate = (JDE0) => {
  const T = (JDE0 - 2451545.0) / 36525
  const W = 35999.373 * T - 2.47
  const L = 1 + 0.0334 * Math.cos(degsToRads(W)) + 0.0007 * Math.cos(2 * degsToRads(W))
  const S = calculateS(T)

  /* Meeus, page 178 */
  const JDE = JDE0 + (0.00001 * S) / L

  let date = JDEtoTimestamp(JDE)
  date = Math.round(date)

  return new Date(date * 1000)
}

const calculateSeason = (now, equinoxDates) => {
  if (now <= equinoxDates.jun && now >= equinoxDates.mar) {
    return 'spring'
  } else if (now <= equinoxDates.sep && now >= equinoxDates.jun) {
    return 'summer'
  } else if (now <= equinoxDates.dec && now >= equinoxDates.sep) {
    return 'autumn'
  } else {
    return 'winter'
  }
}

const seasonsCalc = (now = new Date()) => {
  const equinoxDates = {}
  const currentYear = now.getFullYear()

  const equinoxes = ['mar', 'jun', 'sep', 'dec']

  /* Tables from Meeus, page 178 */
  const yearTables = {
    // Table 27.A, for the years -1000 to 1000
    yearTable0: {
      mar: [1721139.29189, +365242.13740, +0.06134, +0.00111, -0.00071],
      jun: [1721233.25401, +365241.72562, -0.05323, +0.00907, +0.00025],
      sep: [1721325.70455, +365242.49558, -0.11677, -0.00297, +0.00074],
      dev: [1721414.39987, +365242.88257, -0.00769, -0.00933, -0.00006],
    },
    // Table 27.B, for the years 1000 to 3000
    yearTable2000: {
      mar: [2451623.80984, +365242.37404, +0.05169, -0.00411, -0.00057],
      jun: [2451716.56767, +365241.62603, +0.00325, +0.00888, -0.00030],
      sep: [2451810.21715, +365242.01767, -0.11575, +0.00337, +0.00078],
      dec: [2451900.05952, +365242.74049, -0.06223, -0.00823, +0.00032],
    },
  }

  /* Meeus, page 177 */
  equinoxes.forEach((equinox) => {
    const JDE0 = calculateJDE0(currentYear, equinox, yearTables)
    const date = convertToDate(JDE0)
    equinoxDates[equinox] = date
  })

  return calculateSeason(now, equinoxDates)
}

// export as Node module / AMD module / browser variable
if (typeof exports === 'object' && typeof module !== 'undefined') {
  module.exports = seasonsCalc
} else if (typeof define === 'function' && define.amd) {
  define(seasonsCalc)
} else {
  window.seasonsCalc = seasonsCalc
}