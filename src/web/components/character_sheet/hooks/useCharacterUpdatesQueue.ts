import updateCharacterOfId from "@web/api_calls/UpdateCharacterOfId"
import {
	ActionType,
	CharacterSheetAction,
	CharacterSheetState
} from "@web/components/character_sheet/CharacterSheetContext"
import useEffectAsync from "@web/components/character_sheet/hooks/UseEffectAsync"
import { Dispatch } from "react"

export default function useCharacterUpdatesQueue({
	state,
	dispatch
}: {
	state: CharacterSheetState
	dispatch: Dispatch<CharacterSheetAction>
}) {
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
