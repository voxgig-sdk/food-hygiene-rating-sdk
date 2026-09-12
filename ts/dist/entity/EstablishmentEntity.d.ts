import { FoodHygieneRatingEntityBase } from '../FoodHygieneRatingEntityBase';
import type { FoodHygieneRatingSDK } from '../FoodHygieneRatingSDK';
import type { Control } from '../types';
import type { Establishment, EstablishmentLoadMatch, EstablishmentListMatch } from '../FoodHygieneRatingTypes';
declare class EstablishmentEntity extends FoodHygieneRatingEntityBase<Establishment> {
    constructor(client: FoodHygieneRatingSDK, entopts: any);
    make(this: EstablishmentEntity): EstablishmentEntity;
    load(this: any, reqmatch?: EstablishmentLoadMatch, ctrl?: Control): Promise<EstablishmentEntity>;
    list(this: any, reqmatch?: EstablishmentListMatch, ctrl?: Control): Promise<EstablishmentEntity[]>;
}
export { EstablishmentEntity };
