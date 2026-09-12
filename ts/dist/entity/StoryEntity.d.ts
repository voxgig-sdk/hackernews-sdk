import { HackernewsEntityBase } from '../HackernewsEntityBase';
import type { HackernewsSDK } from '../HackernewsSDK';
import type { Control } from '../types';
import type { Story, StoryListMatch } from '../HackernewsTypes';
declare class StoryEntity extends HackernewsEntityBase<Story> {
    constructor(client: HackernewsSDK, entopts: any);
    make(this: StoryEntity): StoryEntity;
    list(this: any, reqmatch?: StoryListMatch, ctrl?: Control): Promise<StoryEntity[]>;
}
export { StoryEntity };
