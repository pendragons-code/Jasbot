function degrees(a){
	let radian = a * (Math.PI/180)
	let gradian = a * (200/180)
	let Milliradian = a * (1000 * Math.PI/180) // Yes i could just divide radian to get milliradian out but lmao
	let MinuteOfArc = a * 60
	let SecondOfArc = a * 3600
	return `${radian.toPrecision(5)} rad\n ${gradian.toPrecision(5)} grad\n ${Milliradian.toPrecision(5)} mrad\n ${MinuteOfArc.toPrecision(5)} Minute Of Arc\n ${SecondOfArc.toPrecision(5)} Second Of Arc`
}

function radian(a){
	let degrees = a * (180/Math.PI)
	let gradian = a * (200/Math.PI)
	let Milliradian = a * 1000
	let MinuteOfArc = a * (60 * 180)/Math.PI
	let SecondOfArc = a * (3600 * 180)/Math.PI
	return `${degrees.toPrecision(5)} deg\n${gradian.toPrecision(5)} grad\n${Milliradian.toPrecision(5)} mrad\n${MinuteOfArc.toPrecision(5)} Minute Of Arc\n${SecondOfArc.toPrecision(5)} Second Of Arc`
}
//.toPrecision(5)
function gradian(a){
	let degrees = a * 180/200
	let radian = a * Math.PI/200
	let Milliradian = a * Math.PI/200 * 1000
	let MinuteOfArc = a * 54
	let SecondOfArc = a * 3240
	return `${degrees.toPrecision(5)} deg\n${radian.toPrecision(5)} rad\n${Milliradian.toPrecision(5)} mrad\n${MinuteOfArc.toPrecision(5)} Minute Of Arc\n${SecondOfArc.toPrecision(5)} Second Of Arc`
}

function milliradian(a){
	let degrees = a * 180/(1000 * Math.PI)
	let radian = a / 1000
	let gradian = a * 200/(1000 * Math.PI)
	let MinuteOfArc = a * (60 * 180)/(1000 * Math.PI)
	let SecondOfArc = a * (3600 * 180)/(1000 * Math.PI)
	return `${degrees.toPrecision(5)} deg\n${radian.toPrecision(5)} rad\n${gradian.toPrecision(5)} grad\n${MinuteOfArc.toPrecision(5)} Minute Of Arc\n${SecondOfArc.toPrecision(5)} SecondOfArc`
}

function MinuteOfArc(a){
	let degree = a / 60
	let radian = (a * Math.PI)/(60 * 180)
	let gradian = a / 54
	let Milliradian = (a * 1000 * Math.PI)/(60 * 180)
	let SecondOfArc = a * 60
	return `${degree.toPrecision(5)} deg\n${radian.toPrecision(5)} rad\n${gradian.toPrecision(5)} grad\n${Milliradian.toPrecision(5)} mrad\n${SecondOfArc.toPrecision(5)} Second Of Arc`
}

function SecondOfArc(a){
	let degree = a / 3600
	let radian = (a * Math.PI)/(180 * 3600)
	let gradian = a / 3240
	let Milliradian = (a * 1000 * Math.PI)/(180 * 3600)
	let MinuteOfArc = a / 60
	return `${degree.toPrecision(5)} deg\n${radian.toPrecision(5)} rad\n${gradian.toPrecision(5)} grad\n${Milliradian.toPrecision(5)} mrad\n${MinuteOfArc.toPrecision(5)} Minute Of Arc`
}



module.exports = { degrees, radian, gradian, milliradian, MinuteOfArc, SecondOfArc }
