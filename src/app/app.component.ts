import {Component} from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    public title = 'Ozero RGB App';
    public navEntries: Array<Array<NavEntry>>;

    constructor() {
        this.navEntries = [[
            {label: 'Devices', icon: 'devices', path: 'devices'}
        ], [
            {label: 'Bookmarks', icon: 'bookmark_border', path: 'bookmarks'}
        ]];
    }

    public onExitClick(): void {
    }
}

interface NavEntry {
    label: string;
    icon: string;
    path: string;
}
