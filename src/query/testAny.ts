import { testNumber } from "./testNumber";
import { testString } from "./testString";
import { NumberOptions, StringOptions, WHERE } from "./types";

type WHEREANY = WHERE<{ [key: string]: any }>;

export function testAny(subject: any, expression: WHEREANY): boolean {
    for (let [operation, condition] of Object.entries(expression)) {
        switch (operation) {
            case 'OR': {
                let returnFalse = (condition as WHEREANY[]).length && true;
                for (let subExpression of condition as WHEREANY[]) {
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
                for (let subExpression of condition as WHEREANY[]) {
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
                        if (!testString(subjectProperty, condition as StringOptions)) {
                            return false;
                        }
                    }
                    else if (typeof subjectProperty === 'number') {
                        if (!testNumber(subjectProperty, condition as NumberOptions)) {
                            return false;
                        }
                    }
                    else if (subjectProperty.constructor.name === 'Array') {
                        let returnFalse = (subjectProperty as any[]).length && true;
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