import {CardButton, CardEvent} from '../../interfaces/card.interface';
import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
    selector: 'bb-card',
    templateUrl: './card.component.html',
    styleUrls: ['./card.component.scss']
})
export class CardComponent {

    // Inputs.
    @Input() public title: string;
    @Input() public padding: string;
    @Input() public overflow = 0;
    @Input() public leftButtonBar: CardButton[];
    @Input() public rightButtonBar: CardButton[];

    // Outputs.
    @Output() public onButtonClicked = new EventEmitter<CardEvent>();

    /**
     * Gets triggered when a button is clicked. It emits a button click.
     *
     * @param {CardButton} button The button that is clicked.
     */
    public onButtonClick(button: CardButton): void {
        this.onButtonClicked.emit({id: button.id});
    }

}
