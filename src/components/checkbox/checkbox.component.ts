import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {Component, forwardRef, Input} from '@angular/core';

@Component({
    selector: 'bb-checkbox',
    templateUrl: './checkbox.component.html',
    styleUrls: ['./checkbox.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => CheckboxComponent),
            multi: true
        }
    ]
})
export class CheckboxComponent implements ControlValueAccessor {

    /**
     * If the checkbox is selected.
     * @type {boolean}
     */
    @Input() public selected: boolean;

    /**
     * The label for the checkbox.
     * @type {string}
     */
    @Input() public label: string;

    /**
     * If the checkbox is disabled.
     * @type {boolean}
     */
    @Input() public disabled: boolean;

    /**
     * If the checkbox should have bottom margin.
     * @type {boolean}
     */
    @Input() public grouped = false;

    /**
     * If the checkbox should have single bottom margin.
     * @type {boolean}
     */
    @Input() public single = false;

    // Callbacks.
    public onTouchedCallback: () => void = () => {
    };
    public onChangeCallback: (_: boolean) => void = () => {
    };

    /**
     * Saves the new value.
     *
     * @param {boolean} value The new value of the checkbox.
     */
    public writeValue(value: boolean): void {
        if (this.selected !== value) {
            this.selected = value;
        }
    }

    /**
     * Registers a change in the input.
     *
     * @param {(_: boolean) => void} method The onChange callback.
     */
    public registerOnChange(method: (_: boolean) => void): void {
        this.onChangeCallback = method;
    }

    /**
     * Registers a touch.
     *
     * @param {() => void} method The touch callback.
     */
    public registerOnTouched(method: () => void): void {
        this.onTouchedCallback = method;
    }

    /**
     * Triggers when the input is set to a disabled state.
     *
     * @param {boolean} isDisabled Boolean if the input is disabled.
     */
    public setDisabledState(isDisabled: boolean): void {
        this.disabled = isDisabled;
    }

}
