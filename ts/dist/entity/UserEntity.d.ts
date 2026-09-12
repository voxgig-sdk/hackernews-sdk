import { HackernewsEntityBase } from '../HackernewsEntityBase';
import type { HackernewsSDK } from '../HackernewsSDK';
import type { Control } from '../types';
import type { User, UserListMatch } from '../HackernewsTypes';
declare class UserEntity extends HackernewsEntityBase<User> {
    constructor(client: HackernewsSDK, entopts: any);
    make(this: UserEntity): UserEntity;
    list(this: any, reqmatch?: UserListMatch, ctrl?: Control): Promise<UserEntity[]>;
}
export { UserEntity };
