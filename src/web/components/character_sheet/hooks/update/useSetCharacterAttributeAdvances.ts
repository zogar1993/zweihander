import { AttributeCode } from "@core/domain/attribute/AttributeCode"
import { ActionType, useCharacterSheetDispatcher } from "@web/components/character_sheet/CharacterSheetContext"

export default function useSetCharacterAttributeAdvances() {
	const dispatch = useCharacterSheetDispatcher()

	return ({ attribute, value }: { attribute: AttributeCode, value: number }) => {
		dispatch({
			type: ActionType.UpdateCharacter, payload: [
				{ action: "set_value", property: `attributes.${attribute}.advances`, value: value }
			]
		})
	}
}