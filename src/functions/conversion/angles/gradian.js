function gradian(queriedAmt) {
	let degrees = queriedAmt * 180/200
	let radian = a * Math.PI/200
	let milliRadian = radian * 1000
	let minuteOfArc = queriedAmt * 54
	let secondOfArc = queriedAmt * 3240
	return `${degrees} deg\n${radian} rad\n${gradian} grad\n${milliRadian} mrad\n${minuteOfArc} minute of arc\n${secondOfArc} second of arc`
}
module.exoprts = { gradian }
