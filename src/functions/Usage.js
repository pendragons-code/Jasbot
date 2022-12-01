async function ProjectUsage(a){
	const memUsed = `Memory Used: ${Math.round((process.memoryUsage.rss() / 1024 / 1024 ) * 100) / 100} MB`
	const cpu = `CPU Usage: ${Math.round(a * 100) / 100} %`
	let details = `${memUsed}\n${cpu}`
	return details
}
