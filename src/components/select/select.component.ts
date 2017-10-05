import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {Component, forwardRef, Input} from '@angular/core';
import {Option} from '../../interfaces/option.interface';

@Component({
    selector: 'bb-select',
    templateUrl: './select.component.html',
    styleUrls: ['./select.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => SelectComponent),
            multi: true
        }
    ]
})
export class SelectComponent implements ControlValueAccessor {

    // Inputs.
    @Input() public icon: string;
    @Input() public label: string;
    @Input() public grouped = true;
    @Input() public multiple = false;
    @Input() public disabled = false;
    @Input() public reversed = false;
    @Input() public items: Option[];
    @Input() public result: string;

    // Callbacks.
    public onTouchedCallback: () => void = () => {
    };
    public onChangeCallback: (_: any) => void = () => {
    };

    /**
     * Saves the new value.
     *
     * @param {boolean} value The new value of the select.
     */
    public writeValue(value: string): void {
        if (this.result !== value) {
            this.result = value;
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
