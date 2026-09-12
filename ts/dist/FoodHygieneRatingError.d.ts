import { Context } from './Context';
declare class FoodHygieneRatingError extends Error {
    isFoodHygieneRatingError: boolean;
    sdk: string;
    code: string;
    ctx: Context;
    status: number;
    get notFound(): boolean;
    constructor(code: string, msg: string, ctx: Context);
}
export { FoodHygieneRatingError };
