import { getByCode } from "@core/domain/general/GetByCode"
import {
	ActionType,
	useCharacterSheetDispatcher,
	useCharacterSheetState
} from "@web/components/character_sheet/CharacterSheetContext"
import useStateEffect from "@web/components/character_sheet/hooks/UseStateEffect"
import theme from "@web/theme/theme"
import { Field } from "misevi"
import React from "react"
import styled from "styled-components"

export default function CharacterSheetAncestry() {
	const { character, ancestries } = useCharacterSheetState()
	const dispatch = useCharacterSheetDispatcher()

	const ancestryTraits = useStateEffect(async () => {
	//TODO move to dispatch to remove the error flickering
		if (character.ancestry === undefined) return
		if (character.ancestry === null) return []
		return getByCode(character.ancestry, ancestries).traits
	}, [character.ancestry, ancestries])

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
			/>
			<Field
				type="combobox"
				label="Ancestry Trait"
				options={ancestryTraits}
				value={character.ancestry_trait}
				onChange={value =>
					dispatch({ type: ActionType.SetAncestryTrait, payload: value })
				}
				disabled={character.ancestry === null}
			/>
		</Container>
	)
}

const Container = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr;
	gap: ${theme.spacing.separation};
`