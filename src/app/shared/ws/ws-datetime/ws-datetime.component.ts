import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'ws-datetime',
    templateUrl: 'ws-datetime.component.html',
    styleUrls: [
        'ws-datetime.component.css',
        '../../../app.style.css'
    ]
})
export class WsDateTimeComponent {
    @Input() wsName: string;
    @Output() wsChanged$: EventEmitter<Date> = new EventEmitter<Date>();

    public date: string;
    public time: string;
    public datetime: Date;

    constructor() {
        this.date = Date.now().toString();
        this.time = Date.now().toString();
        this.datetime = new Date(Date.now());
        console.log(this.datetime);
    }

    public updateTime(newTime) {
        console.log('NewTime: ', newTime);
        console.log('Time: ', this.time);

        this.datetime.setHours(new Date(Date.parse(this.time)).getHours());
        this.datetime.setMinutes(new Date(Date.parse(this.time)).getMinutes());
        this.datetime.setSeconds(new Date(Date.parse(this.time)).getSeconds());

        if (this.date) {
            this.datetime.setFullYear(new Date(Date.parse(this.date)).getFullYear());
            this.datetime.setDate(new Date(Date.parse(this.date)).getDay());
        }
        console.log('ws-datetime: wsChanged$()', this.datetime);
        this.wsChanged$.emit(this.datetime);
    }

    public updateDate(newDate) {
        console.log('NewDate: ', newDate);
        console.log('Date: ', this.date);

        this.datetime.setFullYear(new Date(Date.parse(this.date)).getFullYear());
        this.datetime.setDate(new Date(Date.parse(this.date)).getDay());

        if (this.time) {
            this.datetime.setHours(new Date(Date.parse(this.time)).getHours());
            this.datetime.setMinutes(new Date(Date.parse(this.time)).getMinutes());
            this.datetime.setSeconds(new Date(Date.parse(this.time)).getSeconds());
        }
        console.log('ws-datetime: wsChanged$()', this.datetime);
        this.wsChanged$.emit(this.datetime);
    }

    public chooseToday() {
        this.datetime = new Date(Date.now());
        console.log('ws-datetime: TODAY()', this.datetime);
        this.time = new Date(this.datetime.getTime()).toString();
        this.date = new Date(this.datetime.getDate()).toString();
        console.log('-------------------', this.time, '------------------');
    }
}
