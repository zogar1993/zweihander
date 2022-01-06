import Accordion from "@web/components/Accordion"
import CharacterSheetAlignment from "@web/components/character_sheet/misc/CharacterSheetAlignment"
import CharacterSheetFocuses from "@web/components/character_sheet/misc/CharacterSheetFocuses"
import CharacterSheetSpells from "@web/components/character_sheet/misc/CharacterSheetSpells"
import CharacterSheetStats from "@web/components/character_sheet/misc/CharacterSheetStats"
import CharacterSheetTalents from "@web/components/character_sheet/misc/CharacterSheetTalents"
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
				},
				{
					name: "Talents",
					content: <CharacterSheetTalents />
				},
				{
					name: "Focuses",
					content: <CharacterSheetFocuses />
				},
				{
					name: "Spells",
					content: <CharacterSheetSpells />
				}
			]}
		/>
	)
}

const MiscAccordion = styled(Accordion)`
	grid-area: misc;
`
