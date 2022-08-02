import {
	ActionType,
	useCharacterSheetDispatcher,
	useCharacterSheetState
} from "@web/components/character_sheet/CharacterSheetContext"
import useIsCharacterSheetOwner from "@web/components/character_sheet/hooks/useIsCharacterSheetOwner"
import RemovableItems from "@web/components/RemovableItems"
import theme from "@web/theme/theme"
import { Field } from "misevi"
import React from "react"
import styled from "styled-components"

export default function CharacterSheetTalents() {
	const { character } = useCharacterSheetState()
	const dispatch = useCharacterSheetDispatcher()
	const isOwner = useIsCharacterSheetOwner()

	return (
		<Container>
			{isOwner && (
				<Field
					label="Talent"
					type="combobox"
					value={character.talent.code}
					options={character.talent.options}
					onChange={value =>
						dispatch({
							type: ActionType.AddTalent,
							payload: value as string
						})
					}
					unclearable
				/>
			)}
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
