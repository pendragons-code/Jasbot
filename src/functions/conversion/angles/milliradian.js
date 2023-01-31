function milliRadian(queriedAmt) {
	let degrees = queriedAmt * 180/(1000 * Math.PI)
	let radian = queriedAmt / 1000
	let gradian = queriedAmt * 200/(1000 * Math.PI)
	let minuteOfArc = queriedAmt * (60 * 180)/(1000 * Math.PI)
	let secondOfArc = queriedAmt * (3600 * 180)/(1000 * Math.PI)
	return `${degrees} deg\n${radian} rad\n${gradian} grad\n${minuteOfArc} minute of arc\n${secondOfArc} second of arc`
}
module.exports = { milliRadian }
