import { FoodHygieneRatingEntityBase } from '../FoodHygieneRatingEntityBase';
import type { FoodHygieneRatingSDK } from '../FoodHygieneRatingSDK';
import type { Control } from '../types';
import type { Rating, RatingListMatch } from '../FoodHygieneRatingTypes';
declare class RatingEntity extends FoodHygieneRatingEntityBase<Rating> {
    constructor(client: FoodHygieneRatingSDK, entopts: any);
    make(this: RatingEntity): RatingEntity;
    list(this: any, reqmatch?: RatingListMatch, ctrl?: Control): Promise<RatingEntity[]>;
}
export { RatingEntity };
