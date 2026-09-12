import { HackernewsEntityBase } from '../HackernewsEntityBase';
import type { HackernewsSDK } from '../HackernewsSDK';
import type { Control } from '../types';
import type { Update, UpdateListMatch } from '../HackernewsTypes';
declare class UpdateEntity extends HackernewsEntityBase<Update> {
    constructor(client: HackernewsSDK, entopts: any);
    make(this: UpdateEntity): UpdateEntity;
    list(this: any, reqmatch?: UpdateListMatch, ctrl?: Control): Promise<UpdateEntity[]>;
}
export { UpdateEntity };
