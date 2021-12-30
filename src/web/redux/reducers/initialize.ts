import { Ancestry } from "@core/domain/Ancestry"
import { calculateCharacterSheet } from "@core/domain/character_sheet/CharacterSheet"
import { SanitizedCharacterSheet } from "@core/domain/character_sheet/sanitization/SanitizeCharacterSheet"
import { MagicSchool } from "@core/domain/MagicSchool"
import { Profession } from "@core/domain/Profession"
import { Talent } from "@core/domain/Talent"

const initialState = {}

function reducer(
	state = initialState,
	action: {
		type: string
		payload: {
			character: SanitizedCharacterSheet
			talents: Array<Talent>
			professions: Array<Profession>
			ancestries: Array<Ancestry>
			schools: Array<MagicSchool>
		}
	}
) {
	switch (action.type) {
		case "initialize": {
			const { character, talents, professions, ancestries } = action.payload
			return {
				...state,
				rawCharacter: character,
				character: calculateCharacterSheet(action.payload),
				talents,
				professions,
				ancestries
			}
		}
		default:
			return state
	}
}

export default reducer
