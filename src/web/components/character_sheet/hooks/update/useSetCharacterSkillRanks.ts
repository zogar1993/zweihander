import { SkillCode } from "@core/domain/skill/SkillCode"
import { ActionType, useCharacterSheetDispatcher } from "@web/components/character_sheet/CharacterSheetContext"

export default function useSetCharacterSkillRanks() {
	const dispatch = useCharacterSheetDispatcher()

	return ({ skill, value }: { skill: SkillCode, value: number }) => {
		dispatch({
			type: ActionType.UpdateCharacter, payload: [
				{ action: "set_value", property: `skills.${skill}.ranks`, value: value }
			]
		})
	}
}
