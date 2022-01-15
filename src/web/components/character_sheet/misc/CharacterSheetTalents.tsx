import {
	ActionType,
	useCharacterSheetDispatcher,
	useCharacterSheetState
} from "@web/components/character_sheet/CharacterSheetContext"
import RemovableItems from "@web/components/RemovableItems"
import theme from "@web/theme/theme"
import { Field } from "misevi"
import React from "react"
import styled from "styled-components"

export default function CharacterSheetTalents() {
	const { character, talents } = useCharacterSheetState()
	const dispatch = useCharacterSheetDispatcher()
	return (
		<Container>
			<Field
				label="Talent"
				type="combobox"
				options={talents}
				onChange={value =>
					dispatch({
						type: ActionType.AddTalent,
						payload: value as string
					})
				}
				value={null}
				unclearable
			/>
			<RemovableItems
				items={character.talents}
				removeItem={({ item }) =>
					dispatch({
						type: ActionType.RemoveTalent,
						payload: item
					})
				}
			/>
		</Container>
	)
}

const Container = styled.div`
	display: flex;
	flex-direction: column;
	justify-items: stretch;
	gap: ${theme.spacing.separation};
`
