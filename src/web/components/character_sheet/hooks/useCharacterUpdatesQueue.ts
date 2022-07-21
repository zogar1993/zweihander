import updateCharacterOfId from "@web/api_calls/UpdateCharacterOfId"
import {
	ActionType,
	useCharacterSheetDispatcher,
	useCharacterSheetState
} from "@web/components/character_sheet/CharacterSheetContext"
import useEffectAsync from "@web/components/character_sheet/hooks/UseEffectAsync"

export default function useCharacterUpdatesQueue() {
	const { character, nextUpdate, updatedAt } = useCharacterSheetState()
	const dispatch = useCharacterSheetDispatcher()

	useEffectAsync(async () => {
		if (nextUpdate === null) return
		
		const newUpdatedAt = await updateCharacterOfId(
			character.id,
			updatedAt,
			nextUpdate
		)

		dispatch({
			type: ActionType.CompleteAction,
			payload: { updatedAt: newUpdatedAt, completed: nextUpdate }
		})
	}, [dispatch, character.id, updatedAt, nextUpdate])
}
