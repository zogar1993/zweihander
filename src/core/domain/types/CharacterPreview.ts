import { SanitizedCharacterSheet } from "@core/domain/character_sheet/sanitization/SanitizeCharacterSheet"

export type CharacterPreview = Pick<
	SanitizedCharacterSheet,
	| "id"
	| "name"
	| "avatar"
	| "ancestry"
	| "profession1"
	| "profession2"
	| "profession3"
	| "created_by"
> & { visibility: SanitizedCharacterSheet["settings"]["visibility"] }
