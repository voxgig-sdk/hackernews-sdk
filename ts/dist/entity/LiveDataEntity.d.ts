import { HackernewsEntityBase } from '../HackernewsEntityBase';
import type { HackernewsSDK } from '../HackernewsSDK';
import type { Control } from '../types';
import type { LiveData, LiveDataLoadMatch } from '../HackernewsTypes';
declare class LiveDataEntity extends HackernewsEntityBase<LiveData> {
    constructor(client: HackernewsSDK, entopts: any);
    make(this: LiveDataEntity): LiveDataEntity;
    load(this: any, reqmatch?: LiveDataLoadMatch, ctrl?: Control): Promise<LiveDataEntity>;
}
export { LiveDataEntity };
