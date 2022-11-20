import {Injectable} from '@angular/core';
import {LocalStorageService} from "./local-storage.service";

@Injectable({
    providedIn: 'root'
})
export class BookmarksService {

    static bookmarkStorageEntry: string = 'bookmarks';

    entriesMap: Map<string, Array<BookmarkEntry>>;

    constructor(private storageService: LocalStorageService) {
        this.entriesMap = new Map<string, Array<BookmarkEntry>>();
        this.deserialize(storageService.get(BookmarksService.bookmarkStorageEntry));
    }

    addBookmark(name: string, entries: Array<BookmarkEntry>): void {
        console.log(this.entriesMap)
        this.entriesMap.set(name, entries);
        this.storageService.set(BookmarksService.bookmarkStorageEntry, this.serialize());
    }

    removeBookmark(name: string): void {
        this.entriesMap.delete(name);
        this.storageService.set(BookmarksService.bookmarkStorageEntry, this.serialize());
    }

    getBookmarks(): Map<string, Array<BookmarkEntry>> {
        return this.entriesMap;
    }

    private serialize(): string {
        const json = JSON.stringify(Array.from(this.entriesMap.entries()));
        console.log(json)
        return json;
    }

    private deserialize(data: string): void {
        console.log(data)
        console.log(JSON.parse(data))
        try {
            const m: Map<string, Array<BookmarkEntry>> = new Map(JSON.parse(data));
            if (m) {
                this.entriesMap = m;
            }
        } catch (e) {
            console.log(e);
        }
    }
}

export interface BookmarkEntryBuffer {
    data: Array<number>;
}

export interface BookmarkEntry {
    deviceName: string;
    configuration: BookmarkEntryBuffer;
}
