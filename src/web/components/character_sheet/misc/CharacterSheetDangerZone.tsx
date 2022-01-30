import deleteCharacterOfId from "@web/api_calls/DeleteCharacterOfId"
import {
	ActionType,
	useCharacterSheetDispatcher,
	useCharacterSheetState
} from "@web/components/character_sheet/CharacterSheetContext"
import Button from "@web/components/general/Button"
import { useRouter } from "next/router"

export default function CharacterSheetDangerZone() {
	const router = useRouter()
	const { character } = useCharacterSheetState()
	const dispatch = useCharacterSheetDispatcher()

	const onClick = () => {
		const deleteCharacter = async () => {
			await deleteCharacterOfId(character.id)
			await router.push("/characters")
		}
		const confirmation = {
			text: "Are you sure you want to delete this character?",
			confirmationText: "Yes, Delete it",
			onConfirm: deleteCharacter,
			onCancel: () =>
				dispatch({ type: ActionType.SetConfirmationModal, payload: null })
		}
		dispatch({ type: ActionType.SetConfirmationModal, payload: confirmation })
	}

	return <Button onClick={onClick}>Delete</Button>
}
