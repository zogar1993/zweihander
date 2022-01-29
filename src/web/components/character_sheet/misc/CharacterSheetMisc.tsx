import Accordion from "@web/components/Accordion"
import CharacterSheetAlignment from "@web/components/character_sheet/misc/CharacterSheetAlignment"
import CharacterSheetFocuses from "@web/components/character_sheet/misc/CharacterSheetFocuses"
import CharacterSheetJournal from "@web/components/character_sheet/misc/CharacterSheetJournal"
import CharacterSheetSettings from "@web/components/character_sheet/misc/CharacterSheetSettings"
import CharacterSheetSpecialRules from "@web/components/character_sheet/misc/CharacterSheetSpecialRules"
import CharacterSheetSpells from "@web/components/character_sheet/misc/CharacterSheetSpells"
import CharacterSheetStats from "@web/components/character_sheet/misc/CharacterSheetStats"
import CharacterSheetTalents from "@web/components/character_sheet/misc/CharacterSheetTalents"
import { ACCORDION_ITEM } from "@web/constants/ACCORDION_ITEM"
import styled from "styled-components"

export default function CharacterSheetMisc() {
	return (
		<MiscAccordion
			items={[
				{
					name: ACCORDION_ITEM.ALIGNMENT,
					content: <CharacterSheetAlignment />
				},
				{
					name: ACCORDION_ITEM.STATS,
					content: <CharacterSheetStats />
				},
				{
					name: ACCORDION_ITEM.TALENTS,
					content: <CharacterSheetTalents />
				},
				{
					name: ACCORDION_ITEM.FOCUSES,
					content: <CharacterSheetFocuses />
				},
				{
					name: ACCORDION_ITEM.SPELLS,
					content: <CharacterSheetSpells />
				},
				{
					name: ACCORDION_ITEM.SPECIAL_RULES,
					content: <CharacterSheetSpecialRules />
				},
				{
					name: ACCORDION_ITEM.JOURNAL,
					content: <CharacterSheetJournal />
				},
				{
					name: ACCORDION_ITEM.SETTINGS,
					content: <CharacterSheetSettings />
				}
			]}
		/>
	)
}

const MiscAccordion = styled(Accordion)`
	grid-area: misc;
`
