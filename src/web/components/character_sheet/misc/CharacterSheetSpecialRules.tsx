import SpecialRuleCard from "@web/components/card/SpecialRuleCard"
import { useCharacterSheetState } from "@web/components/character_sheet/CharacterSheetContext"
import theme from "@web/theme/theme"
import styled from "styled-components"

export default function CharacterSheetSpecialRules() {
	const { character } = useCharacterSheetState()

	return (
		<Container>
			{character.special_rules.map((rule, i) => (
				<SpecialRuleCard
					key={i.toString()}
					trait={rule}
					hideDescription={true}
				/>
			))}
		</Container>
	)
}

//TODO P4 hide description would not be necesary if description was not sent ;)

const Container = styled.div`
	display: flex;
	flex-direction: column;
	gap: ${theme.spacing.separation}
`