import { SchoolCode } from "@core/domain/character_sheet/CharacterSheet"
import {
	ActionType,
	useCharacterSheetDispatcher,
	useCharacterSheetState
} from "@web/components/character_sheet/CharacterSheetContext"

export default function useSetCharacterRemoveSpell() {
	const dispatch = useCharacterSheetDispatcher()
	const { _character } = useCharacterSheetState()

	return ({ school, spell }: { school: SchoolCode, spell: string }) => {
		const list = _character.spells[school]!
		dispatch({
			type: ActionType.UpdateCharacter, payload: [
				list.length === 1 ?
					{ action: "delete_property", property: `spells.${school}`, value: spell } :
					{ action: "remove_from_array", property: `spells.${school}`, value: spell }
			]
		})
	}
}
