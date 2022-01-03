import { getByCode } from "@core/domain/general/GetByCode"
import { Profession } from "@core/domain/Profession"
import {
	ActionType,
	useCharacterSheetDispatcher,
	useCharacterSheetState
} from "@web/components/character_sheet/CharacterSheetContext"
import useEffectAsync from "@web/components/character_sheet/hooks/UseStateAsync"
import theme from "@web/theme/theme"
import { Field } from "misevi"
import React, { useState } from "react"
import styled from "styled-components"

export default function CharacterSheetProfessions() {
	const { character, professions, archetypes } = useCharacterSheetState()

	const dispatch = useCharacterSheetDispatcher()
	const [basics, setBasics] = useState<Array<Profession>>([])

	//TODO make this cleaner
	useEffectAsync(async () => {
		if (character.archetype === undefined) return
		if (character.archetype === null) {
			const basics = professions.filter(profession =>
				archetypes.some(archetype =>
					archetype.professions["Main Gauche"].some(
						prof => prof.profession === profession.code
					)
				)
			)
			setBasics(basics)
		} else {
			const names = getByCode(character.archetype, archetypes).professions[
				"Main Gauche"
			]
			const basics = names.map(x => ({
				...x,
				...getByCode(x.profession, professions)
			}))
			setBasics(basics)
		}
	}, [character.archetype, professions, archetypes])

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
				options={basics}
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