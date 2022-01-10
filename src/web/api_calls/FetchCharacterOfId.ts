import { SanitizedCharacterSheet } from "@core/domain/character_sheet/sanitization/SanitizeCharacterSheet"

export default async function fetchCharacterOfId(id: string) {
	const result = await fetch(`/api/character/${id}`, {
		method: "GET"
	})
	return (await result.json()) as SanitizedCharacterSheet
}