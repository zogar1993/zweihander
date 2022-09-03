import { SkillCode } from "@core/domain/skill/SkillCode"
import {
	ActionType,
	useCharacterSheetDispatcher,
	useCharacterSheetState
} from "@web/components/character_sheet/CharacterSheetContext"

export default function useSetCharacterAddFocus() {
	const dispatch = useCharacterSheetDispatcher()
	const { _character } = useCharacterSheetState()

	return ({ skill, focus }: { skill: SkillCode, focus: string }) => {
		const list = _character.focuses[skill]!
		dispatch({
			type: ActionType.UpdateCharacter, payload: [
				list ?
					{ action: "add_to_array", property: `focuses.${skill}`, value: focus } :
					{ action: "set_value", property: `focuses.${skill}`, value: [focus] }
			]
		})
	}
}
