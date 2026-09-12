import { AuthorityEntity } from './entity/AuthorityEntity';
import { BusinessTypeEntity } from './entity/BusinessTypeEntity';
import { EstablishmentEntity } from './entity/EstablishmentEntity';
import { RatingEntity } from './entity/RatingEntity';
export type * from './FoodHygieneRatingTypes';
import { inspect } from 'node:util';
import type { Context, Feature } from './types';
import { config } from './Config';
import { FoodHygieneRatingEntityBase } from './FoodHygieneRatingEntityBase';
import { Utility } from './utility/Utility';
import { BaseFeature } from './feature/base/BaseFeature';
declare const stdutil: Utility;
declare class FoodHygieneRatingSDK {
    _mode: string;
    _options: any;
    _utility: Utility;
    _features: Feature[];
    _rootctx: Context;
    constructor(options?: any);
    options(): any;
    utility(): any;
    prepare(fetchargs?: any): Promise<any>;
    direct(fetchargs?: any): Promise<Error | {
        ok: boolean;
        status: number;
        headers: any;
        data: any;
        err?: undefined;
    } | {
        ok: boolean;
        err: any;
        status?: undefined;
        headers?: undefined;
        data?: undefined;
    }>;
    _rawRequest(fetchargs?: any): Promise<Error | {
        ok: boolean;
        status: number;
        headers: any;
        data: any;
        err?: undefined;
    } | {
        ok: boolean;
        err: any;
        status?: undefined;
        headers?: undefined;
        data?: undefined;
    }>;
    graphql(query: string, variables?: any, ctrl?: any): Promise<any>;
    Authority(entopts?: Record<string, any>): AuthorityEntity;
    BusinessType(entopts?: Record<string, any>): BusinessTypeEntity;
    Establishment(entopts?: Record<string, any>): EstablishmentEntity;
    Rating(entopts?: Record<string, any>): RatingEntity;
    static test(testoptsarg?: any, sdkoptsarg?: any): FoodHygieneRatingSDK;
    tester(testopts?: any, sdkopts?: any): FoodHygieneRatingSDK;
    toJSON(): {
        name: string;
    };
    toString(): string;
    [inspect.custom](): string;
}
declare const SDK: typeof FoodHygieneRatingSDK;
export { stdutil, config, BaseFeature, FoodHygieneRatingEntityBase, FoodHygieneRatingSDK, SDK, };
