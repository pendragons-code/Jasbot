// Writing it as a function so that when we excecute the same thing in slash we should be fine.
async function degrees(queriedAmt) {
	let radian = queriedAmt * (Math.PI/180)
	let gradian = queriedAmt * (200/180)
	let milliRadian = queriedAmt * 1000
	let minuteOfArc = queriedAmt * 60
	let secondOfArc = queriedAmt * 3600
	return `${radian} rad\n${gradian} grad\n${milliRadian} mrad\n${minuteOfArc} minute of arc\n${secondOfArc} second of arc`
}
module.exports = { degrees }
