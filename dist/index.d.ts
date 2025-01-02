type Season = 'spring' | 'summer' | 'autumn' | 'winter';

declare global {
    interface Window {
        seasonsCalc: typeof seasonsCalc;
    }
}
declare const seasonsCalc: (now?: Date) => Season;

export { seasonsCalc as default };
