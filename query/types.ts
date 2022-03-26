type WHERE<Options> = {
    OR?: WHERE<Options>[],
    AND?: WHERE<Options>[],
    NOT?: WHERE<Options>
} & Options;

type Query<Options> = {
    where?: WHERE<Options>,

    offset?: number,
    limit?: number,
    page?: number
}

type tuple<T> = [T, T];

type OrNot<T> = {
    OR?: T[],
    NOT?: T | T[]
};

type Operators<T> = {
    AND?: T[],
} & OrNot<T>;

type NumberOptions = number | {
    greater?: number,
    greaterOrEqual?: number,
    lesser?: number,
    lesserOrEqual?: number,
    betweenIncluded?: tuple<number>,
    betweenExcluded?: tuple<number>,
    notBetweenIncluded?: tuple<number>,
    notBetweenExcluded?: tuple<number>
} & OrNot<number>;

type StringOptions = string | {
    include?: string | Operators<string>,
    start?: string | OrNot<string>,
    end?: string | OrNot<string>,
    length?: NumberOptions,
} & OrNot<string>;

export type {
    WHERE,
    Query,
    NumberOptions,
    StringOptions,
    Operators,
    tuple
}