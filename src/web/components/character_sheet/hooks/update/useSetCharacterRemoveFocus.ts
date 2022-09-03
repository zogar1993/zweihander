import { SkillCode } from "@core/domain/skill/SkillCode"
import {
	ActionType,
	useCharacterSheetDispatcher,
	useCharacterSheetState
} from "@web/components/character_sheet/CharacterSheetContext"

export default function useSetCharacterRemoveFocus() {
	const dispatch = useCharacterSheetDispatcher()
	const { _character } = useCharacterSheetState()

	return ({ skill, focus }: { skill: SkillCode, focus: string }) => {
		const list = _character.focuses[skill]!
		dispatch({
			type: ActionType.UpdateCharacter, payload: [
				list.length === 1 ?
					{ action: "delete_property", property: `focuses.${skill}` } :
					{ action: "remove_from_array", property: `focuses.${skill}`, value: focus }
			]
		})
	}
}
