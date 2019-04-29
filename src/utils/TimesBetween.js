import moment from 'moment';

export default class TimesBetween {
    constructor(startDate, finishDate) {
        this._startDate = moment(new Date(startDate));
        this._finishDate = moment(new Date(finishDate));
    }

    get startDate() {
        return this._startDate;
    }

    get finishDate() {
        return this._finishDate;
    }

    _methodValue(method, value) {
        if (typeof(method) === 'string'){
            if (method === 'floor') {
                return Math.floor(value)
            } else if (method === 'ceil') {
                return Math.ceil(value)
            } else if (method === 'round') {
                return Math.round(value)
            }
        }
        return value
    }

    _methodHandler(method, value) {
        if (Array.isArray(method)){
            for (let i = 0 ; i < method.length ; i++){
                value = this._methodValue(method[i], value)
            }
        }
        return this._methodValue(method, value)
    }

    totalMilliseconds(method = undefined) {
        return this._methodHandler(method, Math.abs(this.finishDate - this.startDate));
    }

    totalSeconds(method = undefined) {
        return this._methodHandler(method, this.totalMilliseconds() / 1000);
    }

    totalMinutes(method = undefined) {
        return this._methodHandler(method, this.totalSeconds() / 60);
    }

    totalHours(method = undefined) {
        return this._methodHandler(method, this.totalMinutes() / 60);
    }

    totalDays(method = undefined) {
        return this._methodHandler(method, this.totalHours() / 24);
    }

    totalWeeks(method = undefined) {
        return this._methodHandler(method, this.totalDays() / 7);
    }
}