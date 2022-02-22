import useSWRImmutable from "swr/immutable"

export default function useCollectionImmutable<T>(key: string) {
	return useSWRImmutable<Array<T>>(key, fetchResources).data
}

export async function fetchResources<T>(resource: string) {
	const response = await fetch(`/api/${resource}`, { method: "GET" })
	return (await response.json()) as Array<T>
}
