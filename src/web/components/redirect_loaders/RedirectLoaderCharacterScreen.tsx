import CharacterSheetScreen from "@web/components/character_sheet/CharacterSheetScreen"
import { useRouter } from "next/router"
import React, { useEffect, useState } from "react"

export default function RedirectLoaderCharacterScreen({
	children
}: {
	children: JSX.Element
}) {
	const [isRedirecting, setIsRedirecting] = useState(false)
	const router = useRouter()

	useEffect(() => {
		const handleRouteChange = (url: string) => {
			if (url.match(/^\/characters\/[A-Fa-f0-9]+$/)) setIsRedirecting(true)
		}
		router.events.on("routeChangeStart", handleRouteChange)
		return () => router.events.off("routeChangeStart", handleRouteChange)
	}, [])

	if (isRedirecting) return <CharacterSheetScreen {...({} as any)} />

	return children
}

//TODO P3 move knowledge to Contentful
