import {
	ActionType,
	useCharacterSheetDispatcher,
	useCharacterSheetState
} from "@web/components/character_sheet/CharacterSheetContext"
import theme from "@web/theme/theme"
import { Field } from "misevi"
import React from "react"
import styled from "styled-components"

export default function CharacterSheetProfessions() {
	const { character, professions, archetypes, tier1Professions } =
		useCharacterSheetState()

	const dispatch = useCharacterSheetDispatcher()

	return (
		<Container>
			<Field
				type="combobox"
				label="Archetype"
				options={archetypes}
				value={character.archetype}
				disabled={character.profession1 !== null}
				onChange={value =>
					dispatch({ type: ActionType.SetArchetype, payload: value })
				}
			/>
			<Field
				type="combobox"
				label="Profession 1"
				options={tier1Professions}
				value={character.profession1}
				disabled={character.profession2 !== null}
				onChange={value =>
					dispatch({ type: ActionType.SetProfession1, payload: value })
				}
			/>
			<Field
				type="combobox"
				label="Profession 2"
				options={professions}
				value={character.profession2}
				disabled={
					character.profession1 === null || character.profession3 !== null
				}
				onChange={value =>
					dispatch({ type: ActionType.SetProfession2, payload: value })
				}
			/>
			<Field
				type="combobox"
				label="Profession 3"
				options={professions}
				value={character.profession3}
				disabled={
					character.profession2 === null || character.profession3 !== null
				}
				onChange={value =>
					dispatch({ type: ActionType.SetProfession3, payload: value })
				}
			/>
		</Container>
	)
}

const Container = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr;
	gap: ${theme.spacing.separation};
`
