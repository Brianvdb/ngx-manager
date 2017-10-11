import {Component, Input} from '@angular/core';

@Component({
    selector: 'bb-button',
    styleUrls: ['./button.component.scss'],
    templateUrl: './button.component.html'
})
export class ButtonComponent {

    /**
     * The text of the button.
     * @type {string}
     */
    @Input() public text: string;

    /**
     * The icon of the button (material-icons).
     * @type {string}
     */
    @Input() public icon: string;

    /**
     * The loading state of the button.
     * @type {boolean}
     */
    @Input() public loading = false;

    /**
     * The disabled state of the button.
     * @type {boolean}
     */
    @Input() public disabled = false;

    /**
     * The reversed state of the button.
     * @type {boolean}
     */
    @Input() public reversed = false;

    /**
     * The grouped state of the button.
     * @type {boolean}
     */
    @Input() public grouped = false;

    /**
     * The type of the button.
     * @type {string}
     */
    @Input() public type = 'button';

    /**
     * The color of the button.
     * @type {string}
     */
    @Input() public color = 'blue';

}
