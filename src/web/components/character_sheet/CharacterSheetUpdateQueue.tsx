import updateCharacterOfId from "@web/api_calls/UpdateCharacterOfId"
import {
	ActionType,
	useCharacterSheetDispatcher,
	useCharacterSheetState
} from "@web/components/character_sheet/CharacterSheetContext"
import useEffectAsync from "@web/components/character_sheet/hooks/UseEffectAsync"
import { useState } from "react"
import styled from "styled-components"

export default function CharacterSheetUpdateQueue() {
	const { character, nextUpdate, updatedAt, errors } = useCharacterSheetState()
	const [status, setStatus] = useState(SavingStatus.Idle)
	const dispatch = useCharacterSheetDispatcher()

	useEffectAsync(async () => {
		if (nextUpdate === null) {
			if (errors.length > 0) return
			setStatus(SavingStatus.Idle)
			return
		} else {
			updateCharacterOfId({ id: character.id, lastModified: updatedAt, changes: nextUpdate })
				.then(newUpdatedAt => {
					setStatus(SavingStatus.Saving)
					dispatch({ type: ActionType.CompleteAction, payload: { updatedAt: newUpdatedAt, completed: nextUpdate } })
				})
				.catch(e => {
					setStatus(SavingStatus.Error)
					dispatch({ type: ActionType.ReportUpdateError, payload: e })
				})
		}


	}, [dispatch, character.id, errors.length, updatedAt, nextUpdate])

	return <Toast status={status}/>
}

const Toast = styled.div<{status: SavingStatus}>`
	width: 40px;
	height: 40px;
	${({status}) => status === SavingStatus.Idle && "display: none"};
	${({status}) => status === SavingStatus.Saving && "background-color: yellow"};
	${({status}) => status === SavingStatus.Error && "background-color: red"};
	position: absolute;
	right: 0;
	top: 0;
`

enum SavingStatus {
	Idle,
	Saving,
	Error
}
