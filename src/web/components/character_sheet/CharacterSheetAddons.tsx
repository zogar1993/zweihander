import { ActionType, useCharacterSheetDispatcher } from "@web/components/character_sheet/CharacterSheetContext"
import useCtrlZ from "@web/components/character_sheet/hooks/UseCtrlZ"

export function CharacterSheetAddons() {
	const dispatch = useCharacterSheetDispatcher()
	useCtrlZ(() => dispatch({ type: ActionType.UndoLastAction }))

	return null
}
