import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges, forwardRef } from '@angular/core';
import * as _moment from 'moment';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
const noop = () => { };
const moment = _moment;

@Component({
    selector: 'daterangepicker',
    styleUrls: ['./daterangepicker.component.scss'],
    templateUrl: './daterangepicker.component.html',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => DaterangepickerComponent),
            multi: true
        }
    ]
})

export class DaterangepickerComponent implements OnInit, OnChanges {
    /** Emitting selected date object as output */
    @Output() public dateSelected: EventEmitter<any> = new EventEmitter<any>();
    /** Taking start date */
    @Input() public inputStartDate: any = '';
    /** Taking end date */
    @Input() public inputEndDate: any = '';
    /* This will hold start date */
    public startDate: any = '';
    /* This will hold end date */
    public endDate: any = '';
    /* This will hold min date */
    public minDate: any;
    /* This will hold max date */
    public maxDate: any;
    /** Internal data model */
    private innerValue: any = '';

    /** Placeholders for the callbacks which are later provided by the Control Value Accessor */
    private onTouchedCallback: () => void = noop;
    private onChangeCallback: (_: any) => void = noop;

    constructor() {

    }

    /**
     * Initializes the component
     *
     * @memberof DaterangepickerComponent
     */
    public ngOnInit(): void {
        if (this.inputStartDate) {
            this.startDate = moment(this.inputStartDate, "YYYY-MM-DD").toDate();
        }
        if (this.inputEndDate) {
            this.endDate = moment(this.inputEndDate, "YYYY-MM-DD").toDate();
        }
    }

    /**
     * Updates the value on value change event
     *
     * @param {SimpleChanges} changes
     * @memberof DaterangepickerComponent
     */
    public ngOnChanges(changes: SimpleChanges): void {
        if (changes.inputStartDate && changes.inputStartDate.currentValue) {
            this.startDate = changes.inputStartDate.currentValue.toDate();
        }
        if (changes.inputEndDate && changes.inputEndDate.currentValue) {
            this.endDate = changes.inputEndDate.currentValue.toDate();
            this.dateSelected.emit({ startDate: this.startDate, endDate: this.endDate });
        }
    }

    /**
     * Callback for date range change
     *
     * @param {MatDatepickerInputEvent<Date>} event
     * @memberof DaterangepickerComponent
     */
    public dateChange(type: string, event: MatDatepickerInputEvent<Date>): void {
        if (type === "start") {
            this.startDate = moment(event.value, "YYYY-MM-DD").toDate();
        }
        if (type === "end") {
            this.endDate = moment(event.value, "YYYY-MM-DD").toDate();
        }

        this.onChangeCallback([this.startDate, this.endDate]);
    }

    /**
     * This is used to get the inner value of datepicker
     *
     * @type {*}
     * @memberof DaterangepickerComponent
     */
     get value(): any {
        return this.innerValue;
    };

    /**
     * set accessor including call the onchange callback
     *
     * @memberof DaterangepickerComponent
     */
    set value(value: any) {
        if (value !== this.innerValue) {
            this.innerValue = value;
            this.onChangeCallback(value);
        }
    }

    /**
     * Used to Set touched on blur
     *
     * @memberof DaterangepickerComponent
     */
    public onBlur(): void {
        this.onTouchedCallback();
    }

    /**
     * Form ControlValueAccessor interface
     *
     * @param {*} value
     * @memberof DaterangepickerComponent
     */
    public writeValue(value: any): void {
        if (value && value !== this.innerValue) {
            this.innerValue = value;
        }
    }

    /**
     * Form ControlValueAccessor interface
     *
     * @param {*} fn
     * @memberof DaterangepickerComponent
     */
    public registerOnChange(fn: any): void {
        this.onChangeCallback = fn;
    }

    /**
     * Form ControlValueAccessor interface
     *
     * @param {*} fn
     * @memberof DaterangepickerComponent
     */
    public registerOnTouched(fn: any): void {
        this.onTouchedCallback = fn;
    }
}
