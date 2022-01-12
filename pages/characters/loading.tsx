import CharacterSheetScreen, {
	CharacterSheetScreenProps
} from "@web/components/character_sheet/CharacterSheetScreen"
import { useRouter } from "next/router"
import React, { useEffect } from "react"

export default function CharacterScreen(props: CharacterSheetScreenProps) {
	const router = useRouter()
	const id = router.query.character

	useEffect(() => {
		router.push(`/characters/${id}`)
	}, [id])

	return <CharacterSheetScreen {...props} />
}
