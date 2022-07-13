import updateCharacterOfId from "@web/api_calls/UpdateCharacterOfId"
import {
	ActionType,
	useCharacterSheetDispatcher,
	useCharacterSheetState
} from "@web/components/character_sheet/CharacterSheetContext"
import useEffectAsync from "@web/components/character_sheet/hooks/UseEffectAsync"

export default function useCharacterUpdatesQueue() {
	const state = useCharacterSheetState()
	const dispatch = useCharacterSheetDispatcher()
	
	useEffectAsync(async () => {
		if (state.nextUpdate === null) return
		const updatedAt = await updateCharacterOfId(
			state.character.id,
			state.character.updated_at,
			state.nextUpdate
		)
		dispatch({ type: ActionType.CompleteAction, payload: { updatedAt } })
	}, [state.nextUpdate, dispatch])
}
