import Accordion from "@web/components/Accordion"
import CharacterSheetAlignment from "@web/components/character_sheet/misc/CharacterSheetAlignment"
import CharacterSheetStats from "@web/components/character_sheet/misc/CharacterSheetStats"
import styled from "styled-components"

export default function CharacterSheetMisc() {
	return (
		<MiscAccordion
			items={[
				{
					name: "Alignment & Corruption",
					content: <CharacterSheetAlignment />
				},
				{
					name: "Stats",
					content: <CharacterSheetStats />
				}
			]}
		/>
	)
}

const MiscAccordion = styled(Accordion)`
	grid-area: misc;
`
