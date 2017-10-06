import {Component, forwardRef, HostListener, Input, OnInit} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {TranslationsService} from '../../services/translations.service';

@Component({
    selector: 'bb-date-picker',
    styleUrls: ['./date-picker.component.scss'],
    templateUrl: './date-picker.component.html',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => DatePickerComponent),
            multi: true
        }
    ]
})
export class DatePickerComponent implements OnInit, ControlValueAccessor {

    public calendar: { date: Date, number: number, active: boolean }[][];
    public visible = false;
    public current = new Date();
    public days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    public months = ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august',
        'september', 'october', 'november', 'december'];

    /**
     * The value of the date-picker.
     * @type {Date}
     */
    @Input() public value: Date;

    /**
     * The disabled state of the date-picker.
     * @type {boolean}
     */
    @Input() public disabled = false;

    /**
     * The material-icon identifier.
     * @type {string}
     */
    @Input() public icon: string;

    /**
     * The placeholder identifier.
     * @type {string}
     */
    @Input() public placeholder = 'Please select a date';

    /**
     * The label for the date-picker.
     * @type {string}
     */
    @Input() public label: string;

    /**
     * If the icon should be reversed.
     * @type {boolean}
     */
    @Input() public reversed = false;

    /**
     * If the date-picker should have bottom margin.
     * @type {boolean}
     */
    @Input() public grouped = true;

    // Callbacks.
    public onTouchedCallback: () => void = () => {
    };
    public onChangeCallback: (_: Date) => void = () => {
    };

    public constructor(private translations: TranslationsService) {
    }

    public ngOnInit(): void {
        // Get the calendar for the date.
        this.recalculate();
    }

    public onDayClick(day: { date: Date, number: number, active: boolean }): void {
        this.writeValue(day.date);
    }

    public get date(): string {
        this.value = this.value || new Date();
        const translation = this.translations.instant(this.days[this.value.getDay()]);
        const day = translation.charAt(0).toUpperCase() + translation.slice(1);
        const date = this.value.getDate();
        const year = this.value.getFullYear();
        const month = this.translations.instant(this.months[this.value.getMonth()]);

        return `${day} ${date} ${month} ${year}`;
    }

    public get month(): string {
        return this.current ? this.months[this.current.getMonth()] : '-';
    }

    public get year(): string {
        return this.current ? this.current.getFullYear() + '' : '-';
    }

    public recalculate(number: number = 0): void {
        this.current = this.current || new Date();
        this.current.setMonth(this.current.getMonth() + number);
        this.calendar = this.getCalendar();
    }

    public getCalendar(): { date: Date, number: number, active: boolean }[][] {
        const current = this.getFirstDayOfMonth(this.current);
        const weeks = [];

        // Loop through six weeks.
        for (let index = 0; index < 6; index++) {
            // Get the week.
            const week = [];
            // Loop through seven days per week.
            for (let j = 0; j < 7; j++) {
                const weekDate = new Date(current);
                week.push({
                    date: weekDate,
                    number: weekDate.getDate(),
                    active: this.current.getMonth() === weekDate.getMonth()
                });
                current.setDate(current.getDate() + 1);
            }
            // Add the week to the total.
            weeks.push(week);
        }

        return weeks;
    }

    private getFirstDayOfMonth(date: Date = null): Date {
        const current = date ? new Date(date) : new Date();
        const year = current.getFullYear();
        const month = current.getMonth();

        // Get the first day of the month.
        const firstDayOfMonth = new Date(year, month, 1);

        // Get the first day of the week
        return this.getFirstDayOfWeek(firstDayOfMonth);
    }

    private getFirstDayOfWeek(current: Date): Date {
        const date = new Date(current);
        const dayOfWeek = date.getDay();
        const diff = date.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1);
        return new Date(date.setDate(diff));
    }

    /**
     * Handle for when the user clicks outside the drop-down area.
     *
     * @param event The event containing if the click was outside.
     */
    public onClickOutside(event: Object): void {
        const isDatePicker = typeof event['target'].className === 'string'
            && !event['target'].className.includes('input--date-picker--bb');

        if (event && event['value'] === true && isDatePicker) {
            this.toggle(false);
        }
    }

    /**
     * Toggles the dropdown menu with a given value.
     *
     * @param value A boolean.
     */
    public toggle(value: boolean): void {
        this.visible = value;
    }

    @HostListener('click', ['$event.target'])
    public onHost(): void {
        this.toggle(true);
    }

    /**
     * Saves the new value.
     *
     * @param {Date} value The new value of the checkbox.
     */
    public writeValue(value: Date): void {
        if (this.value !== value) {
            this.value = value;
        }
    }

    /**
     * Registers a change in the input.
     *
     * @param {(_: Date) => void} method The onChange callback.
     */
    public registerOnChange(method: (_: Date) => void): void {
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