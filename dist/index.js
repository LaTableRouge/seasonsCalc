"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var index_exports = {};
__export(index_exports, {
  default: () => index_default
});
module.exports = __toCommonJS(index_exports);
var degsToRads = (deg) => deg * Math.PI / 180;
var calculateJDE0 = (year, equinox, yearTables) => {
  const table = year < 1e3 ? yearTables.yearTable0 : yearTables.yearTable2000;
  const y = year < 1e3 ? year / 1e3 : (year - 2e3) / 1e3;
  const terms = table[equinox];
  const JDE0 = terms[0] + terms[1] * y + terms[2] * y * y + terms[3] * y * y * y + terms[4] * y * y * y * y;
  return JDE0;
};
var calculateS = (T) => {
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
    [8, 15.45, 16859.074]
  ];
  let sum = 0;
  table.forEach((term) => {
    const c = term[0] * Math.cos(degsToRads(term[1] + term[2] * T));
    sum += c;
  });
  return sum;
};
var JDEtoTimestamp = (JDE) => {
  let tmp = JDE;
  tmp -= 24405875e-1;
  tmp *= 86400;
  return tmp;
};
var convertToDate = (JDE0) => {
  const T = (JDE0 - 2451545) / 36525;
  const W = 35999.373 * T - 2.47;
  const L = 1 + 0.0334 * Math.cos(degsToRads(W)) + 7e-4 * Math.cos(2 * degsToRads(W));
  const S = calculateS(T);
  const JDE = JDE0 + 1e-5 * S / L;
  let date = JDEtoTimestamp(JDE);
  date = Math.round(date);
  return new Date(date * 1e3);
};
var calculateSeason = (now, equinoxDates) => {
  if (now <= equinoxDates.jun && now >= equinoxDates.mar) {
    return "spring";
  } else if (now <= equinoxDates.sep && now >= equinoxDates.jun) {
    return "summer";
  } else if (now <= equinoxDates.dec && now >= equinoxDates.sep) {
    return "autumn";
  } else {
    return "winter";
  }
};
var seasonsCalc = (now = /* @__PURE__ */ new Date()) => {
  const equinoxDates = {};
  const currentYear = now.getFullYear();
  const equinoxes = ["mar", "jun", "sep", "dec"];
  const yearTables = {
    // Table 27.A, for the years -1000 to 1000
    yearTable0: {
      mar: [172113929189e-5, 365242.1374, 0.06134, 111e-5, -71e-5],
      jun: [172123325401e-5, 365241.72562, -0.05323, 907e-5, 25e-5],
      sep: [172132570455e-5, 365242.49558, -0.11677, -297e-5, 74e-5],
      dec: [172141439987e-5, 365242.88257, -769e-5, -933e-5, -6e-5]
    },
    // Table 27.B, for the years 1000 to 3000
    yearTable2000: {
      mar: [245162380984e-5, 365242.37404, 0.05169, -411e-5, -57e-5],
      jun: [245171656767e-5, 365241.62603, 325e-5, 888e-5, -3e-4],
      sep: [245181021715e-5, 365242.01767, -0.11575, 337e-5, 78e-5],
      dec: [245190005952e-5, 365242.74049, -0.06223, -823e-5, 32e-5]
    }
  };
  equinoxes.forEach((equinox) => {
    const JDE0 = calculateJDE0(currentYear, equinox, yearTables);
    const date = convertToDate(JDE0);
    equinoxDates[equinox] = date;
  });
  return calculateSeason(now, equinoxDates);
};
var index_default = seasonsCalc;
if (typeof exports === "object" && typeof module !== "undefined") {
  module.exports = seasonsCalc;
} else if (typeof define === "function" && define.amd) {
  define(() => seasonsCalc);
} else {
  window.seasonsCalc = seasonsCalc;
}
