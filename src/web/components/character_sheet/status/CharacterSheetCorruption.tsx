import { useCharacterSheetState } from "@web/components/character_sheet/CharacterSheetContext"
import useSetCharacterChaosRanks from "@web/components/character_sheet/hooks/update/useSetCharacterChaosRanks"
import useSetCharacterCorruption from "@web/components/character_sheet/hooks/update/useSetCharacterCorruption"
import useSetCharacterOrderRanks from "@web/components/character_sheet/hooks/update/useSetCharacterOrderRanks"
import useIsCharacterSheetOwner from "@web/components/character_sheet/hooks/UseIsCharacterSheetOwner"
import theme from "@web/theme/theme"
import { CircularNumberInput, Dots } from "misevi"
import React from "react"
import styled from "styled-components"

export default function CharacterSheetCorruption() {
	const { character } = useCharacterSheetState()
	const isOwner = useIsCharacterSheetOwner()
	const setCorruption = useSetCharacterCorruption()
	const setOrderRanks = useSetCharacterOrderRanks()
	const setChaosRanks = useSetCharacterChaosRanks()

	return (
		<Container>
			<CorruptionContainer>
				<Label>Corruption</Label>
				<CircularNumberInput
					min={0}
					max={9}
					value={character.corruption}
					onBlur={setCorruption}
					aria-label="Corruption"
					disabled={!isOwner}
				/>
			</CorruptionContainer>
			<RanksContainer>
				<Label>Order Ranks</Label>
				<Dots
					value={character.order_ranks}
					total={9}
					onChange={setOrderRanks}
					aria-label="Order Ranks"
					disabled={!isOwner}
				/>
				<Label>Chaos Ranks</Label>
				<Dots
					value={character.chaos_ranks}
					total={9}
					onChange={setChaosRanks}
					aria-label="Chaos Ranks"
					disabled={!isOwner}
				/>
			</RanksContainer>
		</Container>
	)
}

const Container = styled.div`
	display: flex;
	gap: ${theme.spacing.separation};
	justify-content: space-around;
	width: 100%;

	border: ${theme.spacing.separation} solid ${theme.colors.border};
	padding: ${theme.spacing.padding};
	border-radius: ${theme.borders.radius};
`

const Label = styled.label`
	font-family: ${theme.fonts.common};
	font-size: 12px;
	color: black;
`

const RanksContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: ${theme.spacing.padding};
`

const CorruptionContainer = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	gap: ${theme.spacing.padding};
`
