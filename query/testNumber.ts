import { NumberOptions, tuple } from "./types";

export function testNumber(value: number, conditions: NumberOptions): boolean {
    if (typeof conditions === 'number') {
        return value === conditions;
    }

    for (let [operation, testValue] of Object.entries(conditions)) {
        switch (operation) {
            case 'greater': {
                if (value <= testValue) {
                    return false;
                }
                break;
            }
            case 'lesser': {
                if (value >= testValue) {
                    return false;
                }
                break;
            }
            case 'greaterOrEqual': {
                if (value < testValue) {
                    return false;
                }
                break;
            }
            case 'lesserOrEqual': {
                if (value > testValue) {
                    return false;
                }
                break;
            }
            case 'betweenIncluded': {
                if (value < (testValue as tuple<number>)[0] || value > (testValue as tuple<number>)[1]) {
                    return false;
                }
                break;
            }
            case 'betweenExcluded': {
                if (value <= (testValue as tuple<number>)[0] || value >= (testValue as tuple<number>)[1]) {
                    return false;
                }
                break;
            }
            case 'notBetweenIncluded': {
                if (value >= (testValue as tuple<number>)[0] && value <= (testValue as tuple<number>)[1]) {
                    return false;
                }
                break;
            }
            case 'notBetweenExcluded': {
                if (value > (testValue as tuple<number>)[0] && value < (testValue as tuple<number>)[1]) {
                    return false;
                }
                break;
            }
            case 'OR': {
                if ((testValue as number[]).indexOf(value) === -1) {
                    return false;
                }
                break;
            }
            case 'NOT': {
                if (typeof testValue === 'number') {
                    if (value === testValue) {
                        return false;
                    }
                    break;
                }
                if ((testValue as number[]).indexOf(value) !== -1) {
                    return false;
                }
                break;
            }
        }
    }

    return true;
}