import {
	ActionType,
	useCharacterSheetDispatcher
} from "@web/components/character_sheet/CharacterSheetContext"
import useCharacterUpdatesQueue from "@web/components/character_sheet/hooks/UseCharacterUpdatesQueue"
import useCtrlZ from "@web/components/character_sheet/hooks/UseCtrlZ"

export function CharacterSheetAddons() {
	const dispatch = useCharacterSheetDispatcher()
	useCharacterUpdatesQueue()
	useCtrlZ(() => dispatch({ type: ActionType.UndoLastAction }))

	return null
}
