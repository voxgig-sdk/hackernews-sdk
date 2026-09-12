export interface Item {
    by?: string;
    dead?: boolean;
    deleted?: boolean;
    descendants?: number;
    id: number;
    kids?: any[];
    parent?: number;
    parts?: any[];
    poll?: number;
    score?: number;
    text?: string;
    time?: number;
    title?: string;
    type?: string;
    url?: string;
}
export interface ItemListMatch {
    id: number;
    print?: string;
    $action?: string;
    [action: string]: any;
}
export interface LiveData {
}
export interface LiveDataLoadMatch {
    print?: string;
}
export interface Story {
}
export interface StoryListMatch {
    print?: string;
}
export interface Update {
    items?: any[];
    profiles?: any[];
}
export interface UpdateListMatch {
    print?: string;
}
export interface User {
    about?: string;
    created: number;
    id: string;
    karma: number;
    submitted?: any[];
}
export interface UserListMatch {
    id: string;
    print?: string;
    $action?: string;
    [action: string]: any;
}
