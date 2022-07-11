import { SanitizedCharacterSheet } from "@core/domain/character_sheet/sanitization/SanitizeCharacterSheet"
import useEffectAsync from "@web/components/character_sheet/hooks/UseEffectAsync"
import { useState } from "react"

export default function useCharacterSheet(id: string) {
	const [character, setCharacter] = useState<SanitizedCharacterSheet>()

	useEffectAsync(async () => {
		const character = await fetchCharacter(id)
		setCharacter(character)
	}, [id])

	return character
}

async function fetchCharacter<T>(id: string) {
	const response = await fetch(`/api/characters/${id}`, { method: "GET" })
	return (await response.json()) as SanitizedCharacterSheet
}
