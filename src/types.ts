export type Equinox = 'mar' | 'jun' | 'sep' | 'dec';
export type Season = 'spring' | 'summer' | 'autumn' | 'winter';

export interface YearTable {
    mar: number[];
    jun: number[];
    sep: number[];
    dec: number[];
}

export interface YearTables {
    yearTable0: YearTable;
    yearTable2000: YearTable;
}

export interface EquinoxDates {
    mar: Date;
    jun: Date;
    sep: Date;
    dec: Date;
}