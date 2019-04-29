import TimesBetween from './TimesBetween.js'

export default class TimesRemaining extends TimesBetween {
    // constructor(startDate, finishDate) {
    //     super(startDate, finishDate)
    // }

    different() {
        let res = {};
        let val = this.totalDays();
        let previousValue = 0
        const timeTypes = {
            // weeks: 7,
            days: 24,
            hours: 60,
            minutes: 60,
            seconds: 1000,
            milliseconds: 1,
        }

        for (let timeType in timeTypes) {
            let floored = Math.floor(val)
            if (floored !== 0 ) {
                if (previousValue !== 0 )
                    res[timeType] = floored % previousValue
                else {
                    res[timeType] = floored
                    floored *= timeTypes[timeType]
                }
            }
            previousValue = floored

            val *= timeTypes[timeType];
        }
        return res;
    }
}