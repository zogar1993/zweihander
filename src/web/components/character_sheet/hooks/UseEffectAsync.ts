import { useEffect } from "react"

export default function useEffectAsync(
	doAction: () => Promise<void>,
	dependencies: any[]
) {
	return useEffect(() => {
		doAction()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, dependencies)
}
