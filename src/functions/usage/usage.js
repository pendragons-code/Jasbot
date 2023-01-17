async function ProjectUsage(ToEmbedCpuUsage){
	const  rawMemoryUsage = process.memoryUsage.rss() / 1024 /1024
	const estimatedMemoryUsage = Math.round(rawMemoryUsage * 100) / 100
	let description = `\nCPU usage: ${Math.round(ToEmbedCpuUsage * 100) /100 }%\nMemory: ${estimatedMemoryUsage}`
	return description
}
