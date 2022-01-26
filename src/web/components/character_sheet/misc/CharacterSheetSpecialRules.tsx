import EffectCard from "@web/components/card/EffectCard"
import { useCharacterSheetState } from "@web/components/character_sheet/CharacterSheetContext"
import theme from "@web/theme/theme"
import styled from "styled-components"

export default function CharacterSheetSpecialRules() {
	const { character } = useCharacterSheetState()

	return (
		<Container>
			{character.special_rules.map((rule, i) => (
				<EffectCard key={i.toString()} trait={rule} />
			))}
		</Container>
	)
}

const Container = styled.div`
	display: flex;
	flex-direction: column;
	gap: ${theme.spacing.separation};
`
