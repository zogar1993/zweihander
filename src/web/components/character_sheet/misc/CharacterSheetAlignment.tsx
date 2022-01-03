import {
	ActionType,
	useCharacterSheetDispatcher,
	useCharacterSheetState
} from "@web/components/character_sheet/CharacterSheetContext"
import theme from "@web/theme/theme"
import { CircularNumberInput, Dots } from "misevi"
import styled from "styled-components"

export default function CharacterSheetAlignment() {
	const { character } = useCharacterSheetState()
	const dispatch = useCharacterSheetDispatcher()
	return (
		<Container>
			<RanksContainer>
				<Label>Order Ranks</Label>
				<Dots
					value={character.order_ranks}
					total={9}
					onChange={value => dispatch({
						type: ActionType.SetOrderRanks, payload: value
					})}
				/>
				<Label>Chaos Ranks</Label>
				<Dots
					value={character.chaos_ranks}
					total={9}
						onChange={value => dispatch({
						type: ActionType.SetChaosRanks, payload: value
					})}
				/>
			</RanksContainer>
			<CorruptionContainer>
				<Label>Corruption</Label>
				<CircularNumberInput
					min={0}
					max={9}
					value={character.corruption}
					onBlur={value => dispatch({
						type: ActionType.SetCorruption, payload: value
					})}
				/>
			</CorruptionContainer>
		</Container>
	)
}

const Label = styled.label`
	font-family: ${theme.fonts.common};
	font-size: 12px;
	color: black;
`

const Container = styled.div`
  display: flex;
  gap: ${theme.spacing.separation};
  justify-content: space-between;
  align-content: stretch;
  width: 100%;
`

const RanksContainer = styled.div`
  display: flex;
  flex-direction: column;
`

const CorruptionContainer = styled.div`
	flex-grow: 1;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`
