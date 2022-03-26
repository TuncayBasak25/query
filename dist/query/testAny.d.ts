import { WHERE } from "./types";
declare type WHEREANY = WHERE<{
    [key: string]: any;
}>;
export declare function testAny(subject: any, expression: WHEREANY): boolean;
export {};
//# sourceMappingURL=testAny.d.ts.map