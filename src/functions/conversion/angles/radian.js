function radian(queriedAmt) {
	let degrees = queriedAmt * (180/Math.PI)
	let gradian = queriedAmt * (200/Math.PI)
	let milliRadian = queriedAmt * 1000
	let minuteOfArc = queriedAmt * (60 * 180)/Math.PI
	let secondOfArc = queriedAmt * (3600 * 180)/Math.PI
	return `${degrees} deg\n${gradian} grad\n${milliRadian} mrad\n${minuteOfArc} minute of arc\n${secondOfArc} second of arc`
}
module.exports = { radian }
