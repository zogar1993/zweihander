import { useEffect } from "react"

export default function useCtrlZ(action: () => void) {
	useEffect(() => {
		const handler = (event: any) => {
			if (event.ctrlKey && event.key === "z") {
				action()
				event.preventDefault()
			}
		}
		document.addEventListener("keydown", handler)
		return () => document.removeEventListener("keydown", handler)
	}, [])
}