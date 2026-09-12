import { ItemEntity } from './entity/ItemEntity';
import { LiveDataEntity } from './entity/LiveDataEntity';
import { StoryEntity } from './entity/StoryEntity';
import { UpdateEntity } from './entity/UpdateEntity';
import { UserEntity } from './entity/UserEntity';
export type * from './HackernewsTypes';
import { inspect } from 'node:util';
import type { Context, Feature } from './types';
import { config } from './Config';
import { HackernewsEntityBase } from './HackernewsEntityBase';
import { Utility } from './utility/Utility';
import { BaseFeature } from './feature/base/BaseFeature';
declare const stdutil: Utility;
declare class HackernewsSDK {
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
    Item(entopts?: Record<string, any>): ItemEntity;
    LiveData(entopts?: Record<string, any>): LiveDataEntity;
    Story(entopts?: Record<string, any>): StoryEntity;
    Update(entopts?: Record<string, any>): UpdateEntity;
    User(entopts?: Record<string, any>): UserEntity;
    static test(testoptsarg?: any, sdkoptsarg?: any): HackernewsSDK;
    tester(testopts?: any, sdkopts?: any): HackernewsSDK;
    toJSON(): {
        name: string;
    };
    toString(): string;
    [inspect.custom](): string;
}
declare const SDK: typeof HackernewsSDK;
export { stdutil, config, BaseFeature, HackernewsEntityBase, HackernewsSDK, SDK, };
