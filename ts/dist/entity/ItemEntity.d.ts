import { HackernewsEntityBase } from '../HackernewsEntityBase';
import type { HackernewsSDK } from '../HackernewsSDK';
import type { Control } from '../types';
import type { Item, ItemListMatch } from '../HackernewsTypes';
declare class ItemEntity extends HackernewsEntityBase<Item> {
    constructor(client: HackernewsSDK, entopts: any);
    make(this: ItemEntity): ItemEntity;
    list(this: any, reqmatch?: ItemListMatch, ctrl?: Control): Promise<ItemEntity[]>;
}
export { ItemEntity };
