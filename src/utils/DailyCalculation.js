import TimesBetween from './TimesBetween.js'

export default class DailyCalculation {
    constructor(startDate, dailyPrice) {
        this._timeBetween = new TimesBetween(startDate, new Date())
        this._dailyPrice = dailyPrice
        this._startDate = this._timeBetween.startDate
    }

    get dailyPrice() {
        return this._dailyPrice
    }

    get startDate() {
        return this._startDate
    }

    get timeBetween() {
        return this._timeBetween
    }

    getPricePerMinute() {
        return this.dailyPrice / 24 / 60
    }

    getPrice() {
        return this.getPricePerMinute() * this.timeBetween.totalMinutes("ceil")
    }
}