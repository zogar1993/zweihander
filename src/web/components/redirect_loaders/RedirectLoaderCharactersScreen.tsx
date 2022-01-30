import CharactersScreen from "@web/components/character_sheet/CharactersScreen"
import { useRouter } from "next/router"
import React, { useEffect, useState } from "react"

export default function RedirectLoaderCharactersScreen({
	children
}: {
	children: JSX.Element
}) {
	const [isRedirecting, setIsRedirecting] = useState(false)
	const router = useRouter()

	useEffect(() => {
		const handleRouteChange = (url: string) => {
			if (url.match(/^\/characters$/)) setIsRedirecting(true)
		}
		const completeRedirect = () => setIsRedirecting(false)
		router.events.on("routeChangeStart", handleRouteChange)
		router.events.on("routeChangeComplete", completeRedirect)
		return () => {
			router.events.off("routeChangeStart", handleRouteChange)
			router.events.off("routeChangeComplete", completeRedirect)
		}
	}, [])

	if (isRedirecting) return <CharactersScreen {...({} as any)} />

	return children
}
