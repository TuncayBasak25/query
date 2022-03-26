"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.testAny = void 0;
const testNumber_1 = require("./testNumber");
const testString_1 = require("./testString");
function testAny(subject, expression) {
    for (let [operation, condition] of Object.entries(expression)) {
        switch (operation) {
            case 'OR': {
                let returnFalse = condition.length && true;
                for (let subExpression of condition) {
                    if (testAny(subject, subExpression)) {
                        returnFalse = false;
                        break;
                    }
                }
                if (returnFalse) {
                    return false;
                }
                break;
            }
            case 'AND': {
                for (let subExpression of condition) {
                    if (!testAny(subject, subExpression)) {
                        return false;
                    }
                }
                break;
            }
            case 'NOT': {
                if (testAny(subject, condition)) {
                    return false;
                }
                break;
            }
            default: {
                const subjectProperty = subject[operation];
                if (subjectProperty) {
                    if (typeof subjectProperty === 'string') {
                        if (!(0, testString_1.testString)(subjectProperty, condition)) {
                            return false;
                        }
                    }
                    else if (typeof subjectProperty === 'number') {
                        if (!(0, testNumber_1.testNumber)(subjectProperty, condition)) {
                            return false;
                        }
                    }
                    else if (subjectProperty.constructor.name === 'Array') {
                        let returnFalse = subjectProperty.length && true;
                        for (let property of subjectProperty) {
                            if (testAny(property, condition)) {
                                returnFalse = false;
                                break;
                            }
                        }
                        if (returnFalse) {
                            return false;
                        }
                    }
                    else {
                        if (!testAny(subjectProperty, condition)) {
                            return false;
                        }
                    }
                }
            }
        }
    }
    return true;
}
exports.testAny = testAny;
