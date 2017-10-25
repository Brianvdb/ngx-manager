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
    @Input() public header = true;
    @Input() public overflow = 0;

    // Selected keys.
    @Input() public selected: string[] = [];

    // Outputs.
    @Output() public onButtonClicked = new EventEmitter<CardEvent>();
    @Output() public onSelectedChange = new EventEmitter<string[]>();

    /**
     * Resets the checkboxes and emits a card event.
     *
     * @param {CardEvent} event The incoming card event.
     */
    public resetAndEmit(event: CardEvent): void {
        this.onButtonClicked.emit({...event, data: this.selected.slice()});
        this.selected.length = 0;
        this.onSelectedChange.emit(this.selected.slice());
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

        this.onSelectedChange.emit(this.selected.slice());
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

        this.onSelectedChange.emit(this.selected.slice());
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

    /**
     * Angular loop optimizations.
     *
     * @param {number} index The index of the item.
     * @param {object} item The item.
     *
     * @returns {number} The unique identifier.
     */
    public trackByRowIdentifier(index: number, item: object): string {
        return item[this.rowIdentifier];
    }

    /**
     * Angular loop optimizations.
     *
     * @param {number} index The index of the item.
     * @param {TableRow} row The table row.
     *
     * @returns {number} The unique identifier.
     */
    public trackByRow(index: number, row: TableRow): string {
        return row.label + index;
    }

}
