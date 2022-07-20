import {
	ActionType,
	useCharacterSheetDispatcher,
	useCharacterSheetState
} from "@web/components/character_sheet/CharacterSheetContext"
import useIsCharacterSheetOwner from "@web/components/character_sheet/hooks/useIsCharacterSheetOwner"
import theme from "@web/theme/theme"
import { Field } from "misevi"
import React from "react"
import styled from "styled-components"

export default function CharacterSheetAncestry() {
	const { character, ancestries, ancestryTraits } = useCharacterSheetState()
	const dispatch = useCharacterSheetDispatcher()
	const isOwner = useIsCharacterSheetOwner()

	return (
		<Container>
			<Field
				type="combobox"
				label="Ancestry"
				options={ancestries}
				value={character.ancestry}
				onChange={value =>
					dispatch({ type: ActionType.SetAncestry, payload: value })
				}
				disabled={!isOwner}
			/>
			<Field
				type="combobox"
				label="Ancestry Trait"
				options={ancestryTraits}
				value={character.ancestry_trait}
				onChange={value =>
					dispatch({ type: ActionType.SetAncestryTrait, payload: value })
				}
				disabled={character.ancestry === null || !isOwner}
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
