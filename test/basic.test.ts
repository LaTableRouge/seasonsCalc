import { describe, expect, it } from 'vitest';

import seasonsCalc from '../src';

describe('seasonsCalc', () => {

    describe('Northern Hemisphere 2024', () => {
        it('should return winter before spring equinox', () => {
            const date = new Date('2024-03-19 04:07:00'); // March 19, 2024 at 04:07:00 precisely
            expect(seasonsCalc(date)).toBe('winter');
        });

        it('should return spring on spring equinox', () => {
            const date = new Date('2024-03-20 04:08:00'); // March 20, 2024 at 04:08:00 precisely
            expect(seasonsCalc(date)).toBe('spring');
        });

        it('should return spring before summer solstice', () => {
            const date = new Date('2024-06-20 22:52:00'); // June 20, 2024 at 22:52:00 precisely
            expect(seasonsCalc(date)).toBe('spring');
        });

        it('should return summer on summer solstice', () => {
            const date = new Date('2024-06-20 22:53:00'); // June 20, 2024 at 22:53:00 precisely
            expect(seasonsCalc(date)).toBe('summer');
        });

        it('should return summer before autumn equinox', () => {
            const date = new Date('2024-09-22 14:44:00'); // September 22, 2024 at 14:44:00 precisely
            expect(seasonsCalc(date)).toBe('summer');
        });

        it('should return autumn on autumn equinox', () => {
            const date = new Date('2024-09-22 14:45:00'); // September 22, 2024 at 14:45:00 precisely
            expect(seasonsCalc(date)).toBe('autumn');
        });

        it('should return autumn before winter solstice', () => {
            const date = new Date('2024-12-21 10:21:00'); // December 21, 2024 at 10:21:00 precisely
            expect(seasonsCalc(date)).toBe('autumn');
        });

        it('should return winter on winter solstice', () => {
            const date = new Date('2024-12-21 10:22:00'); // December 21, 2024 at 10:22:00 precisely
            expect(seasonsCalc(date)).toBe('winter');
        });
    });

    describe('Edge cases', () => {
        it('should work with default date (current date)', () => {
            expect(() => seasonsCalc()).not.toThrow();
            expect(['spring', 'summer', 'autumn', 'winter']).toContain(seasonsCalc());
        });

        it('should work with year 1000 (edge of calculation tables)', () => {
            const date = new Date('1000-06-21 00:00:00');
            expect(() => seasonsCalc(date)).not.toThrow();
        });

        it('should work with year 2999 (near edge of calculation tables)', () => {
            const date = new Date('2999-12-21 00:00:00');
            expect(() => seasonsCalc(date)).not.toThrow();
        });
    });

    describe('Different years', () => {
        it('should handle leap years correctly', () => {
            const leapYearDate = new Date('2024-02-29 00:00:00');
            expect(() => seasonsCalc(leapYearDate)).not.toThrow();
        });

        it('should handle year change correctly', () => {
            const newYearDate = new Date('2024-01-01 00:00:00');
            expect(seasonsCalc(newYearDate)).toBe('winter');
        });
    });

    describe('Valid date object', () => {
        it('should throw an error if the date object is invalid', () => {
            expect(() => seasonsCalc('2024-02-29 00:00:00')).toThrow();
        });
        it('should not throw an error if the date object is valid', () => {
            expect(() => seasonsCalc(new Date('2024-02-29 00:00:00'))).not.toThrow();
        });
    });
});