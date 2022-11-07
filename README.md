# seasonsCalc

seasonsCalc is a tiny Javascirpt library for calculating the season based on the current time.
Dev insipired by the [php version](https://gist.github.com/derickr/f32dd7a05d5c0a099db4e449111f5ccd) with the help of [this documentation](https://www.agopax.it/Libri_astronomia/pdf/Astronomical%20Algorithms.pdf)

## Usage example

```javascript
const actualSeason = seasonsCalc()
```

seasonsCalc is also available as an NPM package:

```bash
npm i @mlnop/seasonscalc --save-dev
```

```js
const seasonsCalc = require('@mlnop/seasonscalc')
```

## Reference

Returns a string with the season like "winter", "spring", "summer" or "autumn"

## Changelog

#### 1.0.0 &mdash; 07/11/2022

- First commit.
- Published to NPM.
