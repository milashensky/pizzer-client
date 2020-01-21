import moment from 'moment'

window.moment = moment

export function buildDate (ts) {
    return moment.unix(ts).calendar().split(' at ')[0]
}
export function buildNiceTime (ts) {
    return moment.unix(ts).format('LT')
}
export function buildNiceDateTime (ts) {
    return buildDate(ts) + ' ' + buildNiceTime(ts)
}


export { moment }
