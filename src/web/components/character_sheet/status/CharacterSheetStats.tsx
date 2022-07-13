import { useCharacterSheetState } from "@web/components/character_sheet/CharacterSheetContext"
import Grid from "@web/components/general/Grid"
import theme from "@web/theme/theme"
import React from "react"
import styled from "styled-components"

export default function CharacterSheetStats() {
	const { character } = useCharacterSheetState()
	return (
		<Grid columns={3}>
			<BoxedNumber name="Initiative" value={character.initiative} />
			<BoxedNumber name="Movement" value={character.movement} />
			<BoxedNumber name="Max. Focuses" value={character.maximum_focuses} />
			<BoxedNumber name="Max. Langs." value={character.maximum_languages} />
			<BoxedNumber name="Enc. Limit" value={character.encumbrance_limit} />
			<BoxedNumber name="Experience" value={character.spent_experience} />
		</Grid>
	)
}

const BoxedNumber = ({ name, value }: { name: string; value: number }) => {
	return (
		<Container>
			<BoxText>{name}</BoxText>
			<BoxNumber>{value}</BoxNumber>
		</Container>
	)
}

const Container = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	height: 56px;
	border: solid ${theme.colors.border} ${theme.spacing.separation};
	padding: ${theme.spacing.padding} 0;
	gap: ${theme.spacing.separation};
	border-radius: ${theme.borders.radius};
`

const BoxText = styled.span`
	font-size: 12px;
`

const BoxNumber = styled.span`
	font-family: ${theme.fonts.handwritten};
`
