import { FoodHygieneRatingEntityBase } from '../FoodHygieneRatingEntityBase';
import type { FoodHygieneRatingSDK } from '../FoodHygieneRatingSDK';
import type { Control } from '../types';
import type { BusinessType, BusinessTypeListMatch } from '../FoodHygieneRatingTypes';
declare class BusinessTypeEntity extends FoodHygieneRatingEntityBase<BusinessType> {
    constructor(client: FoodHygieneRatingSDK, entopts: any);
    make(this: BusinessTypeEntity): BusinessTypeEntity;
    list(this: any, reqmatch?: BusinessTypeListMatch, ctrl?: Control): Promise<BusinessTypeEntity[]>;
}
export { BusinessTypeEntity };
