import {Component, Input, OnInit} from '@angular/core';
import {BookmarkEntry} from "../../../services/bookmarks.service";

@Component({
    selector: 'app-bookmark-entry',
    templateUrl: './bookmark-entry.component.html',
    styleUrls: ['./bookmark-entry.component.scss']
})
export class BookmarkEntryComponent implements OnInit {

    @Input() entry: BookmarkEntry | undefined;

    constructor() {
    }

    ngOnInit(): void {
    }
}
