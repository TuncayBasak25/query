import { testNumber } from "./testNumber";
import { NumberOptions, Operators, StringOptions } from "./types";

export function testString(value: string, conditions: StringOptions): boolean {

    if (typeof conditions === 'string') {
        return value === conditions;
    }

    for (let [operation, operationValue] of Object.entries(conditions)) {
        switch (operation) {
            case 'OR': {
                if ((operationValue as string[]).indexOf(value) === -1) {
                    return false;
                }
                break;
            }
            case 'NOT': {
                if (typeof operationValue === 'string') {
                    if (value === operationValue) {
                        return false;
                    }
                    break;
                }
                if ((operationValue as string[]).indexOf(value) !== -1) {
                    return false;
                }
                break;
            }
            case 'length': {
                if (!testNumber(value.length, operationValue as NumberOptions)) {
                    return false;
                }
                break;
            }
            case 'include': {
                if (typeof operationValue === 'string') {
                    if (value.indexOf(operationValue) === -1) {
                        return false;
                    }
                    break;
                }
                for (let [operator, includeValueList] of Object.entries(operationValue as Operators<string>)) {
                    switch (operator) {
                        case 'OR': {
                            let notIncluded = includeValueList.length && true;
                            for (let includeValue of includeValueList) {
                                if (value.indexOf(includeValue) !== -1) {
                                    notIncluded = false;
                                    break;
                                }
                            }
                            if (notIncluded) {
                                return false;
                            }
                            break;
                        }
                        case 'AND': {
                            for (let includeValue of includeValueList) {
                                if (value.indexOf(includeValue) === -1) {
                                    return false;
                                }
                            }
                            break;
                        }
                        case 'NOT': {
                            if (typeof includeValueList === 'string') {
                                if (value.indexOf(includeValueList) !== -1) {
                                    return false;
                                }
                                break;
                            }
                            for (let includeValue of includeValueList) {
                                if (value.indexOf(includeValue) !== -1) {
                                    return false;
                                }
                            }
                            break;
                        }
                    }
                }
                break;
            }
            case 'start': {
                if (typeof operationValue === 'string') {
                    if (value.indexOf(operationValue) !== 0) {
                        return false;
                    }
                    break;
                }
                for (let [operator, startValueList] of Object.entries(operationValue as Operators<string>)) {
                    switch (operator) {
                        case 'OR': {
                            let notStarting = startValueList.length && true;
                            for (let startValue of startValueList) {
                                if (value.indexOf(startValue) === 0) {
                                    notStarting = false;
                                    break;
                                }
                            }
                            if (notStarting) {
                                return false;
                            }
                            break;
                        }
                        case 'NOT': {
                            if (typeof startValueList === 'string') {
                                if (value.indexOf(startValueList) === 0) {
                                    return false;
                                }
                                break;
                            }
                            for (let startValue of startValueList) {
                                if (value.indexOf(startValue) === 0) {
                                    return false;
                                }
                            }
                            break;
                        }
                    }
                }
                break;
            }
            case 'end': {
                if (typeof operationValue === 'string') {
                    if (value.indexOf(operationValue) + operationValue.length !== value.length) {
                        return false;
                    }
                    break;
                }
                for (let [operator, endValueList] of Object.entries(operationValue as Operators<string>)) {
                    switch (operator) {
                        case 'OR': {
                            let notEnding = endValueList.length && true;
                            for (let endValue of endValueList) {
                                if (value.indexOf(endValue) + endValue.length === value.length) {
                                    notEnding = false;
                                    break;
                                }
                            }
                            if (notEnding) {
                                return false;
                            }
                            break;
                        }
                        case 'NOT': {
                            if (typeof endValueList === 'string') {
                                if (value.indexOf(endValueList) + endValueList.length === value.length) {
                                    return false;
                                }
                                break;
                            }
                            for (let endValue of endValueList) {
                                if (value.indexOf(endValue) + endValue.length === value.length) {
                                    return false;
                                }
                            }
                            break;
                        }
                    }
                }
                break;
            }
        }
    }

    return true;
}