import useSWR from "swr"

export default function useCollection<T>(key: string) {
	return useSWR<Array<T>>(key, fetchResources).data
}

export async function fetchResources<T>(resource: string) {
	const response = await fetch(`/api/${resource}`, { method: "GET" })
	return (await response.json()) as Array<T>
}
