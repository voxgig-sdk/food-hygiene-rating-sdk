import { FoodHygieneRatingEntityBase } from '../FoodHygieneRatingEntityBase';
import type { FoodHygieneRatingSDK } from '../FoodHygieneRatingSDK';
import type { Control } from '../types';
import type { Authority, AuthorityLoadMatch, AuthorityListMatch } from '../FoodHygieneRatingTypes';
declare class AuthorityEntity extends FoodHygieneRatingEntityBase<Authority> {
    constructor(client: FoodHygieneRatingSDK, entopts: any);
    make(this: AuthorityEntity): AuthorityEntity;
    load(this: any, reqmatch?: AuthorityLoadMatch, ctrl?: Control): Promise<AuthorityEntity>;
    list(this: any, reqmatch?: AuthorityListMatch, ctrl?: Control): Promise<AuthorityEntity[]>;
}
export { AuthorityEntity };
