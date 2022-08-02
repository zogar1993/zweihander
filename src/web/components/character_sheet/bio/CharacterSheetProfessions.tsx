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

export default function CharacterSheetProfessions() {
	const { character: { archetype, profession1, profession2, profession3 } } =
		useCharacterSheetState()
	const dispatch = useCharacterSheetDispatcher()
	const isOwner = useIsCharacterSheetOwner()

	return (
		<Container>
			<Field
				type="combobox"
				label="Archetype"
				value={archetype.code}
				options={archetype.options}
				disabled={archetype.disabled || !isOwner}
				onChange={value => dispatch({ type: ActionType.SetArchetype, payload: value })}
			/>
			<Field
				type="combobox"
				label="Profession 1"
				value={profession1.code}
				options={profession1.options}
				disabled={profession1.disabled || !isOwner}
				onChange={value => dispatch({ type: ActionType.SetProfession1, payload: value })}
			/>
			<Field
				type="combobox"
				label="Profession 2"
				value={profession2.code}
				options={profession2.options}
				disabled={profession2.disabled || !isOwner}
				onChange={value => dispatch({ type: ActionType.SetProfession2, payload: value })}
			/>
			<Field
				type="combobox"
				label="Profession 3"
				value={profession3.code}
				options={profession3.options}
				disabled={profession3.disabled || !isOwner}
				onChange={value => dispatch({ type: ActionType.SetProfession3, payload: value })}
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
