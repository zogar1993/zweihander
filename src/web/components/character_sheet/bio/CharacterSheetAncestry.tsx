import {
	ActionType,
	useCharacterSheetDispatcher,
	useCharacterSheetState
} from "@web/components/character_sheet/CharacterSheetContext"
import useIsCharacterSheetOwner from "@web/components/character_sheet/hooks/UseIsCharacterSheetOwner"
import theme from "@web/theme/theme"
import { Field } from "misevi"
import React from "react"
import styled from "styled-components"

export default function CharacterSheetAncestry() {
	const { character: {ancestry, ancestry_trait} } = useCharacterSheetState()
	const dispatch = useCharacterSheetDispatcher()
	const isOwner = useIsCharacterSheetOwner()

	return (
		<Container>
			<Field
				type="combobox"
				label="Ancestry"
				value={ancestry.code}
				options={ancestry.options}
				onChange={value =>
					dispatch({ type: ActionType.SetAncestry, payload: value })
				}
				disabled={!isOwner}
			/>
			<Field
				type="combobox"
				label="Ancestry Trait"
				value={ancestry_trait.code}
				options={ancestry_trait.options}
				onChange={value =>
					dispatch({ type: ActionType.SetAncestryTrait, payload: value })
				}
				disabled={ancestry_trait.disabled || !isOwner}
			/>
		</Container>
	)
}

const Container = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr;
	gap: ${theme.spacing.separation};

	@media (max-width: 768px) {
		grid-template-columns: 1fr;
	}
`
