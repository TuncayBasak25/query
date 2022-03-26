"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.testNumber = void 0;
function testNumber(value, conditions) {
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
                if (value < testValue[0] || value > testValue[1]) {
                    return false;
                }
                break;
            }
            case 'betweenExcluded': {
                if (value <= testValue[0] || value >= testValue[1]) {
                    return false;
                }
                break;
            }
            case 'notBetweenIncluded': {
                if (value >= testValue[0] && value <= testValue[1]) {
                    return false;
                }
                break;
            }
            case 'notBetweenExcluded': {
                if (value > testValue[0] && value < testValue[1]) {
                    return false;
                }
                break;
            }
            case 'OR': {
                if (testValue.indexOf(value) === -1) {
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
                if (testValue.indexOf(value) !== -1) {
                    return false;
                }
                break;
            }
        }
    }
    return true;
}
exports.testNumber = testNumber;
