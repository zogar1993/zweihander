import {
	ActionType,
	useCharacterSheetDispatcher,
	useCharacterSheetState
} from "@web/components/character_sheet/CharacterSheetContext"
import theme from "@web/theme/theme"
import { Field } from "misevi"
import styled from "styled-components"

export default function CharacterSheetTalents() {
	return (
		<Container>
			{Array.from({ length: 9 }, (_, i) => i).map(i => (
				<TalentComboBox index={i} key={i.toString()} />
			))}
		</Container>
	)
}

function TalentComboBox({ index }: { index: number }) {
	const { character, talents } = useCharacterSheetState()
	const dispatch = useCharacterSheetDispatcher()
	return (
		<Field
			type="combobox"
			label={"Talent " + (index + 1)}
			options={talents}
			value={character.talents && character.talents[index]}
			onChange={talent =>
				dispatch({
					type: ActionType.SetTalent,
					payload: { index: index, talent: talent }
				})
			}
		/>
	)
}

const Container = styled.div`
	display: flex;
	flex-direction: column;
	justify-items: stretch;
	gap: ${theme.spacing.separation};
`
