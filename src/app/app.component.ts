import {Component} from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    public title = 'RGB Window App';
    public navEntries: Array<Array<NavEntry>>;

    constructor() {
        this.navEntries = [[
            {label: 'Recipes', icon: 'book', path: 'recipes'},
        ], [
            {label: 'Brass', icon: 'book', path: 'brass'},
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
