function secondOfArc(queriedAmt) {
	let degrees = queriedAmt / 3600
	let radian = (queriedAmt * Math.PI)/(180 * 3600)
	let gradian = queriedAmt / 3240
	let milliRadian = radian * 1000
	let minuteOfArc = queriedAmt / 60
	return `${degrees} deg\n${radian} rad\n${gradian} grad\n${milliRadian} mrad\n${minuteOfArc} minute of arc`
}
module.exports = { secondOfArc }
