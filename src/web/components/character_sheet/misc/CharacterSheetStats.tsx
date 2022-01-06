import { useCharacterSheetState } from "@web/components/character_sheet/CharacterSheetContext"
import Grid from "@web/components/general/Grid"
import React from "react"
import styled from "styled-components"

export default function CharacterSheetStats() {
	const { character } = useCharacterSheetState()
	return (
		<Grid columns={3}>
			<BoxedNumber name="Enc. Limit" value={character.encumbrance_limit} />
			<BoxedNumber name="Initiative" value={character.initiative} />
			<BoxedNumber name="Movement" value={character.movement} />
			<BoxedNumber name="Experience" value={character.spent_experience} />
			<BoxedNumber name="Max. Focuses" value={character.maximum_focuses} />
			<BoxedNumber name="Max. Langs." value={character.maximum_languages} />
		</Grid>
	)
}

const BoxedNumber = ({ name, value }: { name: string; value: number }) => {
	return (
		<Container>
			<span>{name}</span>
			<span>{value}</span>
		</Container>
	)
}

const Container = styled.div`
	display: flex;
	flex-direction: column;
`