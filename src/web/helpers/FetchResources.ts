export default async function fetchResources<T>(resource: string) {
	const response = await fetch(`/api/${resource}`, { method: "POST" })
	return (await response.json()) as Array<T>
}
