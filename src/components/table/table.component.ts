import {Component, EventEmitter, Input, Output} from '@angular/core';
import {CardButton, CardEvent} from '../../interfaces/card.interface';
import {TableRow} from '../../interfaces/table.interface';
import {Observable} from 'rxjs/Observable';

@Component({
    selector: 'bb-table',
    templateUrl: './table.component.html',
    styleUrls: ['./table.component.scss']
})
export class TableComponent {

    // Inputs.
    @Input() public title: string = null;
    @Input() public rowIdentifier: string = null;
    @Input() public rows: TableRow[] = [];
    @Input() public data: Observable<object[]> = null;
    @Input() public rightButtonBar: CardButton[] = [];
    @Input() public selectedButtonBar: CardButton[] = [];
    @Input() public empty: string = 'This list is empty.';

    // Outputs.
    @Output() public onButtonClicked = new EventEmitter<CardEvent>();

    // Selected keys.
    public selected: string[] = [];

    /**
     * Resets the checkboxes and emits a card event.
     *
     * @param {CardEvent} event The incoming card event.
     */
    public resetAndEmit(event: CardEvent): void {
        this.onButtonClicked.emit({...event, data: this.selected.slice()});
        this.selected.length = 0;
    }

    /**
     * Handles the all checkbox clicked.
     *
     * @param {object[]} list The list of objects.
     */
    public onAllCheckboxClicked(list: object[]): void {
        this.selected.length === list.length ?
            this.selected.length = 0 :
            this.selected = list.map(item => item[this.rowIdentifier]);
    }

    /**
     * Handles the default checkbox clicked.
     *
     * @param {string} identifier The identifier of the item.
     */
    public onCheckboxClicked(identifier: string): void {
        const index = this.selected.indexOf(identifier);

        index >= 0 ?
            this.selected.splice(index, 1) :
            this.selected.push(identifier);
    }

    /**
     * Checks if the row is selected.
     *
     * @param {string} identifier The identifier of the item.
     *
     * @returns {boolean} If the row checkbox is selected.
     */
    public isRowSelected(identifier: string): boolean {
        return this.selected.indexOf(identifier) >= 0;
    }

    /**
     * @returns {CardButton[]} The current button bar.
     */
    public get buttonBar(): CardButton[] {
        return this.selected.length === 0 ?
            this.rightButtonBar :
            this.rightButtonBar.concat(this.selectedButtonBar);
    }

}
