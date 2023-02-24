function minuteOfArc(queriedAmt) {
	let degrees = queriedAmt / 60
	let radian = (queriedAmt * Math.PI)/(180 * 3600)
	let gradian = queriedAmt /3240
	let milliRadian = radian * 1000
	let secondOfArc = queriedAmt * 60
	return `${degrees} deg\n${radian} rad\n${gradian} grad\n${milliRadian} mrad\n${secondOfArc} second of arc`
}
module.exports = { minuteOfArc }
