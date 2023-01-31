function minuteOfArc(queriedAmt) {
	let degrees = queriedAmt / 60
	let radian = (queriedAmt * Math.PI)/(180 * 3600)
	let gradian = queriedAmt /3240
	let milliRadian = (queriedAmt * 1000 * Math.PI)/(60 * 180)
	let secondOfArc = queriedAmt * 60
}
module.exports = { minuteOfArc }
