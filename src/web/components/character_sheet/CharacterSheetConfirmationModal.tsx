import { useCharacterSheetState } from "@web/components/character_sheet/CharacterSheetContext"
import ConfirmationModal from "@web/components/modal/ConfirmationModal"
import React from "react"

export default function CharacterSheetConfirmationModal() {
	const { modals } = useCharacterSheetState()
	const confirmation = modals.confirmation || NULL_CONFIRMATION_OBJECT
	return (
		<ConfirmationModal
			active={modals.confirmation !== null}
			{...confirmation}
		/>
	)
}

const NULL_CONFIRMATION_OBJECT = {
	onCancel: () => {},
	onConfirm: () => {},
	text: "",
	confirmationText: ""
}
