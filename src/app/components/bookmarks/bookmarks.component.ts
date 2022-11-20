import {Component, OnInit} from '@angular/core';
import {BookmarkEntry, BookmarksService} from "../../services/bookmarks.service";

@Component({
    selector: 'app-bookmarks',
    templateUrl: './bookmarks.component.html',
    styleUrls: ['./bookmarks.component.scss']
})
export class BookmarksComponent implements OnInit {
    entriesMap: Map<string, Array<BookmarkEntry>>;

    constructor(private bookmarksService: BookmarksService) {
        this.entriesMap = new Map<string, Array<BookmarkEntry>>();
    }

    ngOnInit(): void {
        const map = this.bookmarksService.getBookmarks();
        if (map) {
            this.entriesMap = map;
        }
    }
}
