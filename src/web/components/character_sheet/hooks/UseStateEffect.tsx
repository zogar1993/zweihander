import { useEffect, useState } from "react"

export default function useStateEffect<T extends ValidT>(
	getValue: () => Promise<T> | T,
	dependencies: any[]
): T | undefined {
	const [value, setValue] = useState<T>()
	useEffect(() => {
		const result = getValue()
		if (isPromise(result)) (async () => setValue(await result))()
		else setValue(result)
	}, dependencies)
	return value
}

type ValidT = object | undefined

function isPromise<T extends ValidT>(
	result: Promise<T> | T
): result is Promise<T> {
	if (result === undefined) return false
	return "then" in (result as object)
}