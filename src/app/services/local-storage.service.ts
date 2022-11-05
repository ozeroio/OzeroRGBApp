import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class LocalStorageService {

    private static LOCAL_STORAGE_KEY = 'rgb-app';

    private readonly subjects: Map<string, Subject<any>>;
    private readonly data: { [key: string]: any };
    private readonly storageProvider: Storage;

    constructor() {
        this.subjects = new Map<string, Subject<any>>();
        this.storageProvider = (isStorageAvailable(window.localStorage)) ? window.localStorage : new InMemoryStorage();
        this.data = {};
        const content = this.storageProvider.getItem(LocalStorageService.LOCAL_STORAGE_KEY);
        if (content) {
            this.data = JSON.parse(content) || {};
        }
    }

    public set(key: string, value: any): void {
        this.data[key] = value;
        this.storageProvider.setItem(LocalStorageService.LOCAL_STORAGE_KEY, JSON.stringify(this.data));
        const sub = this.subjects.get(key);
        if (sub) {
            sub.next(value);
        }
    }

    public get(key: string): any {
        return this.data[key];
    }

    public onChange(key: string): Subject<any> | undefined {
        if (this.subjects.has(key)) {
            return this.subjects.get(key);
        }
        const sub = new Subject<any>();
        this.subjects.set(key, sub);
        return sub;
    }
}

interface Storage {

    getItem(key: string): string | null;

    setItem(key: string, value: string): void;

    removeItem(key: string): void;
}


class InMemoryStorage implements Storage {

    private readonly storage: Map<string, string>;

    constructor() {
        this.storage = new Map<string, string>();
    }

    public getItem(key: string): string | null {
        const item = this.storage.get(key);
        if (item == undefined) {
            return null;
        }
        return item;
    }

    public setItem(key: string, value: string): void {
        this.storage.set(key, value);
    }

    public removeItem(key: string): void {
        this.storage.delete(key);
    }
}

function isStorageAvailable(storage: Storage | undefined): boolean {
    if (!storage) {
        return false;
    }

    // Check if the storage can actually be accessed.
    try {
        const now = Date.now();
        const testItemKey = `isStorageAvailableTestEntry-${now}`;
        const testItemValue = `isStorageAvailableTestEntry-${now}`;
        storage.setItem(testItemKey, testItemValue);
        const retrievedItemValue = storage.getItem(testItemKey);
        storage.removeItem(testItemKey);
        return retrievedItemValue === testItemValue;
    } catch (error) {
        return false;
    }
}
